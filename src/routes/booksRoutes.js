const booksController = require('../controller/booksController');

module.exports = {
    'POST /books': booksController.createBook
}