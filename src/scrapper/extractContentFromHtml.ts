import * as cheerio from "cheerio";
import { convertRuToName, convertRuToUrl } from "../utils/convertRu";

export const extractContentFromHtml = (menuFromDate: cheerio.Element, date: string, ru: string) => {
  const meal = ["CAFÉ DA MANHÃ", "ALMOÇO", "JANTAR"];
  const $menu = cheerio.load(menuFromDate);
  $menu("img").remove();

  let wholeObject: any = {};

  wholeObject["meals"] = meal;
  wholeObject["details"] = {
    nameRu: convertRuToName(ru),
    date: date,
    urlRu: convertRuToUrl(ru),
  };

  meal.forEach((meal) => {
    const $htmlDataFromMeal = $menu("tr:contains(" + meal + ")")
      .first()
      .next();

    if ($htmlDataFromMeal.html() === null) return;
    let itemFoodArray: string[] = $htmlDataFromMeal.html()!.split("<br>");

    let arrayOfFoodObjects = [];

    for (let i = 0; i < itemFoodArray?.length; i++) {
      let item = itemFoodArray[i].replace("<td>|</td>", "");
      let $parsedElement = cheerio.load(item);

      let links: string[] = [];
      $parsedElement("a").each(function () {
        let link = $parsedElement(this).attr("href");
        links.push(link!);
      });

      const itemFoodObject: any = {};
      const itemFromMealObject = {
        title: $parsedElement
          .text()
          .trim()
          .replace(/\s{2,}/g, " "),
        icons: links,
      };

      itemFoodObject[`item${i + 1}`] = itemFromMealObject;
      arrayOfFoodObjects.push(itemFoodObject);
    }

    if (meal == "CAFÉ DA MANHÃ") {
      wholeObject["breakfast"] = arrayOfFoodObjects;
    } else if (meal == "ALMOÇO") {
      wholeObject["lunch"] = arrayOfFoodObjects;
    } else {
      wholeObject["dinner"] = arrayOfFoodObjects;
    }
  });

  console.log(wholeObject);

  return wholeObject;
};
