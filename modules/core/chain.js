const crypto = require('crypto');
const chainCrypto = require('./chain-crypto');

module.exports = class Chain {

    constructor(alias, creatorPublicKey) {
        this._blocks = [];
        this._createdTimestamp = this._updatedTimestamp = new Date().getTime();
        this._allowedWriters = [];
        this._allowedReaders = [];
        this._allowedAdministrators = [];
        this._alias = alias;
        this._creator = creatorPublicKey;
        this._nonce = crypto.randomBytes(32).toString('hex');
        this._hash = this.computeHash();
        this._allowedAdministrators.push(creatorPublicKey);
        this._allowedReaders.push(creatorPublicKey);
        this._allowedWriters.push(creatorPublicKey);
    }

    computeHash() {
        return chainCrypto.hash(
                this._alias,
                this._createdTimestamp,
                this._creator,
                this._nonce
                );
    }

}