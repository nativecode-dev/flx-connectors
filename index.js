(function () {

    'use strict'

    const config = require('./utilities/config')
    const path = require('path')
    const process = require('process')
    const sortcompare = require('./utilities/sortcompare')
    const util = require('util')

    const servers = {}
    config.list().forEach(connector => {
        const settings = config.load(connector)
        servers[connector] = {
            api: config.api(connector, settings)
        }
    })

    servers['sonarr'].api.call('get', 'series')
        .catch(error => console.error(error))
        .done(series => sortcompare(series, 'title').forEach(info => {
            console.log(util.format('%s (%s) [seasons: %s]', info.title, info.year, info.seasons.length))
        }))

})()