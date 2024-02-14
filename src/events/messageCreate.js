import sendEmbed from "../utils/embed.js";

export default async (bot, message) => {
  if (message.author.id !== bot.userId) return;
  if (!message.content.startsWith(bot.prefix)) return;

  const args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const getCommand = bot.client.commands.get(command);
  if (getCommand === undefined) {
    sendEmbed(message, "command not found");
    return;
  }

  try {
    await getCommand.execute(bot, message, args);
  } catch (error) {
    sendEmbed(message, `error executing command '${command}': ${error}`);
  }
};
