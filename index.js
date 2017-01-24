(function () {

    'use strict'

    const config = require('./utilities/config')
    const merge = require('merge')

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

    const kristen = require('./conf/kristen')

    servers.couchpotato.connect(kristen.couchpotato).app.version()
        .catch(error => console.error(error))
        .done(response => console.log('couchpotato', response.version))

    servers.nzbget.connect(kristen.nzbget).version()
        .catch(error => console.error(error))
        .done(response => console.log('nzbget', response))

    servers.sonarr.connect(kristen.sonarr).system()
        .catch(error => console.error(error))
        .done(response => console.log('sonarr', response.version))

})()