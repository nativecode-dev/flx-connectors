(function () {

    'use strict'

    const fs = require('fs')
    const merge = require('merge')
    const path = require('path')

    const PATH_CONFIGS = path.join(__dirname, '..', 'conf')
    const PATH_CONNECTORS = path.join(__dirname, '..', 'connectors')

    module.exports = {
        api: (name, config) => {
            const filename = path.join(PATH_CONNECTORS, name, 'api.js')
            return require(filename).api(config)
        },
        list: () => {
            return fs.readdirSync(PATH_CONNECTORS)
        },
        load: (confname) => {
            const confuser = path.join(PATH_CONFIGS, confname + '.json')
            const confdefault = path.join(PATH_CONNECTORS, confname, 'default.json')

            const conf = JSON.parse(fs.readFileSync(confdefault))

            if (fs.existsSync(confuser)) {
                const user = JSON.parse(fs.readFileSync(confuser))
                return merge.recursive(true, conf, user)
            }

            return conf
        }
    }

})()