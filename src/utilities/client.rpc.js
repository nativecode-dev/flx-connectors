(function () {

    'use strict'

    const client = require('./client')

    module.exports = options => {
        const http = client(options)
    }

})()