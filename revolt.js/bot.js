import { Client } from "revolt.js";
import { colorium } from "colorium";
import { apicord } from "apicord";

const prefix = "!";
const token = "BOT-TOKEN-HERE";

let client = new Client();
const commands = {
    "help": (message) => {
        message.channel.sendMessage(`\`${prefix}help\`, \`${prefix}meme\`, \`${prefix}joke\`, \`${prefix}zenquote\`, \`${prefix}gimme\`, \`${prefix}reddit <subreddit>\`, \`${prefix}mcip <mc-server-ip>\`, \`${prefix}chess <chess.com-username>\`, \`${prefix}github <github-username>\`, \`${prefix}gotiny <long-url>\`, \`${prefix}isgd <long-url>\`, \`${prefix}anagram <random-characters>\`, \`${prefix}crypto <crypto-currency> <currency-like-usd-OPTIONAL>\`\n\n[open-source](<https://github.com/Axorax/apicord.js/tree/main/revolt.js>)`);
    },
    "meme": async (message) => {
        const data = await apicord.meme();
        message.channel.sendMessage(`### ${data.title}\n\n${data.url}`);
    },
    "joke": async (message) => {
        const data = await apicord.joke();
        message.channel.sendMessage(`${data.question}\n${data.answer}`);
    },
    "zenquote": async (message) => {
        const data = await apicord.zenquote();
        message.channel.sendMessage(`"${data.quote}"\n\`author - ${data.author}\``);
    },
    "gimme": async (message) => {
        const data = await apicord.gimme();
        message.channel.sendMessage(`### ${data.title}\n\n${data.url}`);
    },
    "reddit": async (message, args, user_message) => {
        try {
            const data = await apicord.reddit(user_message);
            message.channel.sendMessage(`### ${data.title}\n\n${data.url}`)
        } catch (error) {
            message.reply('Invalid subreddit!');
        }
    },
    "mcip": async (message, args, user_message) => {
        try {
            const data = await apicord.mcip(user_message);
            message.channel.sendMessage(`hostname: ${data.hostname}\nonline: ${data.online}\nversion: ${data.version}\nprotocol: ${data.protocol}\nplayers online: ${data.playersOnline}\nplayers maximum: ${data.playersMax}`)
        } catch (error) {
            message.reply('Invalid IP!');
        }
    },
    "chess": async (message, args, user_message) => {
        try {
            const data = await apicord.chess(user_message);
            message.channel.sendMessage(`name: ${data.name}\nusername: ${data.username}\nfollowers: ${data.followers}\nstreamer: ${data.streamer}`)
        } catch (error) {
            message.reply('Invalid username!');
        }
    },
    "github": async (message, args, user_message) => {
        try {
            const data = await apicord.github(user_message);
            message.channel.sendMessage(`username: ${data.username}\nname: ${data.name}\nfollowers: ${data.followers}\nfollowing: ${data.following}\nrepos: ${data.repos}`)
        } catch (error) {
            message.reply('Invalid username!');
        }
    },
    "gotiny": async (message, args, user_message) => {
        try {
            const data = await apicord.gotiny(user_message);
            message.reply(`<${data}>`)
        } catch (error) {
            message.reply('Invalid URL!');
        }
    },
    "isgd": async (message, args, user_message) => {
        try {
            const data = await apicord.isgd(user_message);
            message.reply(`<${data}>`)
        } catch (error) {
            message.reply('Invalid URL!');
        }
    },
    "anagram": async (message, args, user_message) => {
        try {
            let msg = "";
            const data = await apicord.anagram(user_message);
            data.forEach(word => {
                msg += word + "\n"
            });
            message.reply(msg.slice(0, -2))
        } catch (error) {
            message.reply('Invalid usage!');
        }
    },
    "crypto": async (message, args) => {
        try {
            let data, price;
            if (args[1]) {
                data = await apicord.crypto(args[0], args[1]);
                price = args[1] + ': ' + data[args[1]];
            } else {
                data = await apicord.crypto(args[0]);
                price = 'usd: ' + data.usd;
            }
            message.reply(String(price));
        } catch (error) {
            message.reply(`Invalid usage!\n${prefix}crypto <crypto-currency> <currency-like-usd>`);
        }
    }
}

client.on("ready", async () =>
    `[+] Logged in as ${client.user.username}!`.green.log());

client.on("messageCreate", async (message) => {
    if (message.authorId == client.user.id) {
        return;
    }
    if (String(message.content).startsWith(prefix)) {
        const args = String(message.content).split(" ");
        const command = args.shift().replace(prefix, "");
        if (!Boolean(command in commands)) {
            return;
        }
        commands[command](message, args, message.content.replace(`${prefix}${command} `, ''));
    }
});

client.loginBot(token);