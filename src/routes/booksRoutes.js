const booksController = require('../controller/booksController');

module.exports = {
    'GET /books/': booksController.getBookById,
    'POST /books': booksController.createBook
}