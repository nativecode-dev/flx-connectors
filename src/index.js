(function () {

    'use strict'

    const fs = require('fs')
    const merge = require('merge')
    const path = require('path')

    const PATH_CONNECTORS = path.join(__dirname, 'connectors')

    const api = (name, config) => {
        const filename = path.join(PATH_CONNECTORS, name, 'api.js')
        const connector = require(filename)
        return connector(config)
    }

    module.exports = {
        connect: (name, options) => {
            const filename = path.join(PATH_CONNECTORS, name, 'default.json')
            const defaults = JSON.parse(fs.readFileSync(filename))
            return api(name, merge.recursive(true, defaults, options || {}))
        },
        list: () => {
            return fs.readdirSync(PATH_CONNECTORS)
        }
    }

})()