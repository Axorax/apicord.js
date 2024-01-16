const { Client } = require("oceanic.js");
const { colorium } = require("colorium");
const commands = require('./commands.js');

const prefix = "!";
const token = "BOT-TOKEN-HERE";

const client = new Client({
    auth: `Bot ${token}`,
    gateway: {
        intents: ["GUILDS", "GUILD_MESSAGES", "MESSAGE_CONTENT"]
    }
});

client.on("ready", async() => {
    `[+] Logged in as ${client.user.tag}`.green.log();
});

client.on("error", (err) => {
    String(err).red.log();
});

client.on("messageCreate", async (msg) => {
    if (msg.content.startsWith(prefix)) {
        const args = msg.content.split(" ");
        const command = args.shift();
        if (!Boolean(command.replace(prefix, "") in commands)) {
            return;
        }
        commands[command.replace(prefix, "")](client, msg, args, args.join(" "));
    }
});

client.connect();