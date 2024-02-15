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

    let stoppedPromotion = [];
    const data = await bot.service.getAllPromotion();
    data.forEach(async (item) => {
      try {
        await bot.service.stopPromotion(item.id);
        stoppedPromotion.push(item.id);
      } catch (error) {
        return;
      }
    });

    if (stoppedPromotion.length === 0) {
      throw new Error("no promotion started");
    }
    sendEmbed(message, `stopped promotion with id: ${stoppedPromotion}`);
  },
};
