import sendEmbed from "../utils/embed.js";

export default {
  name: "start",
  params: ["id?"],
  description: "start a promotion",
  execute: async (bot, message, args) => {
    if (args.length !== 0) {
      const data = await bot.service.getPromotionById(args[0]);
      await bot.service.startPromotion(data);
      sendEmbed(message, `started promotion with id: ${data.id}`);
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
  },
};
