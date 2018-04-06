const chainCrypto = require('./chain-crypto');
const fs = require('fs');

const CONFIG_DIR = 'config';
const CLIENT_DIR = 'client';
const PRIVATE_KEY_NAME = 'private.key';
const PUBLIC_KEY_NAME = 'public.key';

module.exports = {
    generateServerKeys() {
        this._generateKeys(CONFIG_DIR);
    },

    generateClientKeys() {
        this._generateKeys(CLIENT_DIR);
    },

    _generateKeys(dir) {
        const keychain = chainCrypto.generateKeys();
        let publicKeyPath = dir + '/' + PUBLIC_KEY_NAME;
        let privateKeyPath = dir + '/' + PRIVATE_KEY_NAME;

        if (fs.existsSync(dir)) {
            fs.unlinkSync(publicKeyPath);
            fs.unlinkSync(privateKeyPath);
            fs.rmdirSync(dir);
        }

        fs.mkdirSync(dir);
        fs.writeFileSync(privateKeyPath, keychain.privateKey, {encoding: 'hex'});
        fs.writeFileSync(publicKeyPath, keychain.publicKey, {encoding: 'hex'});
    }
}