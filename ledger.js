const Logger = require('basic-logger');

const loggerConfig = {
    showMillis: false,
    showTimestamp: true,
};

const {Entry, EntryType} = require('./modules/core/entry.js');

let entry = new Entry(EntryType.info, "asd", "dsa", "sss");

console.log(entry);

var logger = new Logger(loggerConfig);

logger.info('Starting the sample chain');
