const {Configuration, OpenAIApi} = require("openai");
const open = require('open');
const readline = require('readline');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(`Enter keywords to generate your image\n`);
rl.prompt();

rl.on('line', (data) => {
    const response = openai.createImage({
        prompt: data,
        n: 1,
        size: "1024x1024",
    }).then((response) => {
        const url = response.data.data[0].url;
        console.log(`Image link :\n ${url}\n`)
        console.log(`Now open in browser ...\n`)
        open(url);
    });
});

rl.on('SIGINT', () => {
    rl.question('Exit (y or n)? ', (input) => {
        if (input.match(/^y(es)?$/i)) {
            rl.pause();
        }
    });
});
