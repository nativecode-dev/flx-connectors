(function () {

    'use strict'

    const merge = require('merge')
    const unirest = require('unirest')

    const DEFAULTS = {
        host: 'localhost',
        password: null,
        ssl: false,
        urlbase: '/json'
    }

    const Deluge = function (options) {
        this.options = merge.recursive(true, DEFAULTS, options)

        this.call = (method, ...params) => {
            return this.callgroup(method, -999, ...params)
        }

        this.callgroup = (method, id, ...params) => {
            return {
                method: method,
                id: id || -999,
                params: params || []
            }
        }

        this.auth = {
            login: (password) => {
                return this.call('auth.login', password)
                    .then(response => console.log(response))
            }
        }

        return this
    }

    module.exports = {
        connect: (config) => {
            const options = {
                host: config.server.hostname,
                password: config.server.password,
                urlbase: config.server.urlbase
            }

            return new Deluge(options)
        }
    }

})()