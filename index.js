(function () {

    'use strict'

    const config = require('./utilities/config')
    const path = require('path')
    const process = require('process')
    const sortcompare = require('./utilities/sortcompare')
    const util = require('util')

    const servers = {}
    config.list().forEach(connector => {
        let loaded = {}
        const settings = config.load(connector)
        if (settings.enabled) {
            servers[connector] = {
                api: () => {
                    if (loaded[connector] === undefined) {
                        loaded[connector] = config.api(connector, settings)
                    }
                    return loaded[connector]
                },
                config: settings
            }
        }
    })

})()