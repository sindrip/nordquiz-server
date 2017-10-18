require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const socketController = require('./socketController.js');

const port = process.env.PORT;

let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

socketController.connection(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(morgan('dev'));

// ADMIN ROUTES
const admin = require('./routes/admin');
app.use('/admin', admin);

// PUBLIC SERVE
app.use(express.static('public'));

http.listen(port, () => {
  console.log(`Started on port ${port}`);
})
