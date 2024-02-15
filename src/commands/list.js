import sendEmbed from "../utils/embed.js";

export default {
  name: "list",
  description: "retrieve information about promotions",
  execute: async (bot, message, args) => {
    const dataList = [];

    const data = await bot.service.getAllPromotion();
    data.forEach((item) => {
      dataList.push({
        id: item.id,
        name: item.name,
        created_at: item.created_at,
      });
    });

    const description =
      "```json\n" + JSON.stringify(dataList, null, 2) + "\n```";
    message.reply(description);
    sendEmbed(message, `current promotion data: ${data.length}`);
  },
};
