(function () {

    'use strict'

    const merge = require('merge')
    const unirest = require('unirest')
    const url = require('url')
    const util = require('util')

    const DEFAULTS = {
        auth: false,
        host: 'localhost',
        params: undefined,
        password: undefined,
        port: undefined,
        ssl: false,
        urlbase: undefined,
        username: undefined
    }

    module.exports = function (options) {
        const settings = merge.recursive(true, DEFAULTS, options)
        let cookies = unirest.jar()

        const uri = url.format({
            auth: settings.auth ? util.format('%s:%s', settings.username, settings.password) : undefined,
            hostname: settings.host,
            pathname: settings.urlbase,
            port: settings.port,
            protocol: settings.ssl ? 'https:' : 'http:',
            query: settings.params
        })

        this.call = (method, contents, headers) => {
            let request = unirest[method](uri).jar(cookies)

            if (contents) {
                request.send(contents)
            }

            if (headers) {
                request.headers(headers)
            }

            return request
        }

        this.delete = (contents, headers) => {
            return this.call('delete', contents, headers)
        }

        this.get = (contents, headers) => {
            return this.call('get', contents, headers)
        }

        this.post = (contents, headers) => {
            return this.call('post', contents, headers)
        }

        this.put = (contents, headers) => {
            return this.call('put', contents, headers)
        }

        this.update = (contents, headers) => {
            return this.call('update', contents, headers)
        }

        return this
    }

})()