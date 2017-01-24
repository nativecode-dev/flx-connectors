(function () {

    'use strict'

    module.exports = app => {
        return (request, response) => {
            response.writeHeader(200)
            response.end()
        }
    }

})()