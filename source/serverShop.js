const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const http = require('http')
const app = express();
const path = require('path');
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)


app.use(express.static(path.join(__dirname, 'public')));

dotenv.config()

const port = process.env.PORT_SHOP || 20619;
app.use(cookieParser())

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


app.engine('hbs', handlebars.engine({extname: '.hbs', helpers: {
    isActive: (catId, id) => {
        return parseInt(catId) === parseInt(id)
    }
}}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const sideRouter = require('./routes/site')
const proRouter = require('./routes/product')
app.use('/', sideRouter)
app.use('/products', proRouter)

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('on-chat', data => {
        io.emit('user-chat', data)
    })

    socket.on('submitImg', (src) => {
        console.log('Client sent image')
        io.emit('sentImg', src) //the server send the image src to all clients
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
