(function () {

    'use strict'

    const loader = require('./loader')
    const merge = require('merge')

    module.exports = () => {
        let api = {}

        loader.list().forEach(connector => {
            const options = loader.load(connector)
            api[connector] = {
                connect: overrides => {
                    const settings = merge.recursive(true, options, overrides)
                    return loader.api(connector, settings)
                },
                options: options
            }
        })

        return api
    }

})()