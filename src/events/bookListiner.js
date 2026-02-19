const evetBus = require('./eventBus');
const fs = require('fs');

evetBus.on('deleteBook', (path) => {
    console.log(`Book with path ${path} has been deleted`);
    fs.unlink(path, (err) => {
        if (err) {
            console.error(`Failed to delete file ${path}: ${err.message}`);
        } else {
            console.log(`Successfully deleted file ${path}`);
        }
    });
});