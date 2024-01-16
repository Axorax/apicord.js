const { App } = require("@slack/bolt");
const { colorium } = require("colorium");
const apicord = require("apicord");

const PORT = 12000;
const prefix = "!";
const app = new App({
  signingSecret: "SIGNING-SECRET-HERE",
  token: "BOT-TOKEN-HERE"
});

(async () => {
  await app.start(PORT || 12000);

  app.message(`${prefix}help`, async ({ say }) => {
    await say(`\`!help\`, \`!meme\`, \`!joke\`, \`!zenquote\`\n\nopen-source - https://github.com/Axorax/apicord.js`);
  });

  app.message(`${prefix}meme`, async ({ say }) => {
    const data = await apicord.meme();
    await say(`*${data.title}*\n\n${data.url}`);
  });

  app.message(`${prefix}joke`, async ({ say }) => {
    const data = await apicord.joke();
    await say(`${data.question}\n${data.answer}`);
  });

  app.message(`${prefix}zenquote`, async ({ say }) => {
    const data = await apicord.zenquote();
    await say(`"${data.quote}"\n\`author - ${data.author}\``);
  });

  `[+] Bolt app is running on PORT: ${PORT || 12000}`.green.log();
})();