(function () {

    'use strict'

    const loader = require('./utilities/loader')
    const merge = require('merge')

    module.exports = () => {
        let api = {}

        loader.list().forEach(connector => {
            const options = loader.load(connector)
            api[connector] = {
                connect: () => {
                    return loader.api(connector, options)
                },
                options: options
            }
        })

        return api
    }

})()