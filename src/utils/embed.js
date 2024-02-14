import { WebEmbed } from "discord.js-selfbot-v13";

const sendEmbed = (message, description) => {
  const embed = new WebEmbed()
    .setAuthor({
      name: "shironxn",
      url: "https://github.com/shironxn/disc-promo-bot",
    })
    .setColor("WHITE")
    .setDescription(description)
    .setImage(
      "https://i.pinimg.com/originals/b2/2a/a2/b22aa22b2f3f55b6468361158d52e2e7.gif"
    );
  message.reply(WebEmbed.hiddenEmbed + embed);
};

export default sendEmbed;
