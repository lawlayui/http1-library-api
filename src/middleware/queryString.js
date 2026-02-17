

module.exports = async (req, res) => {
    const reqUrl = req.url;
    const base = `http://${req.headers.host}`
    const parsedUrl = new URL(reqUrl, base);
    const query = Object.fromEntries(parsedUrl.searchParams.entries());
    req.url = parsedUrl.pathname
    req.query = query
    return;
}