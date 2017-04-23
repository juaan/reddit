'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const path = require('path');

const hbs = require('express-handlebars').create({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, '/views'),
    defaultLayout: 'index'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', require('./controller/list'));

let port = 3000;

app.listen(port, () => {
    winston.log('info', 'Listening on port ' + port);
});

module.exports = app;
