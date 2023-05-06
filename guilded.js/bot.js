const { Client } = require("guilded.js");
const { colorium } = require("colorium");
const commands = require("./commands.js");

const token = "BOT-TOKEN-HERE";
const prefix = "!";

const client = new Client({ token: token });

client.on("ready", () => {
    `[+] Logged into bot`.green.log();
});

client.on("messageCreated", (message) => {
    if (message.createdByBotId) return
    if (message.content.startsWith(prefix)) {
        const args = message.content.split(" ");
        const command = args.shift().replace(prefix, "");
        if (!Boolean(command in commands)) {
            return;
        }
        commands[command](message, args, message.content.replace(`${prefix}${command} `, ''));
    }
});

client.login();