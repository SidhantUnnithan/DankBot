const winston = require('winston'); require('winston-daily-rotate-file');
const {createLogger, format} = winston;
const {combine, timestamp, prettyPrint} = format;


// Defines the frequence in which log files will be created and archived. Log Files can be found in the logs folder.
// filename : The name of the log file. %DATE% will add the Date to the file.
// dirname : Directory where the log files will be stored
// datePattern : Defines the Pattern in which log files will be Named
// zippedAchive : If the log files will be zipped after it reaches the limit
// utc : Boolean which defines whether time displayed will be in UTC
// maxSize : Maximum Size of each log file after which a new file will be created. 'k', 'm', 'g' can be used
// maxFiles : Maximum days after which the log archives will be deleted. 
// level : Specifies the minimum level which will be logged to the file.

var transport = new (winston.transports.DailyRotateFile)({
    filename: 'DankBot %DATE%.log',
    dirname : './logs/',
    datePattern: 'HH:MM DD-MM-YYYY',
    zippedArchive: true,
    utc : false,
    maxSize: '100m',
    maxFiles: '10d',
    level : 'info',
});


// timezoned function which will be called by the logger formatter.

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Calcutta'
    });
};

// Custom Levels which will follow the RFC5424 format.
// Severity of levels is assumed to be numberically ascending from most important to least important
// See - https://tools.ietf.org/html/rfc5424

const customLevels = {
    levels: {
      error: 0,
      message: 1,
      info: 2,
    },
};

const logger = createLogger({
    levels : customLevels.levels,

    format : combine(
        timestamp({
            format : timezoned
        }),
        prettyPrint()
    ),

    transports : [
        transport,
        new winston.transports.Console({
            level : 'info'
        })
    ]
})

module.exports = logger;
