const VERSION = '0.1.0';

module.exports = class Interface {

    constructor(args) {
        this._program = require('commander');
        this._program
            .version(VERSION, '-v, --version')
            .option('-b, --bootstrap', 'Bootstrap server: generate keys and config and store them locally')
            .option('-g, --generate', 'Bootstrap client: generate keys and store them locally')
            .option('-s, --server <command>', 'Control server: start, stop, status')
            .option('-v, --version', 'Print version and exit')
            .option('-c, --connect <address:port>', 'Connect to server @ address:port')
            .option('-k, --key <keyfile>', 'Key to use when connecting and working with the ledger')
            .option('-m, --message [message]', 'Message to send via the client to server')
            .parse(args);
        this._handlers = new Map();
    }

    get handlers() {
        return new Map(this._handlers);
    }

    registerHandler(command, handler) {
        const allowedCommands = [
            'bootstrap',
            'generate',
            'server',
            'version',
            'connect',
        ];
        let result = true;

        if (allowedCommands.includes(command) && typeof handler === 'function') {
            this._handlers.set(command, handler);
        } else {
            result = false;
        }

        return result;
    }

    processArguments() {

        let handler = this._defaultHandler;
        let args = new Map();

        if (this._program.bootstrap && this._handlers.has('bootstrap')) {
            handler = this._handlers.get('bootstrap');
        }
        if (this._program.generate && this._handlers.has('generate')) {
            handler = this._handlers.get('generate');
        }
        if (this._program.server && this._handlers.has('server')) {
            handler = this._handlers.get('server');
            args.set('server', this._program.server);
        }
        if (this._program.connect && this._handlers.has('connect')) {
            handler = this._handlers.get('connect');
        }
        if (this._program.key) {
            args.set('key', this._program.key);
        }
        if (this._program.message) {
            args.set('message', this._program.message);
        }

        handler.call(this, args);
    }

    _defaultHandler() {
        this._program.help();
    }

}