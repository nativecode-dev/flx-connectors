(function () {

    'use strict'

    const fs = require('fs')
    const merge = require('merge')
    const path = require('path')

    const PATH_CONNECTORS = path.join(__dirname, 'connectors')

    module.exports = {
        api: (name, config) => {
            const filename = path.join(PATH_CONNECTORS, name, 'api.js')
            return require(filename).connect(config)
        },
        list: () => {
            return fs.readdirSync(PATH_CONNECTORS)
        },
        load: (name) => {
            const filename = path.join(PATH_CONNECTORS, name, 'default.json')
            return JSON.parse(fs.readFileSync(filename))
        }
    }

})()