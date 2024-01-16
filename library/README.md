<p align="center"><img src="https://raw.githubusercontent.com/Axorax/apicord.js/f417f7f7be3e2837626b4bb1275fd07163ab85bf/apicord.js.svg"></p>

<p align="center">Random images, quotes and more</p>

## ⚙️ Installation

```terminal
npm i apicord
```

## 📘 Usage

#### • Example code

```js
const apicord = require('apicord');
// ES6: import apicord from 'apicord';

async function get() {
    const gotten = await apicord.reddit('memes');
    console.log(gotten);
}
  
get();
```

#### • All APIs

Arguments will be explained and referred to using the syntax `(1)` first argument, `(2)` second argument and vice versa. `(1-o)` means first argument and that it is optional.

```js
apicord.reddit('memes') // (1) name of subreddit
apicord.github('axorax') // (1) github username

apicord.meme() // random meme from reddit
apicord.meme(['memes']) // (1-o) array of meme subreddits

apicord.gimme() // random meme
apicord.mcip('mc.hypixel.net') // (1) minecraft server ip address
apicord.chess('axorax') // (1) chess.com username
apicord.gotiny('https://github.com/axorax') // url shortener (1) long URL
apicord.isgd('https://github.com/axorax') // url shortener (1) long URL
apicord.joke() // random joke
apicord.zenquote() // random zenquote
apicord.anagram('afaef') // (1) any characters

apicord.crypto('bitcoin') // get crypto price (1) crypto currency
apicord.crypto('bitcoin', 'usd') // (1) crypto currency (2-o) price currency 'usd' by default
```

---

[Support me on Patreon](https://www.patreon.com/axorax) - 
[Check out my socials](https://github.com/axorax/socials)