import sendEmbed from "../utils/embed.js";

export default {
  name: "help",
  description: "display information about available commands",
  execute: async (bot, message) => {
    let description = "";

    const commandList = bot.client.commands;
    commandList.forEach((command) => {
      description += `${command.name}: ${command.description}\n`;
    });

    sendEmbed(message, description);
  },
};
