(function () {

    'use strict'

    const nzbget = require('nzbget-api')
    const wrap = require('../../wrap')

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
        api: (config) => {
            const options = {
                host: config.server.hostname,
                port: config.server.port,
                login: config.server.username,
                hash: config.server.password
            }

            return apimap(new nzbget(options))
        }
    }

})()