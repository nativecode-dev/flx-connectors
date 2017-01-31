'use strict';

(function () {

    'use strict';

    var promise = require('promise');

    module.exports = function (api, method) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
        }

        return new promise(function (resolve, reject) {
            api[method].apply(api, args.concat([function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            }]));
        });
    };
})();