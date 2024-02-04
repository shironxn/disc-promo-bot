import { Client } from "discord.js-selfbot-v13";
import friendlyCron from "friendly-cron";
import cron from "node-cron";
import fs from "fs";
import "dotenv/config";
import logger from "./util/logger.js";
import config from "../config/config.json" assert { type: "json" };

const client = new Client();

const message = fs.readFileSync("./config/message.txt", {
  encoding: "utf8",
  flag: "r",
});

const pattern = friendlyCron("every 2 hour");

client.once("ready", async () => {
  console.clear();
  logger.info(`\n${client.user.username}|${client.user.id} is ready!\n\n`);

  cron.schedule(pattern, async () => {
    config.channelIds.forEach(async (item) => {
      try {
        const channel = client.channels.cache.get(item);
        await channel.send(message.toString());
        logger.info(
          `\nserver: ${channel.guild}\nchannel: ${channel}|${channel.id}\n\n`
        );
      } catch (error) {
        logger.error(`\n${error}\n\n`);
      }
    });
  });
});

client.login(process.env.BOT_TOKEN);
