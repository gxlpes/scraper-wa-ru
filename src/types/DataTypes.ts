export interface Item {
  title: string;
  icons: string[];
}

export interface Meal {
  item: Item[];
}

export interface MenuData {
  meals: string[];
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  details: Details;
}

export interface Details {
  nameRu: string;
  date: string;
  urlRu: string;
}
