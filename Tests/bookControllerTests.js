const should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests', function () {
    describe('Post', function () {
        it('Should not allow empty title', function() {
            const Book = function (book) {
                this.save = function () {
                }
            };
            const req = {
                body: {
                    author: 'John'
                }
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            const bookController = require('../Controllers/bookController')(Book);
            bookController.post(req, res);
            res.status.calledWith(400).should.equal(true, 'Bad status: '+res.status.args[0][0]);
            res.send.calledWith('Title required').should.equal(true);
        })
    })
})