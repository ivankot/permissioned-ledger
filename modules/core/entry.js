module.exports = {
    Entry: class Entry {

            constructor(type, metadata, payload, signature, owner) {
                this._type = type;
                this._prevHash = "";
                this._hash = "";
                this._timestamp = "";
                this._signature = signature;
                this._payload = payload;
                this._payloadLength = payload.length;
                this._metadata = metadata;
                this._metadataLength = metadata.length;
                this._owner = owner;
            }
        
            set prevHash(prevHash) {
                this._prevHash = prevHash;
            }
        
            get hash() {
                return this._hash;
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
                // this is a stub, will need to verify using the following 
                // set: PK (owner), hash, signature
                
                return true;
            }
        
        },
    EntryType: {
        info: 0,
        service: 1,
    },
};


