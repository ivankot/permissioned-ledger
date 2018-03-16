const ALG_HASH = 'sha256';
const ALG_SIG = 'secp521r1';
const ALG_ENC = 'aes192';

const crypto = require('crypto');

module.exports = {
    
    hash() {
        
        let hash = crypto.createHash(ALG_HASH)
        
        Array.from(arguments).forEach((arg) => {
            hash.update(arg.toString());
            
        });
        
        return hash.digest('hex');
    },

    generateKeys() {
        const ecdh = crypto.createECDH(ALG_SIG);
        const public = ecdh.generateKeys('hex', 'compressed');
        const private = ecdh.getPrivateKey('hex');

        return {
            get publicKey() {
                return public;
            },

            get privateKey() {
                return private;
            }
        }
    },

    sign(message, priavteKey) {
        const sign = crypto.createSign('ecdsa');
        sign.update(message);
        return sign.sign(privateKey, 'hex');
    },

    verify(signature, message, publicKey) {
        const verify = crypto.createVerify('ecdsa');
        verify.update(message);

        return verify.verify(publicKey, signature);
    }
    
};


