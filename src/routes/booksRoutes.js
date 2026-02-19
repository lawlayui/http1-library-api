const booksController = require('../controller/booksController');

module.exports = {
    'GET /books': booksController.getBooks,
    'GET /books/': booksController.getBookById,
    'POST /books': booksController.createBook,
    'PATCH /books/': booksController.updateBook,
    'DELETE /books/': booksController.deleteBook
}