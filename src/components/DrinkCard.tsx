import { Link } from "react-router-dom";
import { type DrinkSummary } from "../types/cocktail";

export interface DrinkCardProps {
  drink: DrinkSummary;
}

export default function DrinkCard({ drink }: DrinkCardProps) {
  return (
    <Link to={`/drink/${drink.idDrink}`} className="border rounded-lg overflow-hidden hover:shadow">
      <img src={drink.strDrinkThumb} alt={drink.strDrink} />
      <div className="p-3">
        <h3 className="font-semibold">{drink.strDrink}</h3>
        <span className="text-xs px-2 py-1 bg-gray-200 rounded">
          {drink.strAlcoholic || "Unknown"}
        </span>
      </div>
    </Link>
  );
}
