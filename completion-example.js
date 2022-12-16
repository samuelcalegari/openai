const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface(process.stdin, process.stdout);

let datas = ""

rl.setPrompt(`Hello, how can I help you?\n`);
rl.prompt();

rl.on('line', (data) => {

    datas += data + "\n";
    const completion = openai.createCompletion({
        model: "text-davinci-003",
        prompt: datas,
        max_tokens: 400
    }).then((result) => {
        datas += result.data.choices[0].text + "\n"
        console.log(result.data.choices[0].text);
    });
});

rl.on('SIGINT', () => {
    rl.question('Exit (y or n)? ', (input) => {
        if (input.match(/^y(es)?$/i)) { rl.pause(); }
    });
});
