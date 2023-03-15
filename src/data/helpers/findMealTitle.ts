export const findMealTitle = (meals: string[], title: string) =>
  meals.find((item: string) => item.toLowerCase() === title) || "Not found";
