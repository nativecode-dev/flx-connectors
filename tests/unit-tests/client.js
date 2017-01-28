const expect = require('chai').expect
const merge = require('merge')
const mocha = require('mocha')

const client = require('../../lib/utilities/client')

describe('when using http client', () => {
    const options = {
        host: 'guessit.nativecode.com',
        ssl: true
    }

    const FILENAME = 'Cities.of.the.Underworld.S01E09.720p.HDTV.x264-REGRET'

    it('should execute GET request', done => {
        const http = new client(merge(true, options, {
            params: {
                filename: FILENAME
            }
        }))

        http.get().complete(response => {
            expect(response.body).has.property('type')
            done()
        })
    })

    it('should execute POST request', done => {
        const http = new client(options)
        const body = {
            filename: [FILENAME]
        }

        http.post(body).complete(response => {
            expect(response.body).is.array
            done()
        })
    })
})