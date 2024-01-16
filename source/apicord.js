export class Apicord {
  async github(u = '') {
    if (String(u).trim().length === 0) return undefined;
    const res = await fetch(`https://api.github.com/users/${u}`);
    const json = await res.json();
    if (!json.login) return undefined;
    return json;
  }

  async reddit(u) {
    const res = await fetch(`https://www.reddit.com/r/${u}/random/.json`);
    const json = await res.json();
    if (!json[0]) return undefined;
    const data = json[0].data.children[0].data;
    return {
      title: data.title,
      ups: data.ups,
      downs: data.downs,
      totalAwards: data.total_awards_received,
      created: data.created,
      edited: data.edited,
      spoiler: data.spoiler,
      url: data.url,
      thumbnail: data.thumbnail,
      video: data.is_video,
      subreddit: data.subreddit,
      preview: data.preview.images,
    };
  }

  async meme(r = ["memes", "me_irl", "dankmemes", "comedyheaven"]) {
    const d = await this.reddit(r[Math.floor(Math.random() * r.length)]);
    return d;
  }

  async gimme() {
    const res = await fetch("https://meme-api.com/gimme");
    if (!res.ok) throw new Error('[apicord] Response is not ok "gimme()"');
    const json = await res.json();
    return json;
  }

  async mcip(u) {
    const res = await fetch(`https://api.mcsrvstat.us/2/${u}`);
    if (!res.ok) throw new Error('[apicord] Response is not ok "mcip()"');
    const json = await res.json();
    if (!json.players) return undefined;
    return {
      hostname: json.hostname,
      online: json.online,
      version: json.version,
      protocol: json.protocol,
      playersOnline: json.players.online,
      playersMax: json.players.max,
    };
  }

  async chess(u) {
    const res = await fetch(`https://api.chess.com/pub/player/${u}`);
    if (!res.ok) throw new Error('[apicord] Response is not ok "chess()"');
    const json = await res.json();
    if (json.avatar === undefined) return undefined;
    return {
      avatar: json.avatar,
      id: json.player_id,
      url: json.url,
      name: json.name,
      username: json.username,
      followers: json.followers,
      joined: json.joined,
      league: json.league,
      verified: json.verified,
      streamer: json.is_streamer,
      status: json.status,
      lastOnline: json.last_online,
    };
  }

  async gotiny(u) {
    const res = await fetch("https://gotiny.cc/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: u }),
    });
    const data = await res.json();
    if (data.error !== undefined) return undefined;
    return "https://gotiny.cc/" + data[0].code;
  }

  async isgd(u) {
    const res = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(u)}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    if (data.shorturl === undefined) return undefined;
    return data.shorturl;
  }

  async joke() {
    const res = await fetch("https://joke.deno.dev/");
    if (!res.ok) throw new Error('[apicord] Response is not ok "joke()"');
    const data = await res.json();
    return {
      type: data.type,
      question: data.setup,
      answer: data.punchline,
    };
  }

  async zenquote() {
    const res = await fetch("https://zenquotes.io/api/random");
    if (!res.ok) throw new Error('[apicord] Response is not ok "zenquote()"');
    const data = await res.json();
    return {
      quote: data[0].q,
      author: data[0].a,
    };
  }

  async anagram(u = '') {
    if (u.trim().length === 0) return undefined;
    const res = await fetch(`http://www.anagramica.com/all/${u}`);
    if (!res.ok) throw new Error('[apicord] Response is not ok "anagram()"');
    const data = await res.json();
    return data.all;
  }

  async crypto(u, x = 'usd') {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${u}&vs_currencies=${x}`);
    if (!res.ok) throw new Error('[apicord] Response is not ok "anagram()"');
    const data = await res.json();
    if (Object.keys(data).length === 0) return undefined;
    return data[u];
  }
}

export default Apicord;

// Example usage:
// const apicordInstance = new Apicord();
// const githubData = await apicordInstance.github('wd');
// console.log(githubData);
