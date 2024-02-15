import sendEmbed from "../utils/embed.js";

export default async (bot, message) => {
  if (message.author.id !== bot.userId) return;
  if (!message.content.startsWith(bot.prefix)) return;

  const args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const getCommand = bot.client.commands.get(command);
  if (getCommand === undefined) {
    return sendEmbed(
      message,
      `command '${command}' not found. use '${bot.prefix}help' for a list of available commands`
    );
  }

  if (getCommand.params && args.length === 0) {
    const optionalParams = getCommand.params.some((param) =>
      param.split("").includes("?")
    );

    if (!optionalParams) {
      return sendEmbed(
        message,
        `invalid parameters for command '${command}'\nusage: '${getCommand.name}' [${getCommand.params}]`
      );
    }
  }

  try {
    await getCommand.execute(bot, message, args);
  } catch (error) {
    sendEmbed(message, `error executing command '${command}'\n${error}`);
  }
};
