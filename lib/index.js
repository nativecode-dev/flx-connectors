'use strict';

(function () {

    'use strict';

    var fs = require('fs');
    var merge = require('merge');
    var path = require('path');

    var PATH_CONNECTORS = path.join(__dirname, 'connectors');

    var api = function api(name, config) {
        var filename = path.join(PATH_CONNECTORS, name, 'api.js');
        var connector = require(filename);
        return connector(config);
    };

    module.exports = {
        connect: function connect(name, options) {
            var filename = path.join(PATH_CONNECTORS, name, 'default.json');
            var defaults = JSON.parse(fs.readFileSync(filename));
            return api(name, merge.recursive(true, defaults, options || {}));
        },
        list: function list() {
            return fs.readdirSync(PATH_CONNECTORS);
        }
    };
})();