import sendEmbed from "../utils/embed.js";

export default {
  name: "stop",
  params: ["id?"],
  description: "stop a promotion",
  execute: async (bot, message, args) => {
    if (args.length !== 0) {
      await bot.service.stopPromotion(args[0]);
      sendEmbed(message, `stopped promotion with id: ${args[0]}`);
      return;
    }

    const data = await bot.service.getAllPromotion();
    data.forEach(async (item) => {
      await bot.service.stopPromotion(item.id);
    });
    sendEmbed(
      message,
      `stopped promotion with id: ${data.map((item) => item.id)}`
    );
  },
};
