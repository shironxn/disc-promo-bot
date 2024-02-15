import sendEmbed from "../utils/embed.js";

export default {
  name: "set",
  params: ["action", "id", "value"],
  description: "set up promotion",
  execute: async (bot, message, args) => {
    const data = await bot.service.updatePromotion(args);

    sendEmbed(
      message,
      `successfully set up promotion\n\n${JSON.stringify(data, null, 2)}`
    );
  },
};
