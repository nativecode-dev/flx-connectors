(function () {

    'use strict'

    const datetime = require('date-and-time')
    const sonarr = require('sonarr-api')

    /**
     * Returns a date/time when provided either a date or a string
     * representing a date. String dates can be either "tomorrow" or
     * "yesterday".
     * 
     * @param {any} date
     * @returns
     */
    const datestring = (date) => {
        const now = new Date()
        const notime = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        switch (date) {
            case 'tomorrow':
                return datetime.addDays(notime, 1)

            case 'yesterday':
                return datetime.addDays(notime, -1)

            default:
                return notime
        }
    }

    /**
     * Maps the Sonarr API object to methods that return promises.
     * 
     * @param {any} api
     * @returns
     */
    const apimap = (api) => {
        return {
            call: (method, ...args) => {
                return api[method](...args)
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
            calendar: (start, end) => {
                return api.get('calendar', {
                    end: end ? datestring(end).toISOString() : null,
                    start: start ? datestring(start).toISOString() : null
                })
            },
            /**
             * Gets the available diskspace remaining that Sonarr can use.
             * 
             * @returns
             */
            diskspace: () => {
                return api.get('diskspace')
            },
            /**
             * Returns the set of profiles Sonarr uses to determine episodes
             * qualities to download.
             * 
             * @returns
             */
            profiles: () => {
                return api.get('profile')
            },
            /**
             * Returns an array of folders used by Sonarr.
             * 
             * @returns
             */
            rootfolders: () => {
                return api.get('rootfolder')
            },
            /**
             * Returns either a specific show when passed an ID or an array
             * of shows when using the lookup. When no ID is passed, returns
             * an array of existing shows.
             * 
             * @param {any} id
             * @returns
             */
            series: (id) => {
                if (Number.isInteger(id)) {
                    return api.get('series/' + id)
                } else if (id) {
                    return api.get('series/lookup', {
                        term: id
                    })
                }
                return api.get('series')
            },
            /**
             * Returns system information about the Sonarr installation.
             * 
             * @returns
             */
            system: () => {
                return api.get('system/status')
            }
        }
    }

    module.exports = (config) => {
        const options = {
            apiKey: config.server.apikey,
            hostname: config.server.hostname,
            port: config.server.port,
            urlBase: config.server.urlbase
        }

        return apimap(new sonarr(options))
    }

})()