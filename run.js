const app = require("./app/main");
require("./app/blueprints/users/route");
require("./app/core/middleware");
require('./app/core/logger');

app.createApp(3000, '0.0.0.0');


