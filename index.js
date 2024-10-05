const { EmbedBuilder, WebhookClient } = require("discord.js");
const { cronSubjects } = require("./config.json");
require("dotenv/config");
const cron = require("node-cron");

const webhookClient = new WebhookClient({
  id: process.env.WEBHOOK_ID,
  token: process.env.TOKEN,
});

console.log("Running");

function sendMessage(message, embedTitle) {
  const embed = new EmbedBuilder().setTitle(embedTitle).setColor("#0099ff");
  webhookClient
    .send({
      content: `@everyone, ${message}`,
      username: "Aj Mae",
      avatarURL:
        "https://cdn.discordapp.com/attachments/1000316548294131743/1210143533994872902/1657968265232.jpg?ex=66ff00bd&is=66fdaf3d&hm=cab619c37ddfa2ed3fc8e1d3fc6a5b2e3fcc00666a401381dd76e0ed1ca4dc63&",
      embeds: [embed],
    })
    .then(() => {
      console.log("Message sent: " + message);
    })
    .catch((error) => {
      console.error("Error trying to send message:", error);
    });
}

try {
  for (const key in cronSubjects) {
    if (Object.prototype.hasOwnProperty.call(cronSubjects, key)) {
      const daySubjects = cronSubjects[key];
      daySubjects.forEach((subject) => {
        cron.schedule(subject.cron, () => {
          sendMessage(`${subject.time} ${subject.name}`, subject.name);
        });
      });
    }
  }
} catch (error) {
  console.error("Error occurred in cron schedule setup:", error);
}
