import { MenuData } from "../types/DataTypes";
import { getWeekday } from "../utils/getWeekday";
import { returnFooterString, returnFormattedMeals, returnHeaderString, returnWarningString } from "./helpers/stringBuilder";

export const organizeData = async ({ meals, breakfast, lunch, dinner, details, details: { date } }: MenuData) => {
  const formattedDate = `${date.getDate()}/${String(date.getMonth() + 1).padStart(2, "0")}`;
  console.log("current date/weekday being used:", date, getWeekday(date.getDay()));

  return `${returnHeaderString(details, getWeekday(date.getDay()), formattedDate)}
              ${returnFormattedMeals(breakfast, lunch, dinner, meals)}
              ${returnWarningString()}
              ${returnFooterString(details)}`.replace(/\n +/g, "\n");
};
