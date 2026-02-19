const booksService = require('../services/books/booksService');
const fs = require('fs');
const path = require('path');


const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

module.exports.createBook = async (req, res) => {
    const pathFile = path.join(TEMP_DIR, req.filename);
    const fileStream = fs.createWriteStream(pathFile);
    req.pipe(fileStream);
    req.on('data', chunk => {});
    req.on('end', async () => {
        const result = await booksService.createBook(pathFile, req.filename, req.author, req.description, req.release_date)[0];
        console.log(result);
        res.writeHead(201, {'content-type': 'application/json'});
        res.end(JSON.stringify({status: 'succes', message: 'succes create book', book_id: result.insertId}));
        return;
    });
};