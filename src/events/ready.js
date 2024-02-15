import clear from "console-clear";
import boxen from "boxen";
import figlet from "figlet";
import { green } from "ansis";

export default async (bot) => {
  bot.client.presence.set({
    activities: [
      {
        name: "lmao",
        type: "WATCHING",
      },
    ],
  });

  clear();
  const message = `
  ${green`${figlet.textSync("DISC PROMO BOT", {
    font: "Pepper",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  })}`}
  
${green`id:`} ${bot.client.user.id}
${green`name:`} ${bot.client.user.username}
${green`server:`} ${bot.client.guilds.cache.size}

`;

  console.log(
    "\n" +
      boxen(message, {
        title: "shironxn",
        padding: 1,
        titleAlignment: "center",
        textAlignment: "center",
        float: "center",
        borderColor: "green",
        borderStyle: "round",
        margin: 3,
      })
  );
};
