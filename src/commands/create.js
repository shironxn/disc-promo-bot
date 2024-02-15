import sendEmbed from "../utils/embed.js";

export default {
  name: "create",
  params: ["name"],
  description: "create a new promotion",
  execute: async (bot, message, args) => {
    const data = await bot.service.createPromotion({ name: args.join(" ") });

    sendEmbed(
      message,
      `successfully created a new promotion. use '${
        bot.prefix
      }set' to configure the promotion\n\npromotion details:\n${JSON.stringify(
        data,
        null,
        2
      )}`
    );
  },
};
