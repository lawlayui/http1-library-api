
module.exports = async (req, res) => {
    const [path, param] = req.url.split('/').filter(Boolean);
    req.paramPath = param;
    if (param) req.url = `/${path}/`;
    return;
};
