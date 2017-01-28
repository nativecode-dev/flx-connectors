const expect = require('chai').expect
const mocha = require('mocha')

const connectors = require('../lib/index')

describe('when getting connections', () => {
    describe('the connectors', () => {
        const clients = connectors()
        it('should support couchpotato', () => {
            expect(clients).to.have.property('couchpotato')
        })

        it('should support deluge', () => {
            expect(clients).to.have.property('deluge')
        })

        it('should support nzbget', () => {
            expect(clients).to.have.property('nzbget')
        })

        it('should support sonarr', () => {
            expect(clients).to.have.property('sonarr')
        })
    })
})