const express = require('express');
const logger = require('morgan');

const app = express();

app.set('view engine','ejs');

app.use(express.static('public'));


