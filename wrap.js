(function () {

    'use strict'

    const promise = require('promise')

    module.exports = (api, method, ...args) => {
        return new promise((resolve, reject) => {
            api[method](...args, (error, response) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(response)
                }
            })
        })
    }

})()