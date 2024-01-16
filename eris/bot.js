const Eris = require("eris");
const colorium = require("colorium");
const commands = require("./commands.js");

const prefix = "!";
const token = "BOT-TOKEN-HERE";

const bot = new Eris(token, {
    intents: [
        "guilds",
        "guildMessages"
    ]
});

bot.on("ready", () => {
    "[+] Logged into bot!".green.log();
});

bot.on("error", (err) => {
    String(err).red.log();
});

bot.on("messageCreate", (msg) => {
    if (msg.content.startsWith(prefix)) {
        const args = msg.content.split(" ");
        const command = args.shift();
        if (!Boolean(command.replace(prefix, "") in commands)) {
            return;
        }
        commands[command.replace(prefix, "")](bot, msg, args, args.join(" "));
    }
});

bot.connect();