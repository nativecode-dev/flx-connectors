'use strict';

(function () {

    'use strict';

    var datetime = require('date-and-time');
    var sonarr = require('sonarr-api');

    /**
     * Returns a date/time when provided either a date or a string
     * representing a date. String dates can be either "tomorrow" or
     * "yesterday".
     * 
     * @param {any} date
     * @returns
     */
    var datestring = function datestring(date) {
        var now = new Date();
        var notime = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        switch (date) {
            case 'tomorrow':
                return datetime.addDays(notime, 1);

            case 'yesterday':
                return datetime.addDays(notime, -1);

            default:
                return notime;
        }
    };

    /**
     * Maps the Sonarr API object to methods that return promises.
     * 
     * @param {any} api
     * @returns
     */
    var apimap = function apimap(api) {
        return {
            call: function call(method) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                return api[method].apply(api, args);
            },
            /**
             * Returns an array of upcoming episodes based on the start
             * and end dates provided. If no dates are provided, the
             * calendar will return only those episodes airing today.
             * 
             * @param {any} start
             * @param {any} end
             * @returns
             */
            calendar: function calendar(start, end) {
                return api.get('calendar', {
                    end: end ? datestring(end).toISOString() : null,
                    start: start ? datestring(start).toISOString() : null
                });
            },
            /**
             * Gets the available diskspace remaining that Sonarr can use.
             * 
             * @returns
             */
            diskspace: function diskspace() {
                return api.get('diskspace');
            },
            /**
             * Returns the set of profiles Sonarr uses to determine episodes
             * qualities to download.
             * 
             * @returns
             */
            profiles: function profiles() {
                return api.get('profile');
            },
            /**
             * Returns an array of folders used by Sonarr.
             * 
             * @returns
             */
            rootfolders: function rootfolders() {
                return api.get('rootfolder');
            },
            /**
             * Returns either a specific show when passed an ID or an array
             * of shows when using the lookup. When no ID is passed, returns
             * an array of existing shows.
             * 
             * @param {any} id
             * @returns
             */
            series: function series(id) {
                if (Number.isInteger(id)) {
                    return api.get('series/' + id);
                } else if (id) {
                    return api.get('series/lookup', {
                        term: id
                    });
                }
                return api.get('series');
            },
            /**
             * Returns system information about the Sonarr installation.
             * 
             * @returns
             */
            system: function system() {
                return api.get('system/status');
            }
        };
    };

    module.exports = function (config) {
        var options = {
            apiKey: config.server.apikey,
            hostname: config.server.hostname,
            port: config.server.port,
            urlBase: config.server.urlbase
        };

        return apimap(new sonarr(options));
    };
})();