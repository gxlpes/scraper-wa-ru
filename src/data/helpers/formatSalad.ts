import { Item } from "../../types/DataFromWebsite";
import { formatIcons } from "./formatIcons";

export const formatSalad = (item: any) => {
  let obj: Item = item[Object.keys(item)[0]];
  const saladOptions = obj.title.split(":")[1].trim().split(" e ") || "";
  for (let i = 0; i < saladOptions.length; i++) {
    saladOptions[i] += " " + formatIcons(obj.icons[i]);
  }
  return `Saladas: ${saladOptions.join(" e ")}\n`;
};
