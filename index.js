require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api')
const token = process.env.API_KEY;
const bot = new TelegramApi(token, {polling: true})
const delMsg = () => {
    bot.on('message', async (msg) => {
            if (!msg.voice) {
                return
            }
            const chatId = msg.chat.id
            const messageId = msg.message_id
            const name = `@${msg.from.username}` || msg.from.first_name || 'Безымянный'
            try {
                await bot.deleteMessage(chatId, messageId)
                const botMessage = await bot.sendMessage(chatId, `${name}, голосовые сообщения запрещены в чате 🤐`)
                const handler = setTimeout(() => {
                    bot.deleteMessage(chatId, botMessage?.message_id)
                    clearTimeout(handler)
                }, 20000)
            } catch (e) {
                console.log(e)
            }
        }
    )
}
delMsg()
