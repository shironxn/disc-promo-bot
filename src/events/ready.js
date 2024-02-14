import logger from "../utils/logger.js  ";

export default async (bot) => {
  bot.client.presence.set({
    activities: [
      {
        name: "lmao",
        type: "WATCHING",
      },
    ],
  });

  logger.info(
    `\n${bot.client.user.username}|${bot.client.user.id} is ready!\n\n`
  );
};
