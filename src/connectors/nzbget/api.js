(function () {

    'use strict'

    const nzbget = require('nzbget-api')
    const wrap = require('../../utilities/wrap')

    const apimap = (api) => {
        const request = (method, ...args) => {
            return wrap(api, method, ...args)
        }

        return {
            call: (method, ...args) => {
                return request(method, ...args)
            },
            config: () => {
                return request('config')
            },
            groups: () => {
                return request('listGroups')
            },
            history: (hidden) => {
                return request('history', hidden || false)
            },
            version: () => {
                return request('version')
            }
        }
    }

    module.exports = {
        connect: (config) => {
            const options = {
                hash: config.server.password,
                host: config.server.hostname,
                login: config.server.username,
                path: config.server.urlbase,
                port: config.server.port
            }

            return apimap(new nzbget(options))
        }
    }

})()