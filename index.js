const Telegraf = require('telegraf');
const bot = new Telegraf(''); //bot token
const { read } = require('fs');
const CharacterAI = require('./node_characterai');
const characterAI = new CharacterAI();
const botUsername = '@tgusername';

(async() => {
    await characterAI.authenticateWithToken(''); //cookie token
    const characterId = "" //characterid token
    const chat = await characterAI.createOrContinueChat(characterId);
    
    bot.start((ctx) => {
        ctx.reply('Welcome '+ ctx.from.first_name)
    });

    bot.on('text', async(ctx) => {
        console.log('Received message:', ctx.message.text);
        const chat = await characterAI.createOrContinueChat(characterId);
        if (ctx.message.text) {
            const messageText = ctx.message.text.replace(botUsername, '').trim();
            const response = await chat.sendAndAwaitResponse(messageText, true);
            const uppercaseResponse = response.text.toUpperCase();
            const personalizedResponse = '@' + ctx.from.username + ' ' + uppercaseResponse;
            ctx.reply(personalizedResponse);
        }
    });
})();

bot.launch()
