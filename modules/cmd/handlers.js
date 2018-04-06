const generator = require('../core/generator');

module.exports = {

    get bootstrap() {
        return function() {
            generator.generateServerKeys();
        }
    },

    get generate() {
        return function() {
            generator.generateClientKeys();
        }
    },

    get server() {
        return function(command) {

        }
    },

    get connect() {
        return function (endpoint) {

        }
    }

}