import sendEmbed from "../utils/embed.js";

export default {
  name: "help",
  description: "display information about available commands",
  execute: async (bot, message) => {
    let description = "available commands\n\n";
    const commandList = bot.client.commands;
    commandList.forEach((command) => {
      description += `'${command.name}'`;
      if (command.params) {
        description += ` [${command.params}]`;
      }
      description += `\n${command.description}\n\n`;
    });
    sendEmbed(message, description);
  },
};
