(function () {

    'use strict'

    const navigate = (value, path) => {
        const parts = path.split(':')
        const properties = parts[0].split('.')
        for (let index = 0; index < properties.length; index++) {
            const property = properties[index]
            value = value[property]
        }

        if (parts.length === 2) {
            const type = parts[1]
            switch (type) {
                case 'date':
                    return new Date(value)
                default:
                    return value
            }
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