'use strict';

(function () {

    'use strict';

    var navigate = function navigate(value, path) {
        var parts = path.split(':');
        var properties = parts[0].split('.');
        for (var index = 0; index < properties.length; index++) {
            var property = properties[index];
            value = value[property];
        }

        if (parts.length === 2) {
            var type = parts[1];
            switch (type) {
                case 'date':
                    return new Date(value);
                default:
                    return value;
            }
        }

        return value;
    };

    var getvalue = function getvalue(value, path) {
        if (path) {
            return navigate(value, path);
        }
        return value;
    };

    module.exports = function (array, path) {
        return array.sort(function (left, right) {
            var a = getvalue(left, path);
            var b = getvalue(right, path);

            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            }

            return 0;
        });
    };
})();