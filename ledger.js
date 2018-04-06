const Logger = require('basic-logger');

const { generateKeys } = require('./modules/core/chain-crypto');
const Interface = require('./modules/cmd/interface');

const loggerConfig = {
    showMillis: false,
    showTimestamp: true,
};

const LOG = new Logger(loggerConfig);

LOG.info('ledger started');

const iface = new Interface(process.argv);
iface.processArguments();

LOG.info('ledger finished');


