require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api')
const token = process.env.API_KEY;
const bot = new TelegramApi(token, {polling: true})
const delMsg = () => {
    bot.on('message', async (msg) => {
        if (msg.voice) {
            const chatId = msg.chat.id
            const messageId = msg.message_id
            const name = msg.from.first_name
            try {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, `${name}, аудиосообщения запрещены в чате`)
            } catch (e) {
                console.log(e)
            }
        }
    })
}
delMsg();
