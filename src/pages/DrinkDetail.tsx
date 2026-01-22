import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDrinkById } from "../api/cocktailApi";
import { extractIngredients, type DrinkDetail as DrinkDetailType } from "../types/cocktail";

export interface IngredientMeasure {
  name: string;
  measure?: string;
}


export default function DrinkDetail() {
  const { id } = useParams();
  const [drink, setDrink] = useState<DrinkDetailType | null>(null);

  useEffect(() => {
    getDrinkById(id!).then((res) => {
      if (res.drinks && res.drinks.length > 0) {
        setDrink(res.drinks[0]);
      }
    });
  }, [id]);

  if (!drink) return <p>Loading...</p>;

  const ingredients = extractIngredients(drink);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={drink.strDrinkThumb} className="rounded-lg" />
      <h1 className="text-2xl font-bold mt-4">{drink.strDrink}</h1>
      <p className="italic">{drink.strGlass}</p>

      <h2 className="mt-4 font-semibold">Ingredients</h2>
      <ul>
        {ingredients.map((i) => (
          <li key={i.name}>
            <Link to={`/ingredient/${i.name}`} className="text-blue-600">
              {i.name}
            </Link> – {i.measure}
          </li>
        ))}
      </ul>

      <h2 className="mt-4 font-semibold">Instructions</h2>
      <p>{drink.strInstructions}</p>
    </div>
  );
}
