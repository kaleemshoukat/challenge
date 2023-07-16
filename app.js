const express = require('express');
const morgan= require('morgan');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const app = express();

app.use(express.static(__dirname + './public'));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

/*Security Headers*/
app.use(helmet())
/*Resource Sharing*/
app.use(cors())
/*JSON Input Handling*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import the routes
app.use('/api', require('./app/routes'));

module.exports = app