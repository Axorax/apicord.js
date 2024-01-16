const apicord = require('apicord');

const commands = {
    "help": (bot, msg) => {
        bot.createMessage(msg.channel.id,`\`!help\`, \`!meme\`, \`!joke\`, \`!zenquote\`, \`!gimme\`, \`!reddit <subreddit>\`, \`!mcip <mc-server-ip>\`, \`!chess <chess.com-username>\`, \`!github <github-username>\`, \`!gotiny <long-url>\`, \`!isgd <long-url>\`, \`!anagram <random-characters>\`, \`!crypto <crypto-currency> <currency-like-usd-OPTIONAL>\`\n\nopen-source: <https://github.com/Axorax/apicord.js/tree/main/revolt.js>`);
    },
    "meme": async (bot, msg) => {
        const data = await apicord.meme();
        bot.createMessage(msg.channel.id,`**${data.title}**\n\n${data.url}`);
    },
    "joke": async (bot, msg) => {
        const data = await apicord.joke();
        bot.createMessage(msg.channel.id,`${data.question}\n${data.answer}`);
    },
    "zenquote": async (bot, msg) => {
        const data = await apicord.zenquote();
        bot.createMessage(msg.channel.id,`"${data.quote}"\n\`author - ${data.author}\``);
    },
    "gimme": async (bot, msg) => {
        const data = await apicord.gimme();
        bot.createMessage(msg.channel.id,`**${data.title}**\n\n${data.url}`);
    },
    "reddit": async (bot, msg, args, user_message) => {
        try {
            const data = await apicord.reddit(user_message);
            bot.createMessage(msg.channel.id,`**${data.title}**\n\n${data.url}`)
        } catch (error) {
             bot.createMessage(msg.channel.id,'Invalid subreddit!');
        }
    },
    "mcip": async (bot, msg, args, user_message) => {
        try {
            const data = await apicord.mcip(user_message);
            bot.createMessage(msg.channel.id,`hostname: ${data.hostname}\nonline: ${data.online}\nversion: ${data.version}\nprotocol: ${data.protocol}\nplayers online: ${data.playersOnline}\nplayers maximum: ${data.playersMax}`)
        } catch (error) {
             bot.createMessage(msg.channel.id,'Invalid IP!');
        }
    },
    "chess": async (bot, msg, args, user_message) => {
        try {
            const data = await apicord.chess(user_message);
            bot.createMessage(msg.channel.id,`name: ${data.name}\nusername: ${data.username}\nfollowers: ${data.followers}\nstreamer: ${data.streamer}`)
        } catch (error) {
             bot.createMessage(msg.channel.id,'Invalid username!');
        }
    },
    "github": async (bot, msg, args, user_message) => {
        try {
            const data = await apicord.github(user_message);
            bot.createMessage(msg.channel.id,`username: ${data.username}\nname: ${data.name}\nfollowers: ${data.followers}\nfollowing: ${data.following}\nrepos: ${data.repos}`)
        } catch (error) {
             bot.createMessage(msg.channel.id,'Invalid username!');
        }
    },
    "gotiny": async (bot, msg, args, user_message) => {
        try {
            const data = await apicord.gotiny(user_message);
            message.reply(`<${data}>`)
        } catch (error) {
             bot.createMessage(msg.channel.id,'Invalid URL!');
        }
    },
    "isgd": async (bot, msg, args, user_message) => {
        try {
            const data = await apicord.isgd(user_message);
            message.reply(`<${data}>`)
        } catch (error) {
             bot.createMessage(msg.channel.id,'Invalid URL!');
        }
    },
    "anagram": async (bot, msg, args, user_message) => {
        try {
            let msg = "";
            const data = await apicord.anagram(user_message);
            data.forEach(word => {
                msg += word + "\n"
            });
            message.reply(msg.slice(0, -2))
        } catch (error) {
             bot.createMessage(msg.channel.id,'Invalid usage!');
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
            message.reply(`Invalid usage!\n!crypto <crypto-currency> <currency-like-usd>`);
        }
    },
}

module.exports = commands;