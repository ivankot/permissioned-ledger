const crypto = require('crypto');

module.exports = {
    
    hash: function() {
        
        let hash = crypto.createHash('sha256')
        
        Array.from(arguments).forEach((arg) => {
            hash.update(arg.toString());
            
        });
        
        return hash.digest('hex');
    },
    
};


