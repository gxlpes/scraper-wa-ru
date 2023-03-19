import { MenuData } from "../types/DataFromWebsite";
import { getWeekday } from "../utils/getWeekday";
import { returnFooterString, returnFormattedMeals, returnHeaderString, returnWarningString } from "./stringBuilder";

export const organizeDataForWa = async ({ meals, breakfast, lunch, dinner, details, details: { date } }: MenuData) => {
  const formattedDate = `${date.getDate()}/${String(date.getMonth() + 1).padStart(2, "0")}`;
  return `${returnHeaderString(details, getWeekday(date.getDay()), formattedDate)}
              ${returnFormattedMeals(breakfast, lunch, dinner, meals)}
              ${returnWarningString()}
              ${returnFooterString(details)}`.replace(/\n +/g, "\n");
};
