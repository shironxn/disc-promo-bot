import sendEmbed from "../utils/embed.js";

export default {
  name: "start",
  description: "setup promotion",
  execute: async (bot, message, args) => {
    try {
      if (args.length !== 0) {
        const data = await bot.service.getPromotionById(args[0]);
        await bot.service.startPromotion(data[0]);
        sendEmbed(message, `started promotion with id: ${data[0].id}`);
        return;
      }

      const data = await bot.service.getAllPromotion();
      data.forEach(async (item) => {
        await bot.service.startPromotion(item);
      });
      sendEmbed(
        message,
        `started promotion with id: ${data.map((item) => item.id)}`
      );
    } catch (error) {
      throw new Error(error);
    }
  },
};
