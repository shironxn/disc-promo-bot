import sendEmbed from "../utils/embed.js";

export default {
  name: "delete",
  params: ["id"],
  description: "delete a promotion",
  execute: async (bot, message, args) => {
    const data = await bot.service.getPromotionById(args[0]);

    await bot.service.deletePromotion(args[0]);
    sendEmbed(message, `successfully deleted promotion with id ${args[0]}`);
  },
};
