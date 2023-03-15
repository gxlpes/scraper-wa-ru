import * as cheerio from "cheerio";
import { extractContentFromHtml } from "./extractContentFromHtml";

export const getHtmlElements = async (dataRu: string, ru: string) => {
  try {
    const $ = cheerio.load(dataRu as any);
    let todayDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" });

    console.log("today date:", todayDate);

    let todaDateWithoutYear = todayDate.replace(/^(\d{2})\/(\d{2})\/\d{2}$/, "$1/$2");

    const $menuFromDate = $("p:contains(" + todaDateWithoutYear + ")")
      .first()
      .next();

    if ($menuFromDate.length > 0) {
      const el = $("p:contains(" + todaDateWithoutYear + ")")
        .first()
        .next()
        .get(0);

      if (el !== undefined) return extractContentFromHtml(el, todayDate, ru);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};
