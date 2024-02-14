import sendEmbed from "../utils/embed.js";

export default {
  name: "set",
  description: "setup promotion",
  execute: async (bot, message, args) => {
    try {
      const data = await bot.service.updatePromotion(args);
      console.log(data);
      const promotionInfo = `successfully set promotion\n\n${JSON.stringify(
        data[0],
        null,
        2
      )}`;
      sendEmbed(message, promotionInfo);
    } catch (error) {
      throw new Error(error);
    }
  },
};
