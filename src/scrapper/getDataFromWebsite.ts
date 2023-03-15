import axios from "axios";
import { convertRuToUrl } from "../utils/convertRu";

export const getDataFromWebsite = async (ru: string) => {
  try {
    return await axios.get(convertRuToUrl(ru));
  } catch (error) {
    console.log(error);
  }
};
