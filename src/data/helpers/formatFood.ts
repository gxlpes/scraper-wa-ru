import { Item } from "../../types/DataTypes";
import { organizeIcons } from "./convertIcons";
import { formatSalad } from "./formatSalad";

export const formatFood = (item: any) => {
  let output = "";
  if (item === undefined || null) return;
  item.forEach((item: any) => {
    let obj: Item = item[Object.keys(item)[0]];
    if (obj.title.toLowerCase().includes("saladas")) {
      output += formatSalad(item);
    } else {
      const itemIcons = obj.icons.map((icon: string) => organizeIcons(icon));
      output += `${obj.title} ${itemIcons.join(" ")}\n`;
    }
  });
  return output;
};
