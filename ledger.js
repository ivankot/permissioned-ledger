const Logger = require('basic-logger');

const { generateKeys } = require('./modules/core/chain-crypto');

const loggerConfig = {
    showMillis: false,
    showTimestamp: true,
};

const {Entry, EntryType} = require('./modules/core/entry');
const Chain = require('./modules/core/chain')


let entry = new Entry(EntryType.info, "asd", "dsa", "sss");
let chain = new Chain('test', 'asdasdasd');

let keys = generateKeys();

console.log(keys.publicKey);
console.log(keys.privateKey);

// console.log(entry);
// console.log(chain);
// console.log(chain.computeHash());

var logger = new Logger(loggerConfig);

logger.info('Starting the sample chain');
