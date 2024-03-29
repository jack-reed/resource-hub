const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')
const axios = require('axios')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const generateMessage = require('./src/utils/messages')
const app = express()
const server = http.createServer(app)
const apiUrl = require('./keys')

const io = socketio.listen(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/src/templates/views')
const partialsPath = path.join(__dirname, '/src/templates/partials')

// Setup directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(publicDirectoryPath, express.static(path.join(__dirname, '/node_modules/govuk-frontend/assets')))

// Setup handlebars engine and templates location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.registerHelper('json', function(context) {
    return context
});

//logger
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

/**
 * Open WebSocket Connection:
 *
 * On receiving message, try the POST method to the API
 *
 * @params botkey: to connect to the desired API bot
 *         message: to be sent to API
 *
 * @returns API response to be served back to the client side
 *          on failure, catches error in terminal window
 *
 *
 */
io.on('connection', (socket) => {
    console.log('New WebSocket connection')
//sockets
    socket.on('sendMessage', async function (message, callback) {
        io.emit('message', generateMessage("User", message))
        try {
            return await axios.post(`${apiUrl.pandoraBotsApi}`, null, {
                params: {
                    botkey: `${apiUrl.botkey}`,
                    input: message
                }
            })
                .then(function (response) {
                    const message = response.data.responses[0]
                    io.emit('response', generateMessage("HMRC Digital Resource Bot", message))
                    callback()
                })
        } catch (error) {
            console.error(error)
        }
    })
})

// set up routing
app.use('/', require('./src/pages/home/index'))
app.use('/chat', require('./src/pages/chat/index'))
app.use('/list', require('./src/pages/list/index'))
app.use('/book', require('./src/pages/book/index'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


server.listen(port, () => {
    console.log(`Server started correctly on port ${port}`)
})

module.exports = app;
