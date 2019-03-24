const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
console.log(__dirname)

const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
// Setup handlebars engine and templates location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//_____________________Sockets IO________________________

io.on('connection', () => {
  console.log('New WebSocket conncection')
})

server.listen(port, () => {
  console.log('Server started correctly on port 3000')
})

module.exports = app;
