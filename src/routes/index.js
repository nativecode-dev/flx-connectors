(function () {

    'use strict'

    module.exports = app => {
        return (request, rest) => {
            rest.ok(app.connectors)
        }
    }

})()