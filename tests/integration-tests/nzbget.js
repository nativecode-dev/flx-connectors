const fs = require('fs')
const path = require('path')

const configfile = path.join(__dirname, '../..', 'conf/configurations.json')

fs.exists(configfile, exists => {
    if (!exists) return

    fs.readFile(configfile, (err, buffer) => {
        const configurations = JSON.parse(buffer)
        const expect = require('chai').expect
        const mocha = require('mocha')

        describe('when using nzbget', () => {
            describe('RPC calls', () => {
                const connectors = require('../../lib/index')
                const api = connectors.connect('nzbget', configurations.nzbget)

                it('should get configuration', done => {
                    api.config().catch(error => done(error)).done(config => {
                        expect(config).to.be.array
                        done()
                    })
                })

                it('should get groups', done => {
                    api.groups().catch(error => done(error)).done(groups => {
                        expect(groups).to.be.array
                        done()
                    })
                })

                it('should get version information', done => {
                    api.version().catch(error => done(error)).done(version => {
                        expect(version).to.be.string
                        done()
                    })
                })
            })
        })
    })
})