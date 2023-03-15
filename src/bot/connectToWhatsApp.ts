import makeWASocket, { DisconnectReason, useMultiFileAuthState } from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";

import pino from "pino";

export async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("baileys_auth");

  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: "silent" }),
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("connection closed due to ", lastDisconnect?.error, ", reconnecting ", shouldReconnect);
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === "open") {
      console.log("opened connection");
      return sock;
    }
  });

  await sock.waitForConnectionUpdate(({ connection }) => connection === "open");
  return sock;
}
