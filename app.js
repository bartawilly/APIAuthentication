const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');


mongoose.connect('mongodb://localhost/APIAuthentication');


const app =  express();

//set up template engine

app.set('view engine', 'ejs');

//static files

app.use(express.static('./assets'));

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({resave: false, saveUninitialized: true, secret: 'secretsession' }));
app.use(flash());


//Routes
app.use('/users/',require('./routes/users'));
app.use('/groups/',require('./routes/groups'));
app.use('/panel/',require('./routes/panel'));
app.use('/providers/',require('./routes/providers'));
app.use('/categories/',require('./routes/categories'));
app.use('/customers/',require('./routes/customers'));
app.use('/expenses/',require('./routes/expenses'));
app.use('/vouchers/',require('./routes/vouchers'));
app.use('/items/',require('./routes/items'));
app.use('/payments/',require('./routes/payments'));
app.use('/bills/',require('./routes/bills'));
app.use('/reports/',require('./routes/reports'));



//Start the server

const port = process.env.PORT || 3000;

app.listen(port);

console.log(`server is listening at port ${port}`);