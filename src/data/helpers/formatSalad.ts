import { Item } from "../../types/DataTypes";
import { organizeIcons } from "./convertIcons";

export const formatSalad = (item: any) => {
  let obj: Item = item[Object.keys(item)[0]];
  const saladOptions = obj.title.split(":")[1].trim().split(" e ") || "";
  for (let i = 0; i < saladOptions.length; i++) {
    saladOptions[i] += " " + organizeIcons(obj.icons[i]);
  }
  return `Saladas: ${saladOptions.join(" e ")}\n`;
};
