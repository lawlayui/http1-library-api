const booksService = require('../services/books/booksService');
const fs = require('fs');
const path = require('path');


const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

module.exports.createBook = async (req, res) => {
    const filePath = path.join(TEMP_DIR, req.filename);
    const fileStream = fs.createWriteStream(filePath);

    req.pipe(fileStream);

    req.on('end', async () => {
        try {
            const result = await booksService.createBook(
                filePath,
                req.filename,
                req.author,
                req.description,
                req.release_date,
                req.claims.payload.user_id
            );

            res.writeHead(201, { 'content-type': 'application/json' });
            res.end(JSON.stringify({
                status: 'succes',
                message: 'succes create book',
                book_id: result[0].insertId
            }));
        } catch (err) {
            res.writeHead(500, { 'content-type': 'application/json' });
            res.end(JSON.stringify({
                status: 'error',
                message: 'Failed to create book'
            }));
        }
    });
};

module.exports.getBookById = async (req, res) => {
    const result = await booksService.getBookById(req.paramPath);
    if (!result) {
        res.writeHead(404, {'content-type': 'application/json'});
        res.end(JSON.stringify({status: 'error', message: 'resource not found'}));
        return;
    }
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({status: 'succes', data: result}));
    return;
};

module.exports.getBooks = async (req, res) => {
    const result = await booksService.getBooks();
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({status: 'succes', data: result}));
    return;
}

module.exports.updateBook = async (req, res) => {
    const result = await booksService.updateBook(
        req.filePath,
        req.filename,
        req.author,
        req.description,
        req.release_date,
        req.claims.payload.user_id,
        req.paramPath
    );
    if (result.affectedRows === 0) {
        res.writeHead(404, {'content-type': 'application/json'});
        res.end(JSON.stringify({status: 'error', message: 'resource not found'}));
        return;
    }
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({status: 'succes', message: 'succes update book'}));
    return;
};

module.exports.deleteBook = async (req, res) => {
    const result = await booksService.deleteBook(req.paramPath, req.claims.payload.user_id);
    if (result.affectedRows === 0) {
        res.writeHead(404, {'content-type': 'application/json'});
        res.end(JSON.stringify({status: 'error', message: 'resource not found'}));
        return;
    }
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({status: 'succes', message: 'succes delete book'}));
    return;
};