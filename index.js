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
            api: config.api(connector, settings),
            config: settings
        }
    })

    const print_calendar = (series) => {
        return util.format('%s - %s (%s)', series.series.title, series.title, series.airDate)
    }

    const print_disk = (disk) => {
        return util.format('%s (%s)', disk.label, disk.path)
    }

    const print_series = (series) => {
        return util.format('%s (%s), %s Seasons, [%s]', series.title, series.year, series.seasons ? series.seasons.length : 0, series.id)
    }

    const sonarr = servers['sonarr'].api

    sonarr.calendar()
        .catch(error => console.error(error))
        .done(series => sortcompare(series, 'series.airDate:date').forEach(info => {
            if (info.hasFile === false) {
                console.log('[calendar]', print_calendar(info))
            }
        }))

    sonarr.diskspace()
        .catch(error => console.error(error))
        .done(disks => sortcompare(disks, 'label').forEach(disk => {
            console.log('[disk]', print_disk(disk))
        }))

    sonarr.profiles()
        .catch(error => console.error(error))
        .done(profiles => sortcompare(profiles, 'name').forEach(profile => {
            console.log('[profile]', profile.name)
        }))

    sonarr.rootfolders()
        .catch(error => console.error(error))
        .done(folders => sortcompare(folders, 'path').forEach(folder => {
            console.log('[folder]', folder.path)
        }))

    sonarr.series()
        .catch(error => console.error(error))
        .done(series => console.log('[series]', print_series(sortcompare(series, 'title')[0])))

    sonarr.series(185)
        .catch(error => console.error(error))
        .done(series => console.log('[findid]', print_series(series)))

    sonarr.series('Under the Dome')
        .catch(error => console.error(error))
        .done(series => {
            sortcompare(series, 'title').forEach(info => {
                console.log('[lookup]', print_series(info))
            })
        })

})()