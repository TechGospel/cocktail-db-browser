import DrinkCard from "./DrinkCard";
import { type DrinkSummary } from "../types/cocktail";

export interface DrinkGridProps {
  drinks: DrinkSummary[];
}


export default function DrinkGrid({ drinks }: DrinkGridProps) {
  if (!drinks.length) return <p>No drinks found.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {drinks.map((drink: DrinkSummary) => (
        <DrinkCard key={drink.idDrink} drink={drink} />
      ))}
    </div>
  );
}
