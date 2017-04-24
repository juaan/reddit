'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const path = require('path');
const morgan = require('morgan');

const hbs = require('express-handlebars').create({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, '/views/templates'),
    partialsDir: [path.join(__dirname, '/views/partials')],
    defaultLayout: 'index'
});
app.use(morgan('tiny'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views/templates'));

app.use('/css', express.static(path.join(__dirname, '/views/css')));
app.use('/js', express.static(path.join(__dirname, '/views/js')));


app.use(cors()); // allow cross origin request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.get('/', require('./controller/list'));
app.get('/api/submit/:topic', require('./api/submission'));
app.get('/api/vote/', require('./api/vote'));

let port = 3000;

app.listen(port, () => {
    winston.log('info', 'Listening on port ' + port);
});

module.exports = app;
