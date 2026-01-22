export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic?: string;
}

export interface DrinkSummary {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic?: "Alcoholic" | "Non alcoholic" | string;
}

export interface DrinkDetail extends DrinkSummary {
  strCategory?: string;
  strGlass?: string;
  strInstructions?: string;
  strInstructionsES?: string;
  strInstructionsFR?: string;

  // Ingredients & measurements (CocktailDB uses numbered fields)
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;

  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
}

export interface Ingredient {
  idIngredient?: string;
  strIngredient: string;
  strDescription?: string;
  strType?: string;
  strAlcohol?: string;
  strABV?: string;
}

export type IngredientKey =
  | "strIngredient1" | "strIngredient2" | "strIngredient3"
  | "strIngredient4" | "strIngredient5" | "strIngredient6"
  | "strIngredient7" | "strIngredient8" | "strIngredient9"
  | "strIngredient10" | "strIngredient11" | "strIngredient12"
  | "strIngredient13" | "strIngredient14" | "strIngredient15";

export type MeasureKey =
  | "strMeasure1" | "strMeasure2" | "strMeasure3"
  | "strMeasure4" | "strMeasure5" | "strMeasure6"
  | "strMeasure7" | "strMeasure8" | "strMeasure9"
  | "strMeasure10" | "strMeasure11" | "strMeasure12"
  | "strMeasure13" | "strMeasure14" | "strMeasure15";


export const INGREDIENT_KEYS: IngredientKey[] = [
  "strIngredient1", "strIngredient2", "strIngredient3",
  "strIngredient4", "strIngredient5", "strIngredient6",
  "strIngredient7", "strIngredient8", "strIngredient9",
  "strIngredient10", "strIngredient11", "strIngredient12",
  "strIngredient13", "strIngredient14", "strIngredient15",
];

export const MEASURE_KEYS: MeasureKey[] = [
  "strMeasure1", "strMeasure2", "strMeasure3",
  "strMeasure4", "strMeasure5", "strMeasure6",
  "strMeasure7", "strMeasure8", "strMeasure9",
  "strMeasure10", "strMeasure11", "strMeasure12",
  "strMeasure13", "strMeasure14", "strMeasure15",
];


/** API response wrappers */
export interface DrinksResponse<T = DrinkSummary> {
  drinks: T[] | null;
}

export interface IngredientsResponse {
  ingredients: Ingredient[] | null;
}

export interface IngredientMeasure {
  name: string;
  measure?: string;
}

export function extractIngredients(
  drink: DrinkDetail
): IngredientMeasure[] {
  return INGREDIENT_KEYS
    .map((key, index): IngredientMeasure | null => {
      const name = drink[key];
      if (!name) return null;

      return {
        name,
        measure: drink[MEASURE_KEYS[index]],
      };
    })
    .filter(
      (item): item is IngredientMeasure => item !== null
    );
}
