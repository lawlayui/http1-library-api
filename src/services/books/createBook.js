const { getConnection } = require('../../core/getConnection');
const fs = require('fs');
const path = require('path');
const { generate_uuid } = require('../../core/security');


const UPLOAD_DIR = path.join(__dirname, '..', '..', 'files');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);


module.exports = async (filePath, filename, author, description, release_date, created_by) => {
    const connection = await getConnection();
    const newFilename = await generate_uuid() + path.extname(filename);
    const newPath = path.join(UPLOAD_DIR, newFilename);
    await fs.rename(filePath, newPath, () => {});
    try {
        const result = connection.query('insert into books(title, author, description, release_date, created_by, path) values(?, ?, ?, ?, ?, ?)', [filename, author, description, release_date, created_by, newPath]);
        return result;
    }catch(err) {
        throw err;
    };
};