(function () {

    'use strict'

    const config = require('./utilities/server-config')
    const merge = require('merge')
    const process = require('process')

    let connectors = {}
    config.list().forEach(connector => {
        const settings = config.load(connector)
        connectors[connector] = {
            config: settings,
            connect: overrides => {
                const options = merge.recursive(true, settings, overrides)
                return config.api(connector, options)
            }
        }
    })

    module.exports = connectors

})()