import {
  type DrinksResponse,
  type DrinkDetail,
  type DrinkSummary,
  type IngredientsResponse,
} from "../types/cocktail";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

export async function searchByIngredient(
  ingredient: string
): Promise<DrinksResponse<DrinkSummary>> {
  const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  return res.json();
}

export async function getDrinkById(
  id: string
): Promise<DrinksResponse<DrinkDetail>> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  return res.json();
}

export async function getIngredient(
  name: string
): Promise<IngredientsResponse> {
  const res = await fetch(`${BASE_URL}/search.php?i=${name}`);
  return res.json();
}


