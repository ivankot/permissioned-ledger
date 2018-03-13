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

    get blocks() {
        return Array.from(this._blocks);
    }

    get creator() {
        return this._creator;
    }

    get alias() {
        return this._alias;
    }

    set alias(alias) {
        this._alias = alias;
        this._hash = this.computeHash();
    }

    get readers() {
        return Array.from(this._allowedReaders);
    }

    get writers() {
        return Array.from(this._allowedWriters);
    }

    get administrators() {
        return Array.from(this._allowedAdministrators);
    }

    addBlock(block) {
        let result = false;
        if (this._validateIdentity(block.owner, this._allowedWriters)) {
            if (block.verify()) {
                let prevHash = this._blocks.slice(-1)[0];
                block.prevHash = prevHash;
                this._blocks.push(block);
                this._updatedTimestamp = new Date().getTime();
                result = true;
            }
        }
        return result;
    }

    addReader(readerPublicKey, callerKey) {
        return this._grantPermission(this._allowedReaders, readerPublicKey, callerKey);
    }

    addWriter(writerPublicKey, callerKey) {
        return this._grantPermission(this._allowedWriters, writerPublicKey, callerKey);
    }

    addAdministrator(administratorPublicKey, callerKey) {
        return this._grantPermission(this._allowedAdministrators, administratorPublicKey, callerKey);
    }

    removeReader(readerPublicKey, callerKey) {
        return this._revokePermission(this._allowedReaders, readerPublicKey, callerKey);
    }

    removeWriter(writerPublicKey, callerKey) {
        return this._revokePermission(this._allowedWriters, writerPublicKey, callerKey);
    }

    removeAdministrator(administratorPublicKey, callerKey) {
        return this._revokePermission(this._allowedAdministrators, administratorPublicKey, callerKey);
    }

    computeHash() {
        return chainCrypto.hash(
                this._alias,
                this._createdTimestamp,
                this._creator,
                this._nonce
                );
    }

    _validateIdentity(callerKey, property = this._allowedAdministrators) {
        return (property.findIndex(callerKey >= 0));
    }

    _grantPermission(property, userPublicKey, callerKey) {
        let result = false;
        if (this._validateIdentity(callerKey)) {
            if (undefined === property.find(userPublicKey)) {
                property.push(userPublicKey);
            }
            result = true;
        }
        return result;
    }

    _revokePermission(property, userPublicKey, callerKey) {
        let result = false;
        // cannot remove self
        if (userPublicKey != callerKey) {
            let elementIndex = property.findIndex(userPublicKey);
            if (this._validateIdentity(callerKey) && elementIndex >= 0) {
                property.splice(elementIndex, 1);
                result = true;
            }
        }
        return result;
    }

}