const express = require('express');
const app = express();
const http = require('http').createServer(app);
const Competition = require('./competition');
const setupListeners = require('./setupListeners');

const competition = new Competition();
setupListeners(app, competition);

http.listen(process.env.PORT || 8000);
app.use('/', express.static('client'));
