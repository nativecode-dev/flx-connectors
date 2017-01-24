(function () {

    'use strict'

    const navigate = (value, path) => {
        const parts = path.split('.')
        for (let index = 0; index < parts.length; index++) {
            const name = parts[index]
            value = value[name]
        }
        return value
    }

    const getvalue = (value, path) => {
        if (path) {
            return navigate(value, path)
        }
        return value
    }

    module.exports = (array, path) => {
        return array.sort((left, right) => {
            const a = getvalue(left, path)
            const b = getvalue(right, path)

            if (a < b) {
                return -1
            } else if (a > b) {
                return 1
            }

            return 0
        })
    }

})()