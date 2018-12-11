const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
const Book = require('./models/bookModel');
const port = process.env.PORT || 3000;

let db;

if (process.env.ENV==='Test') {
    db = mongoose.connect('mongodb://localhost/bookapi_test',{useNewUrlParser: true});
}
else {
   db = mongoose.connect('mongodb://localhost/bookapi', {useNewUrlParser: true});
}

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/', bookRouter);

app.get("/", function(req,res) {
   res.send("This app is being restarted by gulp nodemon" +
       "!!!")
});

app.listen(port, function() {
   console.log("Running on port: " + port) ;
});

module.exports = app;