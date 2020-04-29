const TelegramBot = require('telegram-bot-api');

const BOT_TOKEN = require('../config/key').TelegramBotToken;
const logger = require('./logger');

// Initialise the Bot
const bot = new TelegramBot(BOT_TOKEN, {polling : true});


// Handle Telegram Bot Error
bot.on('error', (err) => {
    logger.error({
        message : 'Telegram Bot Error',
        error : err
    });
})

module.exports = bot;