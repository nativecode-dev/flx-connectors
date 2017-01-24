(function () {

    'use strict'

    const config = require('./config')
    const path = require('path')
    const process = require('process')

    const servers = {}
    config.list().forEach(connector => {
        const settings = config.load(connector)
        servers[connector] = {
            api: config.api(connector, settings)
        }
    })

    servers['nzbget'].api.call('config')
        .catch(error => console.error(error))
        .done(response => console.log(response))

    servers['nzbget'].api.version()
        .catch(error => console.error(error))
        .done(response => console.log(response))

    servers['nzbget'].api.groups()
        .catch((error) => console.error(error))
        .done((groups) => {
            groups.forEach((group) => {
                console.log({
                    id: group.NZBID,
                    category: group.Category,
                    filename: group.NZBFilename,
                    filepath: group.DestDir
                })
            })
        })

})()