module.exports = {
    Entry: class Entry {

            constructor(type, metadata, payload, signature) {
                this._type = type;
                this._prevHash = "";
                this._hash = "";
                this._timestamp = "";
                this._signature = signature;
                this._payload = payload;
                this._payloadLength = payload.length;
                this._metadata = metadata;
                this._metadataLength = metadata.length;
            }
        
            set prevHash(prevHash) {
                this._prevHash = prevHash;
            }
        
            get hash() {
                return new String(this._hash);
            }

            get type() {
                return this._type;
            }
        
            get signature() {
                return new String(this._signature);
            }
        
            get timestamp() {
                return new Number(this._timestamp);
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
                };
            }
        
        },
    EntryType: {
        info: 0,
        service: 1,
    },
}


