const express = require('express');

const routes = function (Book) {
    const router = express.Router();
    const bookController = require('../Controllers/bookController')(Book);
    router.route('/books')
        .post(bookController.post)
        .get(bookController.get);

    router.use('/books/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                //console.log('Error when getting books: '+err);
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('No book found!');
            }
        });
    });
    router.route('/books/:bookId')
        .get(function (req, res) {
            res.json(req.book);
        })
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save();
            res.json(req.book);
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }
            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Book successfully removed.');
                }
            });
        });
    return router;
};

module.exports = routes;