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

// middlewares
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    return console.log('connected');
})

//routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Staff Database</h1> <h3>Click here to get access to the <br> <a href="/staff/list">Database.</a></br></h3>')
});

app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + '/views/layouts'
}))

app.set('view engine', 'hbs');

app.listen(3000, () => console.log('server running at port 3000'));