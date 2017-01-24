(function () {

    'use strict'

    module.exports = app => {
        return (request, response) => {
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(app.servers))
        }
    }

})()