const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

dotenv.config()
const port = process.env.PORT_AUTH || 3113;
app.use(cookieParser())


app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const userRouter = require('./routes/user')
app.use('/', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});