const fs = require('fs')
const path = require('path')

const configfile = path.join(__dirname, '../..', 'conf/configurations.json')

fs.exists(configfile, exists => {
    if (!exists) return

    fs.readFile(configfile, (err, buffer) => {
        const configurations = JSON.parse(buffer)
        const expect = require('chai').expect
        const mocha = require('mocha')

        describe('when using sonarr', () => {
            describe('RPC calls', () => {
                const connectors = require('../../lib/index')
                const api = connectors.connect('sonarr', configurations.sonarr)

                it('should get all series', done => {
                    api.series().catch(error => done(error)).done(series => {
                        expect(series).to.be.a('array')
                        done()
                    })
                })

                it('should get diskspace', done => {
                    api.diskspace().catch(error => done(error)).done(diskspace => {
                        expect(diskspace).to.be.a('array')
                        done()
                    })
                })

                it('should get profiles', done => {
                    api.profiles().catch(error => done(error)).done(profiles => {
                        expect(profiles).to.be.a('array')
                        done()
                    })
                })

                it('should get root folders', done => {
                    api.rootfolders().catch(error => done(error)).done(rootfolders => {
                        expect(rootfolders).to.be.a('array')
                        done()
                    })
                })

                it('should get system information', done => {
                    api.system().catch(error => done(error)).done(system => {
                        expect(system.version).to.be.a('string')
                        done()
                    })
                })
            })
        })
    })
})