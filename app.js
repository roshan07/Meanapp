const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/database');

//connect to database
mongoose.connect(config.database, {useMongoClient: true});

//on connection
mongoose.connection.on('connected', () => {
   console.log('Connected to the database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

//port number
const port = 3000;

//logger middleware
app.use(morgan('dev'));

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//bodyParser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Routes!
app.get('/', (req, res) => {
    res.send('Invalid Endpoint!');
});

//configuring port for server!
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});