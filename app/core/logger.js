const app = require('../main');
const now = new Date();


app.addLogger(async (req, res) => {
    const data = `
    \nIP: ${req.socket.remoteAddress},
    \nURL: ${req.url},
    \nMethod: ${req.method},
    \nStatus code: ${res.statusCode},
    \nDate: ${now.toUTCString()}
    `
    console.log(data);
});