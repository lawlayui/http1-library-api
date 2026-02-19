

module.exports = async (req, res) => {
    const needMultipartHeader = ['POST /books', 'PATCH /books/'];
    if (needMultipartHeader.includes(`${req.method} ${req.url}`)) {
        const headers = req.headers;
        const header = 'multipart/form-data';
        const filename = 'x-filename';
        const description = 'x-description';
        const author = 'x-author';
        const release_date = 'x-release_date';
        if (!headers[filename] || !headers[description] || !headers[author] || !headers[release_date]) {
            res.writeHead(422, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ status: 'error', message: 'missing costume header' }));
            return;
        }
        if (!headers['content-type'] === header) {
            res.writeHead(415, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ status: 'error', message: 'content-type must be multipart/form-data for upload book' }));
            return;
        };
        req.filename = headers[filename];
        req.description = headers[description];
        req.author = headers[author];
        req.release_date = headers[release_date];
        return;
    };
};
