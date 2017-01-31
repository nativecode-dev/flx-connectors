'use strict';

(function () {

    'use strict';

    var nzbget = require('nzbget-api');
    var wrap = require('../../utilities/wrap');

    var apimap = function apimap(api) {
        var request = function request(method) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return wrap.apply(undefined, [api, method].concat(args));
        };

        return {
            call: function call(method) {
                for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    args[_key2 - 1] = arguments[_key2];
                }

                return request.apply(undefined, [method].concat(args));
            },
            config: function config() {
                return request('config');
            },
            groups: function groups() {
                return request('listGroups');
            },
            history: function history(hidden) {
                return request('history', hidden || false);
            },
            version: function version() {
                return request('version');
            }
        };
    };

    module.exports = function (config) {
        var options = {
            hash: config.server.password,
            host: config.server.hostname,
            login: config.server.username,
            path: config.server.urlbase,
            port: config.server.port
        };

        return apimap(new nzbget(options));
    };
})();