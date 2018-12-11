const should = require('should'),
    supertest = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = supertest.agent(app);

describe('Book CRUD Test', function() {
    it('Should allow book to be posted and read and id populated', function(done) {
        const bookPost = {title: 'new book', author: 'Peter', genre: 'Fiction'};
        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function() {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
            });
        done();
    });

    afterEach(function(done) {
        Book.remove().exec();
        done();
    });
})
