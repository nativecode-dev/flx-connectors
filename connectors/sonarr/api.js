(function () {

    'use strict'

    const datetime = require('date-and-time')
    const sonarr = require('sonarr-api')

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

    const apimap = (api) => {
        return {
            call: (method, ...args) => {
                return api[method](...args)
            },
            calendar: (start, end) => {
                return api.get('calendar', {
                    end: end ? datestring(end).toISOString() : null,
                    start: start ? datestring(start).toISOString() : null
                })
            },
            diskspace: () => {
                return api.get('diskspace')
            },
            profiles: () => {
                return api.get('profile')
            },
            rootfolders: () => {
                return api.get('rootfolder')
            },
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
            system: () => {
                return api.get('system/status')
            }
        }
    }

    module.exports = {
        connect: (config) => {
            const options = {
                apiKey: config.server.apikey,
                hostname: config.server.hostname,
                port: config.server.port,
                urlBase: config.server.urlbase
            }

            return apimap(new sonarr(options))
        }
    }

})()