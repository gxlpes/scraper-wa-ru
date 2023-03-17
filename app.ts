import dotenv from "dotenv";
import { handlerWaBot } from "./src/bot/handlerWaBot";
import { connectToWhatsApp } from "./src/bot/connectToWhatsApp";
import { organizeData } from "./src/data/organizeData";
import { getDataFromWebsite } from "./src/scrapper/getDataFromWebsite";
import { getHtmlElements } from "./src/scrapper/getHtmlElements";

dotenv.config();
export const startApp = async () => {
  const arrayOfAttendedRu = process.env.RU_ATTENDED!.split(", ");
  let sock = await connectToWhatsApp();

  for (const ru of arrayOfAttendedRu) {
    console.log(arrayOfAttendedRu);
    console.log("-------------------- starting procedure for:", ru);

    const response = await getDataFromWebsite(ru);
    console.log("returned website", response?.status);

    const htmlMenu = await getHtmlElements(response!.data, ru);
    console.log("returned selected html");

    if (htmlMenu === null) {
      console.log(`No menu from this date found for ${ru}, skipping to next iteration`);
      continue;
    }

    const output = await organizeData(htmlMenu);
    console.log("returned formatted data");

    await handlerWaBot(ru, output, sock);
    console.log("--------------------- finished this procedure");
  }

  console.log("everything went ok");
  process.exit();
};

startApp();
