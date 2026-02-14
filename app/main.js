const http = require("http");


class App {
	constructor(){
		this.routes = {}
		this.server = http.Server();
		this.middlewares = [];
		this.cleanUps = [];
		this.queryString = null;
		this.claims = null;
		this.loggers = [];
		this.routeKey = null;
	}
	
	addRoute(method, path, handler) {
		this.routes[`${method} ${path}`] = handler;
	}

	addMiddleware(func) {
		this.middlewares.push(func);
	}

	addLogger(func) {
		this.loggers.push(func);
	}

	logger(req, res) {
		for (const log of this.loggers) {
			log(req, res)
		}
	}

	middleware(req, res) {
		for (const func of this.middlewares) {
			func(req, res);
			if (res.writableEnded || res.finished) break;
		}
	}

	route (req, res) {
		const handler = this.routes[this.routeKey];
		return handler
	}
	
	async createApp(port, host) {
	    this.server.on('request',async (req, res) => {
	    	this.middleware(req, res);
			if (res.writableEnded || res.finished) {
				this.logger(req, res);
				return;
			};
			const handler = this.route(req, res);
			if (handler) {
				handler(req, res)
				res.on('finish', () => {
					this.logger(req, res);
				})
			} else {
				res.writeHead(404, {'content-type': 'text/plain'});
				res.end('resource not found');
				if (res.writableEnded || res.finished) {
					this.logger(req, res);
				}
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
