const apicord = require('apicord');
const { Embed } = require("guilded.js");

const commands = {
    "help": (message) => {
        message.send(`\`!help\`, \`!meme\`, \`!joke\`, \`!zenquote\`, \`!gimme\`, \`!reddit <subreddit>\`, \`!mcip <mc-server-ip>\`, \`!chess <chess.com-username>\`, \`!github <github-username>\`, \`!gotiny <long-url>\`, \`!isgd <long-url>\`, \`!anagram <random-characters>\`, \`!crypto <crypto-currency> <currency-like-usd-OPTIONAL>\`\n\nopen-source - https://github.com/Axorax/apicord.js/tree/main/revolt.js`);
    },
    "meme": async (message) => {
        const data = await apicord.meme();
        message.send(
            new Embed()
                .setTitle("Random meme")
                .setDescription(`**${data.title}**`)
                .setColor("ORANGE")
                .setImage(data.url)
                .setTimestamp()
                .setURL(data.url)
        )
    },
    "joke": async (message) => {
        const data = await apicord.joke();
        message.send(`${data.question}\n${data.answer}`);
    },
    "zenquote": async (message) => {
        const data = await apicord.zenquote();
        message.send(`"${data.quote}"\n\`author - ${data.author}\``);
    },
    "gimme": async (message) => {
        const data = await apicord.gimme();
        message.send(
            new Embed()
                .setTitle("Random meme (gimme)")
                .setDescription(`**${data.title}**`)
                .setColor("ORANGE")
                .setImage(data.url)
                .setTimestamp()
                .setURL(data.url)
        )
    },
    "reddit": async (message, args, user_message) => {
        try {
            const data = await apicord.reddit(user_message);
            message.send(
                new Embed()
                    .setTitle("Subreddit post - " + data.subreddit)
                    .setDescription(`**${data.title}**`)
                    .setColor("ORANGE")
                    .setImage(data.url)
                    .setTimestamp()
                    .setURL(data.url)
            )
        } catch (error) {
            message.reply('Invalid subreddit!');
        }
    },
    "mcip": async (message, args, user_message) => {
        try {
            const data = await apicord.mcip(user_message);
            message.send(
                new Embed()
                    .setTitle("mcip - " + user_message)
                    .setDescription(`hostname: ${data.hostname}\nonline: ${data.online}\nversion: ${data.version}\nprotocol: ${data.protocol}\nplayers online: ${data.playersOnline}\nplayers maximum: ${data.playersMax}`)
                    .setColor("GREEN")
                    .setTimestamp()
            )
        } catch (error) {
            message.reply('Invalid IP!');
        }
    },
    "chess": async (message, args, user_message) => {
        try {
            const data = await apicord.chess(user_message);
            message.send(
                new Embed()
                    .setTitle("chess user info - " + user_message)
                    .setDescription(`name: ${data.name}\nusername: ${data.username}\nfollowers: ${data.followers}\nstreamer: ${data.streamer}`)
                    .setColor("GREEN")
                    .setTimestamp()
            )
        } catch (error) {
            message.reply('Invalid username!');
        }
    },
    "github": async (message, args, user_message) => {
        try {
            const data = await apicord.github(user_message);
            message.send(`username: ${data.username}\nname: ${data.name}\nfollowers: ${data.followers}\nfollowing: ${data.following}\nrepos: ${data.repos}`)
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
                msg += word + ", "
            });
            message.send(
                new Embed()
                    .setTitle("Anagram")
                    .setDescription(`**Characters:** ${user_message}\n**Words:** ${msg.slice(0, -2)}`)
                    .setColor("BLUE")
                    .setTimestamp()
            )
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
            message.reply(`Invalid usage!\n!crypto <crypto-currency> <currency-like-usd>`);
        }
    }
}

module.exports = commands;