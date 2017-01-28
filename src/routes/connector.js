(function () {

    'use strict'

    module.exports = app => {
        return (request, rest) => {
            const connector = request.params.connector
            const method = request.params.method
            const property = request.params.property

            app.connectors[connector].connect().client[method]()
                .catch(error => console.error(error))
                .done(response => {
                    if (property) {
                        rest.ok(response[property])
                    } else {
                        rest.ok(response)
                    }
                })
        }
    }

})()