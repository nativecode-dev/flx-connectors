'use strict';

(function () {

    'use strict';

    var merge = require('merge');
    var unirest = require('unirest');
    var url = require('url');
    var util = require('util');

    var DEFAULTS = {
        auth: false,
        host: 'localhost',
        params: undefined,
        password: undefined,
        port: undefined,
        ssl: false,
        urlbase: undefined,
        username: undefined
    };

    module.exports = function Client(options) {
        var _this = this;

        var settings = merge.recursive(true, DEFAULTS, options);
        var cookies = unirest.jar();

        var uri = url.format({
            auth: settings.auth ? util.format('%s:%s', settings.username, settings.password) : undefined,
            hostname: settings.host,
            pathname: settings.urlbase,
            port: settings.port,
            protocol: settings.ssl ? 'https:' : 'http:',
            query: settings.params
        });

        this.call = function (method, contents, headers) {
            var request = unirest[method](uri).jar(cookies);

            if (contents) {
                request.send(contents);
            }

            if (headers) {
                request.headers(headers);
            }

            return request;
        };

        this.delete = function (contents, headers) {
            return _this.call('delete', contents, headers);
        };

        this.get = function (contents, headers) {
            return _this.call('get', contents, headers);
        };

        this.post = function (contents, headers) {
            return _this.call('post', contents, headers);
        };

        this.put = function (contents, headers) {
            return _this.call('put', contents, headers);
        };

        this.update = function (contents, headers) {
            return _this.call('update', contents, headers);
        };

        return this;
    };
})();