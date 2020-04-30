// CORE MODULE IMPORTS
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');


// LOCAL IMPORTS
const logger = require('./res/logger');
const BOT_TOKEN = require('./config/key').TelegramBotToken;
const MongoAtlasURL = require('./config/key').MongoAtlasURL;
const memeHandler = require('./res/commands/meme');


// LOCAL VARIABLES
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;


// Connecting Mongoose with MongoDB Atlas using MongoAtlasURL from config/key.js file
mongoose.connect(MongoAtlasURL)
    .then(
        logger.info({
            message : 'Connected to MongoDB Atlas'
        })   
    )
    .catch(err => {
        logger.error({
            message : 'Error while connecting to MongoDB Atlas',
            file : 'index.js',
            error : err
        })
    });

const db = mongoose.connection;


// Initialising Telegram Bot with BOT_TOKEN from config/key.js file
const bot = new TelegramBot(BOT_TOKEN, {polling : true});
logger.info('Instantiated Telegram Bot');


// Handlifng errors (polling_error / webhook_error) for the Telegram Bot
bot.on('error', (err) => {
    logger.error({
        message : 'Telegram Bot Error',
        error : err
    })
});


// User is interacting with the bot for the first time
bot.onText(/\/start/, (msg) => {

    logger.info({
        message : '/start command received',
        userid : msg.from.id,
        username : msg.from.username,
    })

    bot.sendMessage(msg.from.id, "Hello There!\n\nI'm a Dank af bot created by @SidhantUnnithan. To see the amazing things I can do, try /commands\n\nI am constantly under development so don't mind if I make a few mistakes here and there. You can report any bugs on Github <a href = 'https://github.com/SidhantUnnithan/DankBot/issues'>here</a>! What's more? You can even contribute by visiting this <a href = 'https://github.com/SidhantUnnithan/DankBot'>link! </a>\n\nEnjoy!", {parse_mode : 'HTML'});
})


// User requested commands
bot.onText(/\/commands/, msg => {

    let userid = msg.from.id;
    let username = msg.from.username;

    logger.info({
        message : '/commands command received',
        userid : userid,
        username : username
    });

    let message = 'The list of commands are-\n';
    message += '/commands - See list of commands\n';
    message += '/memes - Get a meme from Reddit';

    bot.sendMessage(userid, message);

});


// User requested for memes
bot.onText(/\/memes/, msg => {

    let userid = msg.from.id;
    let username = msg.from.username;

    logger.info({
        message : '/memes command received',
        userid : userid,
        username : username
    });

    memeHandler.getMeme(retPackage => {
        
        if(retPackage.code == 400){
            bot.sendMessage(userid, 'Error Retrieving meme. Please contact @SidhantUnnithan');
        }
        else{
            
            logger.info({
                message : 'Received Meme Package',
                package : retPackage
            });

            bot.sendPhoto(userid, retPackage.url);
        }
    });
    
})

// Message Receieved
bot.on('text', (msg, type) => {
    
    logger.info({
        message : 'Message Received',
        userid : msg.from.id,
        username : msg.from.username,
        text : msg.text
    })
})


