'use strict';

(function () {

    'use strict';

    var merge = require('merge');
    var unirest = require('unirest');

    var DEFAULTS = {
        host: 'localhost',
        password: null,
        ssl: false,
        urlbase: '/json'
    };

    var Deluge = function Deluge(options) {
        var _this = this;

        this.options = merge.recursive(true, DEFAULTS, options);

        this.call = function (method) {
            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            return _this.callgroup.apply(_this, [method, -999].concat(params));
        };

        this.callgroup = function (method, id) {
            for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                params[_key2 - 2] = arguments[_key2];
            }

            return {
                method: method,
                id: id || -999,
                params: params || []
            };
        };

        this.auth = {
            login: function login(password) {
                return _this.call('auth.login', password).then(function (response) {
                    return console.log(response);
                });
            }
        };

        return this;
    };

    module.exports = function (config) {
        var options = {
            host: config.server.hostname,
            password: config.server.password,
            urlbase: config.server.urlbase
        };

        return new Deluge(options);
    };
})();