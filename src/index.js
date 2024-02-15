import fs from "fs";
import Config from "./configs/config.js";
import PromotionRepository from "./repositories/promotion.js";
import PromotionService from "./services/promotion.js";
import logger from "./utils/logger.js";

const config = new Config();
const bot = config.bot();
const db = config.db();

const promotionRepository = new PromotionRepository(db);
const promotionService = new PromotionService(promotionRepository, bot);

bot.client.commands = new Map();
bot.service = promotionService;

const importEvent = async (file) => {
  try {
    const event = (await import(`./events/${file}`)).default;
    bot.client.on(file.split(".")[0], (...args) => event(bot, ...args));
  } catch (error) {
    throw new Error(`importing event ${file}:`, error);
  }
};

const importCommand = async (file) => {
  try {
    const command = (await import(`./commands/${file}`)).default;
    bot.client.commands.set(command.name, command);
  } catch (error) {
    throw new Error(`importing command ${file}:`, error);
  }
};

const importFiles = async (directory, importFunction) => {
  try {
    const files = fs.readdirSync(directory);
    const jsFiles = files.filter((file) => file.endsWith(".js"));
    for (const file of jsFiles) {
      await importFunction(file);
    }
  } catch (error) {
    throw new Error(`importing files from ${directory}:`, error);
  }
};

(async () => {
  try {
    await importFiles("./src/events", importEvent);
    await importFiles("./src/commands", importCommand);
    await bot.client.login(bot.token);
  } catch (error) {
    logger.error(error);
  }
})();
