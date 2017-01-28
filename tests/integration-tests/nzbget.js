const env = require('process').env

if (env.INTEGRATIONS) {

    const expect = require('chai').expect
    const fs = require('fs')
    const mocha = require('mocha')
    const path = require('path')

    const configurations = JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'conf/configurations.json')))

    describe('when using nzbget', () => {
        describe('RPC calls', () => {
            const connectors = require('../../lib/index')
            const api = connectors().nzbget.connect(configurations.nzbget)

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

}