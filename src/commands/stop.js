import sendEmbed from "../utils/embed.js";

export default {
  name: "stop",
  description: "setup promotion",
  execute: async (bot, message, args) => {
    try {
      if (args.length !== 0) {
        const data = await bot.service.getPromotionById(args[0]);
        await bot.service.stopPromotion(data[0]);
        sendEmbed(message, `stop promotion with id: ${data[0].id}`);
        return;
      }

      const data = await bot.service.getAllPromotion();
      data.forEach(async (item) => {
        await bot.service.stopPromotion(item);
      });
      sendEmbed(
        message,
        `stop promotion with id: ${data.map((item) => item.id)}`
      );
    } catch (error) {
      throw new Error(error);
    }
  },
};
