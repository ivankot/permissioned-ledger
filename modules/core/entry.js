const chainCrypto = require('./chain-crypto');
const crypto = require('crypto');

module.exports = {
    Entry: class Entry {

            constructor(type, metadata, payload, signature, owner) {
                this._type = type;
                this._nonce = crypto.randomBytes(32).toString('hex');
                this._prevHash = "";
                this._timestamp = new Date().getTime();
                this._signature = signature;
                this._payload = payload;
                this._payloadLength = payload.length;
                this._metadata = metadata;
                this._metadataLength = metadata.length;
                this._owner = owner;
                this._hash = this._calculateHash();
            }
        
            set prevHash(prevHash) {
                this._prevHash = prevHash;
            }
        
            get hash() {
                return this._calculateHash();
            }

            get type() {
                return this._type;
            }
        
            get signature() {
                return this._signature;
            }
        
            get timestamp() {
                return this._timestamp;
            }
            
            get owner() {
                return this._owner;
            }
        
            get block() {
                let block = this;
                return {
                    hash: block._hash,
                    type: block._type,
                    timestamp: block._timestamp,
                    signature: block._signature,
                    payload: block._payload,
                    payloadLength: block._payloadLength,
                    metadata: block._metadata,
                    metadataLength: block._metadataLength,
                    owner: block._owner,
                };
            }

            
            verify() {
                return chainCrypto
                    .verify(
                        this.signature, 
                        this.hash, 
                        this.owner
                    );
            }

            _calculateHash() {
                return chainCrypto.hash(
                    this._nonce,
                    this._timestamp,
                    this._payload,
                    this._metadata,
                    this._owner
                );
            }
        
        },
    EntryType: {
        info: 0,
        service: 1,
    },
};


