(function () {

    'use strict'

    const sonarr = require('sonarr-api')

    const apimap = (api) => {
        return {
            call: (method, ...args) => {
                return api[method](...args)
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