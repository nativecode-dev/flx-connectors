(function () {

    'use strict'

    const config = require('./utilities/config')
    const merge = require('merge')
    const path = require('path')
    const process = require('process')
    const sortcompare = require('./utilities/sortcompare')
    const util = require('util')

    const servers = {}
    config.list().forEach(connector => {
        const settings = config.load(connector)
        if (settings.enabled) {
            servers[connector] = {
                connect: (overrides) => {
                    return config.api(connector, merge.recursive(true, settings, overrides))
                },
                config: settings
            }
        }
    })

})()