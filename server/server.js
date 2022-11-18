require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const { logger, logEvents } = require('./Middleware/logger');
const errorHandler = require('./Middleware/errorHandler');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');

const PORT = 8080;

console.log(process.env.NODE_ENV)

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'Public')));
app.use('/', require('./Routes/root'));
app.use('/auth', require('./Routes/authRoutes'));
app.use('/users', require('./Routes/userRoute'));
app.use('/products', require('./Routes/productRoute'));

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'Views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: "404 Not Found " })
    }else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log ('connected to MongoDB')
    app.listen(PORT, () => console.log(`server active in the port ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})