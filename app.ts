import dotenv from "dotenv";
import { connectToWhatsApp } from "./src/bot/connectToWhatsApp";
import { handlerWaBot } from "./src/bot/handlerWaBot";
import { organizeDataForWa } from "./src/data/organizeDataForWa";
import { getDataFromWebsite } from "./src/scrapper/getDataFromWebsite";
import { getHtmlElements } from "./src/scrapper/getHtmlElements";

dotenv.config();
const ATTENDED_RU_LIST = process.env.RU_ATTENDED!.split(", ");

const startApp = async (): Promise<void> => {
  console.log("-------------- STARTED --------------");
  const sock = await connectToWhatsApp();

  for (const ru of ATTENDED_RU_LIST) {
    try {
      console.log(`Starting procedure for: ${ru}`);

      const response = await getDataFromWebsite(ru);
      console.log(`Returned website status: ${response?.status}`);

      const htmlMenu = await getHtmlElements(response!.data);
      console.log("Returned selected html");

      if (!htmlMenu) {
        console.log(`No menu from this date found for ${ru}, skipping to next iteration`);
        continue;
      }

      const msgReadyToSend = await organizeDataForWa(htmlMenu);
      console.log("Returned formatted data");

      await handlerWaBot(ru, msgReadyToSend, sock);
      console.log("Finished this procedure");
    } catch (error) {
      console.error(`Error occurred while processing ${ru}`, error);
    }
  }

  console.log("-------------- FINISHED --------------");
  process.exit();
};

startApp();
