const bookController = function (Book) {
    const post = function (req, res) {
        const book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title required');
        } else {
            //console.log(book);
            //res.send(book);
            book.save();
            res.status(201);
            res.send(book);
        }
    };
    const get = function (req, res) {
        let query = {};

        if (req.query.genre || req.query.author) {
            query = req.query;
        }
        Book.find(query, function (err, books) {
            if (err) {
                //console.log('Error when getting books: '+err);
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    };
    return {
        post: post,
        get: get
    };
};

module.exports = bookController;