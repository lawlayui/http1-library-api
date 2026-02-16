

module.exports = async (req, res) => {
    try {
        const reqUrl = req.url; // /path/?key=value&key2=value2
        const base = `http://${req.headers.host}`
        const parsedUrl = new URL(reqUrl, base); // parse url
        const query = Object.fromEntries(parsedUrl.searchParams.entries()); //Returns {key: value}
        req.url = parsedUrl.pathname // req url will be used to match route therefore it is separated from query to make it cleaner
        req.query = query //Save the query so that it can be accessed by the controller
    } catch (err) {
        console.log(err);
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            message: 'internal server error'
        }));
    }
}