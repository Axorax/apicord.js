const apicord = require('apicord');

const commands = {
    "help": async (client, msg) => {
        await client.rest.channels.createMessage(msg.channel.id, {content: `\`!help\`, \`!meme\`, \`!joke\`, \`!zenquote\`, \`!gimme\`, \`!reddit <subreddit>\`, \`!mcip <mc-server-ip>\`, \`!chess <chess.com-username>\`, \`!github <github-username>\`, \`!gotiny <long-url>\`, \`!isgd <long-url>\`, \`!anagram <random-characters>\`, \`!crypto <crypto-currency> <currency-like-usd-OPTIONAL>\`\n\nopen-source: <https://github.com/Axorax/apicord.js/tree/main/revolt.js>`});
    },
    "meme": async (client, msg) => {
        const data = await apicord.meme();
        await client.rest.channels.createMessage(msg.channel.id, {content: `**${data.title}**\n\n${data.url}`});
    },
    "joke": async (client, msg) => {
        const data = await apicord.joke();
        await client.rest.channels.createMessage(msg.channel.id, {content: `${data.question}\n${data.answer}`});
    },
    "zenquote": async (client, msg) => {
        const data = await apicord.zenquote();
        await client.rest.channels.createMessage(msg.channel.id, {content: `"${data.quote}"\n\`author - ${data.author}\``});
    },
    "gimme": async (client, msg) => {
        const data = await apicord.gimme();
        await client.rest.channels.createMessage(msg.channel.id, {content: `**${data.title}**\n\n${data.url}`});
    },
    "reddit": async (client, msg, args, user_message) => {
        try {
            const data = await apicord.reddit(user_message);
            await client.rest.channels.createMessage(msg.channel.id, {content: `**${data.title}**\n\n${data.url}`})
        } catch (error) {
            await client.rest.channels.createMessage(msg.channel.id, {content: 'Invalid subreddit!'});
        }
    },
    "mcip": async (client, msg, args, user_message) => {
        try {
            const data = await apicord.mcip(user_message);
            await client.rest.channels.createMessage(msg.channel.id, {content: `hostname: ${data.hostname}\nonline: ${data.online}\nversion: ${data.version}\nprotocol: ${data.protocol}\nplayers online: ${data.playersOnline}\nplayers maximum: ${data.playersMax}`});
        } catch (error) {
            await client.rest.channels.createMessage(msg.channel.id, {content: 'Invalid IP!'});
        }
    },
    "chess": async (client, msg, args, user_message) => {
        try {
            const data = await apicord.chess(user_message);
            await client.rest.channels.createMessage(msg.channel.id, {content: `name: ${data.name}\nusername: ${data.username}\nfollowers: ${data.followers}\nstreamer: ${data.streamer}`})
        } catch (error) {
            await client.rest.channels.createMessage(msg.channel.id, {content: 'Invalid username!'});
        }
    },
    "github": async (client, msg, args, user_message) => {
        try {
            const data = await apicord.github(user_message);
            await client.rest.channels.createMessage(msg.channel.id, {content: `username: ${data.username}\nname: ${data.name}\nfollowers: ${data.followers}\nfollowing: ${data.following}\nrepos: ${data.repos}`})
        } catch (error) {
            await client.rest.channels.createMessage(msg.channel.id, {content: 'Invalid username!'});
        }
    },
    "gotiny": async (client, msg, args, user_message) => {
        try {
            const data = await apicord.gotiny(user_message);
            await client.rest.channels.createMessage(msg.channel.id, {content: `<${data}>`})
        } catch (error) {
            await client.rest.channels.createMessage(msg.channel.id, {content: 'Invalid URL!'});
        }
    },
    "isgd": async (client, msg, args, user_message) => {
        try {
            const data = await apicord.isgd(user_message);
            await client.rest.channels.createMessage(msg.channel.id, {content: `<${data}>`})
        } catch (error) {
            await client.rest.channels.createMessage(msg.channel.id, {content: 'Invalid URL!'});
        }
    },
    "anagram": async (client, msg, args, user_message) => {
        try {
            let msg = "";
            const data = await apicord.anagram(user_message);
            data.forEach(word => {
                msg += word + "\n"
            });
            await client.rest.channels.createMessage(msg.channel.id, {content: msg.slice(0, -2)})
        } catch (error) {
            await client.rest.channels.createMessage(msg.channel.id, {content: 'Invalid usage!'});
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
            await client.rest.channels.createMessage(msg.channel.id, {content: String(price)});
        } catch (error) {
            await client.rest.channels.createMessage(msg.channel.id, {content: `Invalid usage!\n!crypto <crypto-currency> <currency-like-usd>`});
        }
    },
}

module.exports = commands;