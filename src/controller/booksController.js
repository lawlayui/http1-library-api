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
                req.release_date
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