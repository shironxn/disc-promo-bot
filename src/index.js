import fs from "fs";
import "dotenv/config";

import Config from "./configs/config.js";
import PromotionRepository from "./repositories/promotion.js";
import PromotionService from "./services/promotion.js";

const config = new Config();
const bot = config.bot();
const db = config.db();

const promotionRepository = new PromotionRepository(db);
const promotionService = new PromotionService(promotionRepository, bot);

bot.client.commands = new Map();
bot.service = promotionService;

const importEvent = async (file) => {
  const event = (await import(`./events/${file}`)).default;
  bot.client.on(file.split(".")[0], (...args) => event(bot, ...args));
};

const importCommand = async (file) => {
  const command = (await import(`./commands/${file}`)).default;
  bot.client.commands.set(command.name, command);
};

const importFiles = async (directory, importFunction) => {
  const files = fs.readdirSync(directory);

  const jsFiles = files.filter((file) => file.endsWith(".js"));

  for (const file of jsFiles) {
    await importFunction(file);
  }
};

(async () => {
  await importFiles("./src/events", importEvent);
  await importFiles("./src/commands", importCommand);
  await bot.client.login(bot.token);
})();
