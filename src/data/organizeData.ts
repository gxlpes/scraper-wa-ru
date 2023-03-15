import { MenuData } from "../types/DataTypes";
import { getWeekday } from "../utils/getWeekday";
import { returnFooterString, returnFormattedMeals, returnHeaderString, returnWarningString } from "./helpers/stringBuilder";

export const organizeData = async ({ meals, breakfast, lunch, dinner, details }: MenuData) => {
  const { date } = details;
  const formattedDate = date.split("-").reverse().join("/");
  const weekDayPt = getWeekday(new Date(`20${formattedDate.split("/").reverse().join("/")}`).getDay());

  console.log("current date being used:", date);
  console.log("current weekday:", weekDayPt);

  return `${returnHeaderString(details, weekDayPt, formattedDate)}
              ${returnFormattedMeals(breakfast, lunch, dinner, meals)}
              ${returnWarningString()}
              ${returnFooterString(details)}`.replace(/\n +/g, "\n");
};
