import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIngredient, searchByIngredient } from "../api/cocktailApi";
import DrinkGrid from "../components/DrinkGrid";
import { type Ingredient, type DrinkSummary } from "../types/cocktail";

export default function IngredientDetail() {
  const { name } = useParams();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [drinks, setDrinks] = useState<DrinkSummary[]>([]);

  useEffect(() => {
    getIngredient(name!).then((res) => setIngredient(res.ingredients?.[0] ?? null));
    searchByIngredient(name!).then((res) => setDrinks(res.drinks || []));
  }, [name]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{ingredient?.strIngredient}</h1>
      <p className="mt-2">{ingredient?.strDescription}</p>

      <h2 className="mt-6 font-semibold">Drinks using this ingredient</h2>
      <DrinkGrid drinks={drinks} />
    </div>
  );
}
