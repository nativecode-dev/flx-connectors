(function () {

    'use strict'

    const Client = require('./client')

    module.exports = options => {
        const http = new Client(options)
    }

})()