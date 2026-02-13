const http = require("http");


class App {
	constructor(){
		this.routes = {}
		this.server = http.Server();
		this.middlewares = [];
		this.cleanUps = [];
		this.queryString = null;
	}

	addRoute(method, path, handler) {
		this.routes[`${method} ${path}`] = handler;
	}

	addMiddleware(func) {
		this.middlewares.push(func);
	}

	middleware(req, res) {
		this.middlewares.forEach((func) => {
			func(req, res);
		});
	}

	route (req, res) {
		const routeKey = `${req.method} ${req.url}`;
		const handler = this.routes[routeKey];
		return handler
	}
	
	async createApp(port, host) {
	    this.server.on('request',async (req, res) => {
	    	this.middleware(req, res);
	        const handler = this.route(req, res)
			if (handler) {
				handler(req, res)
			}else {
				res.writeHead(404, {'content-type': 'text/plain'});
				res.end('resource not found');
			}
	    });
	    this.server.listen(port,host,() => {
	        console.log("Server listen");
	    	console.log("Port: ", port);
	    	console.log("Host: ", host);
	    });
	}
}


const app = new App();


module.exports = app;
