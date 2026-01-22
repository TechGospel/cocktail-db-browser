import { useEffect, useState, useMemo } from "react";
import { getDrinkById, searchByIngredient } from "../api/cocktailApi";
import DrinkGrid from "../components/DrinkGrid";
import SearchBar from "../components/SearchBar";
import FilterToggle from "../components/FilterToggle";
import { Pagination } from "../components/Pagination";

import { type DrinkDetail, type DrinkSummary } from "../types/cocktail";
import { fetchWithConcurrencyLimit } from "../utils/fetchWithConcurrencyLimit";

type DrinkDetailsMap = Record<string, DrinkDetail>;
type AlcoholFilter = "All" | "Alcoholic" | "Non alcoholic";

const PAGE_SIZE = 8;

export default function Home() {
  const [drinks, setDrinks] = useState<DrinkSummary[]>([]);
  const [detailsMap, setDetailsMap] = useState<DrinkDetailsMap>({});
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<AlcoholFilter>("All");
  const [loading, setLoading] = useState(false);

  // -------------------------------------
  // Search
  // -------------------------------------
  const handleSearch = async (ingredient: string) => {
    setLoading(true);
    setPage(1);
    setDetailsMap({});

    try {
      const res = await searchByIngredient(ingredient);
      if (!res.drinks) {
        setDrinks([]);
        return;
      }

      const summaries: DrinkSummary[] = res.drinks.map((d) => ({
        idDrink: d.idDrink,
        strDrink: d.strDrink,
        strDrinkThumb: d.strDrinkThumb,
      }));

      setDrinks(summaries);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------
  // Filter FIRST
  // -------------------------------------
  const filteredDrinks = useMemo(() => {
    return drinks.filter((drink) => {
      if (filter === "All") return true;

      const detail = detailsMap[drink.idDrink];
      if (!detail) return true; // don't block until known

      return detail.strAlcoholic === filter;
    });
  }, [drinks, detailsMap, filter]);

  // -------------------------------------
  // Paginate SECOND
  // -------------------------------------
  const paginatedDrinks = useMemo(() => {
    return filteredDrinks.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );
  }, [filteredDrinks, page]);

  // -------------------------------------
  // Fetch details ONLY for visible page
  // -------------------------------------
  const fetchDetails = async (items: DrinkSummary[]) => {
    const toFetch = items.filter((d) => !detailsMap[d.idDrink]);
    if (!toFetch.length) return;

    const results = await fetchWithConcurrencyLimit(
      toFetch,
      10,
      async (drink) => {
        const res = await getDrinkById(drink.idDrink);
        return { id: drink.idDrink, detail: res.drinks?.[0] ?? null };
      }
    );

    const next: DrinkDetailsMap = {};
    results.forEach((r) => {
      if (r.detail) next[r.id] = r.detail;
    });

    setDetailsMap((prev) => ({ ...prev, ...next }));
  };

  // -------------------------------------
  // Fetch current + next page (filtered!)
  // -------------------------------------
  useEffect(() => {
    if (!filteredDrinks.length) return;

    fetchDetails(paginatedDrinks);

    const nextPageItems = filteredDrinks.slice(
      page * PAGE_SIZE,
      (page + 1) * PAGE_SIZE
    );

    fetchDetails(nextPageItems);
  }, [paginatedDrinks, filteredDrinks, page]);

  // -------------------------------------
  // Grid data
  // -------------------------------------
  const drinksForGrid = paginatedDrinks.map((drink) => {
    const detail = detailsMap[drink.idDrink];
    return {
      ...drink,
      strAlcoholic: detail?.strAlcoholic ?? "Loading...",
    };
  });

  // -------------------------------------
  // Disable filter until visible page known
  // -------------------------------------
  const isFilterReady = paginatedDrinks.every(
    (d) => detailsMap[d.idDrink]
  );

  // -------------------------------------
  // Render
  // -------------------------------------
  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />

      <FilterToggle
        value={filter}
        onChange={(v) => {
          setPage(1); // reset page on filter change
          setFilter(v);
        }}
        disabled={!isFilterReady}
      />

      {loading ? (
        <p>Loading drinks...</p>
      ) : (
        <DrinkGrid drinks={drinksForGrid} />
      )}

      {filteredDrinks.length > PAGE_SIZE && (
        <Pagination
          page={page}
          total={filteredDrinks.length}
          onChange={setPage}
        />
      )}
    </div>
  );
}
