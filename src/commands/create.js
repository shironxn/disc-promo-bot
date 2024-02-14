import sendEmbed from "../utils/embed.js";

export default {
  name: "create",
  description: "create a new promotion",
  execute: async (bot, message, args) => {
    try {
      const data = await bot.service.createPromotion({ name: args.join(" ") });
      const promotionInfo = `successfully created a new promotion\nid: ${data[0].id} | name: ${data[0].name}`;
      sendEmbed(message, promotionInfo);
    } catch (error) {
      throw new Error(error);
    }
  },
};
