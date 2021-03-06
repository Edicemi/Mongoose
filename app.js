require('./models/db');
require('dotenv').config();
const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
logger = require('morgan');

const app = express();

const staffContollers = require('./controllers/staffControllers');
// middlewares
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/staff", staffContollers);

//routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Our Staff Database</h1> <h3>Click here to get access to the  <a href="staff/list">Database.</a></h3>')
});

app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + '/views/layouts'
}))

app.set('view engine', 'hbs');

app.listen(3333, () => console.log('server running at port 3333'));