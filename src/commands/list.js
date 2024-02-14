import sendEmbed from "../utils/embed.js";

export default {
  name: "list",
  description: "setup promotion",
  execute: async (bot, message, args) => {
    try {
      if (args.length !== 0) {
        const data = await bot.service.getPromotionById(args[0]);
        message.reply(JSON.stringify(data[0], null, 2));
        return;
      }

      let description = "";
      const data = await bot.service.getAllPromotion();
      data.forEach((item) => {
        description += `id: ${item.id}\nname: ${item.name}\ncreated_at: ${item.created_at}\n\n`;
      });
      sendEmbed(message, description);
    } catch (error) {
      throw new Error(error);
    }
  },
};
