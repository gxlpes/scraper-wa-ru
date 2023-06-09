import * as cheerio from "cheerio";
import { getWeekday } from "../utils/getWeekday";
import { extractContentFromHtml } from "./extractContentFromHtml";

export const getHtmlElements = async (dataRu: string) => {
  const todayDate = new Date();
  console.log("today date:", todayDate.getDate());

  try {
    const $ = cheerio.load(dataRu);
    const ruName = $("#post h2").text().split("RU")[1]?.trim();
    const $elementsContainingText = $(`:contains("${getWeekday(todayDate.getDay())}")`);

    const $menuFromDate = $elementsContainingText
      .filter(function () {
        return this.tagName === "figure" || this.tagName === "p";
      })
      .first()
      .next()
      .get(0);

    if ($menuFromDate) {
      return extractContentFromHtml($menuFromDate, todayDate, ruName);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
