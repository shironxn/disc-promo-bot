import sendEmbed from "../utils/embed.js";

export default {
  name: "get",
  params: ["id"],
  description: "retrieve information about promotions",
  execute: async (bot, message, args) => {
    let description = "```json\n";
    const data = await bot.service.getPromotionById(args[0]);

    description += JSON.stringify(data, null, 2);
    description += "\n```";
    message.reply(description);
  },
};
