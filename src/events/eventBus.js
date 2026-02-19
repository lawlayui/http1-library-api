const EventEmmiter = require('events');

class eventBus extends EventEmmiter {}


module.exports = new eventBus();

require('./bookListiner');