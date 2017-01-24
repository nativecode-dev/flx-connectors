(function () {

    'use strict'

    const sonarr = require('sonarr-api')

    const apimap = (api) => {
        return {
            call: (method, ...args) => {
                return api[method](...args)
            },
            calendar: (startdate) => {
                return api.get('calendar', {
                    start: (startdate ? startdate : new Date()).toISOString()
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
            }
        }
    }

    module.exports = {
        api: (config) => {
            const options = {
                hostname: config.server.hostname,
                port: config.server.port,
                apiKey: config.server.apikey,
                urlbase: config.server.urlbase
            }

            return apimap(new sonarr(options))
        }
    }

})()