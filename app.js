var consolidate = require('consolidate');
var debug = require('debug')('vote_for_nunjucks:server');
var express = require('express');
var http = require('http');

var index = require('./routes/index');
var cohab = require('./routes/cohabitation');
var statements_else = require('./routes/statements/else');
var statements_elif = require('./routes/statements/elif');

var app = express();
app.set('name', 'Vote for Nunjucks');
app.set('port', process.env.VOTE_NUN_PORT || 3000);

app.engine('hbs', consolidate.handlebars);
app.engine('html', consolidate.nunjucks);
app.engine('nunjucks', consolidate.nunjucks);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/', index);
app.get('/cohabitation', cohab);
app.get('/statements/elif', statements_elif);
app.get('/statements/elif/:engine', statements_elif);
app.get('/statements/else', statements_else);
app.get('/statements/else/:engine', statements_else);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = http.createServer(app).listen(app.get('port'));
server.on('error', onError);
server.on('listening', onListening);

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
