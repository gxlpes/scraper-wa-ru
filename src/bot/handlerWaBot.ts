import { WASocket } from "@adiwajshing/baileys";
import dotenv from "dotenv";
dotenv.config();

export const handlerWaBot = async (ru: string, output: string, sock: WASocket) => {
  const groupContactArray = process.env[`RU_${ru.toUpperCase()}_GROUP_CONTACT`]!.split(", ");

  for (const groupContact of groupContactArray) {
    console.log("Sending the message");
    let msg = await sock.sendMessage(groupContact, { text: output });
  }
};
