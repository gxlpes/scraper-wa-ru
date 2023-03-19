import * as cheerio from "cheerio";
import { extractContentFromHtml } from "./extractContentFromHtml";

export const getHtmlElements = async (dataRu: string) => {
  const todayDate = new Date();
  console.log("today date:", todayDate.getDate(), "/", todayDate.getMonth());

  try {
    const $ = cheerio.load(dataRu);
    const $menuFromDate = $(`p:contains(${todayDate.getDate()})`).first().next().get(0);
    const ruName = $("#post h2").text().split("RU")[1]?.trim();

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
