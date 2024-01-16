const fetch=require("node-fetch"),apicord={async github(e=""){if(0==String(e).trim().length)return;let t=await fetch(`https://api.github.com/users/${e}`),a=await t.json();if(a.login)return{username:a.login,id:a.id,nodeId:a.node_id,avatar:a.avatar_url,url:a.html_url,type:a.type,name:a.name,company:a.company,location:a.location,email:a.email,hireable:a.hireable,bio:a.bio,followers:a.followers,following:a.following,created:a.created_at,updated:a.updated_at,repos:a.public_repos,gists:a.public_gists,twitter:a.twitter_username,blog:a.blog}},async reddit(e){let t=await fetch(`https://www.reddit.com/r/${e}/random/.json`),a=await t.json();if(!a[0])return;let o=a[0].data.children[0].data;return{title:o.title,ups:o.ups,downs:o.downs,totalAwards:o.total_awards_received,created:o.created,edited:o.edited,spoiler:o.spoiler,url:o.url,thumbnail:o.thumbnail,video:o.is_video,subreddit:o.subreddit,preview:o.preview.images}},async meme(e=["memes","me_irl","dankmemes","comedyheaven"]){let t=await apicord.reddit(e[Math.floor(Math.random()*e.length)]);return t},async gimme(){let e=await fetch("https://meme-api.com/gimme");if(!e.ok)throw Error('[apicord] Response is not ok "gimme()"');let t=await e.json();return t},async mcip(e){let t=await fetch(`https://api.mcsrvstat.us/2/${e}`);if(!t.ok)throw Error('[apicord] Response is not ok "mcip()"');let a=await t.json();if(a.players)return{hostname:a.hostname,online:a.online,version:a.version,protocol:a.protocol,playersOnline:a.players.online,playersMax:a.players.max}},async chess(e){let t=await fetch(`https://api.chess.com/pub/player/${e}`);if(!t.ok)throw Error('[apicord] Response is not ok "chess()"');let a=await t.json();if(void 0!=a.avatar)return{avatar:a.avatar,id:a.player_id,url:a.url,name:a.name,username:a.username,followers:a.followers,joined:a.joined,league:a.league,verified:a.verified,streamer:a.is_streamer,status:a.status,lastOnline:a.last_online}},async gotiny(e){let t=await fetch("https://gotiny.cc/api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({input:e})}),a=await t.json();if(void 0==a.error)return"https://gotiny.cc/"+a[0].code},async isgd(e){let t=await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(e)}`,{method:"POST"}),a=await t.json();if(void 0!=a.shorturl)return a.shorturl},async joke(){let e=await fetch("https://joke.deno.dev/");if(!e.ok)throw Error('[apicord] Response is not ok "joke()"');let t=await e.json();return{type:t.type,question:t.setup,answer:t.punchline}},async zenquote(){let e=await fetch("https://zenquotes.io/api/random");if(!e.ok)throw Error('[apicord] Response is not ok "zenquote()"');let t=await e.json();return{quote:t[0].q,author:t[0].a}},async anagram(e=""){if(0===e.trim().length)return;let t=await fetch(`http://www.anagramica.com/all/${e}`);if(!t.ok)throw Error('[apicord] Response is not ok "anagram()"');let a=await t.json();return a.all},async crypto(e,t="usd"){let a=await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${e}&vs_currencies=${t}`);if(!a.ok)throw Error('[apicord] Response is not ok "anagram()"');let o=await a.json();if(0!=Object.keys(o).length)return o[e]}};module.exports=apicord