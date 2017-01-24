(function () {

    'use strict'

    const config = require('./utilities/server-config')
    const express = require('express')
    const merge = require('merge')
    const process = require('process')

    const APP_PORT = parseInt(process.env.NASWEB_PORT || 80)

    const app = express()
    app.servers = {}

    app.listen(APP_PORT, () => {
        console.log('Listening on port ' + APP_PORT)
        config.list().forEach(connector => {
            const settings = config.load(connector)
            if (settings.enabled) {
                app.servers[connector] = {
                    connect: (overrides) => {
                        return config.api(connector, merge.recursive(true, settings, overrides))
                    },
                    config: settings
                }
            }
        })

        app.get('/', require('./routes/')(app))
        app.get('/favicon.ico', require('./routes/favicon')(app))
        app.get('/:user', require('./routes/user/')(app))
    })

})()