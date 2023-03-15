import { Details, Meal, MenuData } from "../../types/DataTypes";
import { findMealTitle } from "./findMealTitle";
import { formatFood } from "./formatFood";

export const returnWarningString = () => {
  return `🌱 - Indicado para veganos
              🥩 - Contém produtos de origem animal
              🌾 - Não indicado para celíacos por conter glúten
              🥛 - Não indicado para intolerantes à lactose por conter lactose
              🍳 - Contém ovo
              ⚠️ - Contém produto(s) alergênico(s)
              🍯 - Contém mel
              🌶️ - Contém pimenta\n`;
};

export const returnFooterString = ({ urlRu, nameRu }: Details) => {
  return `_Informações retiradas do site oficial do cardápio do *RU ${nameRu}*. Erros de layout, emojis e digitação podem acontecer devido a disposição de informações no site_\n\n${urlRu}`;
};

export const returnHeaderString = ({ nameRu }: Details, weedayPt: string, formattedDate: string) => {
  return `*CARDÁPIO RU ${nameRu.toLocaleUpperCase()} - ${weedayPt.toLocaleUpperCase()} - ${formattedDate}*\n`;
};

export const returnFormattedMeals = (breakfast: Meal[], lunch: Meal[], dinner: Meal[], meals: string[]) => {
  const mealData = [
    { name: "café da manhã", meal: breakfast },
    { name: "almoço", meal: lunch },
    { name: "jantar", meal: dinner },
  ];

  return mealData
    .map(({ name, meal }) => {
      const servingItems = formatFood(meal);
      const mealTitle = findMealTitle(meals, name);
      if (!servingItems) return null;
      return `*${mealTitle?.trim()}*\n${servingItems}`;
    })
    .filter((value) => value !== null)
    .join("\n");
};
