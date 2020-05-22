var winston = require('winston');

var winston = new (winston.Logger)({  
    transports: [
        new (winston.transports.Console)({ level: 'debug' }),
        new (winston.transports.File)({ filename: __dirname + '/rss-feed.log', level: 'debug' })
    ]
});

module.exports = winston; 