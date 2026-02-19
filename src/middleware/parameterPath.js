
module.exports = async (req, res) => {
    const [path, param] = req.url.split('/').filter(Boolean); 
    req.paramPath = param;
    const a = `/${path}`;
    if (!param) {
        return;
    }

    if (!Number(param)) {
        req.url = a + `/${param}`;
        return;
    }

    if (a === '/users') {
        req.url = '/users/';
        req.paramPath = param;
        return;
    }
    if (a === '/books') {
        req.url = '/books/';
        req.paramPath = param;
    }
    
};

