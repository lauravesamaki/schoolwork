require('dotenv').config();
require('./mongodb');
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const coursesRouter = require('./routes/courses');
const assignmentsRouter = require('./routes/assignments');
const usersRouter = require('./routes/users');
const errorHandler = require('./middleware/errorhandler');
const connectMongoDB = require('./mongodb');
const app = express();
const port = process.env.PORT;
const url = process.env.MONGODB_URI;

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization',
        'Access-Control-Allow-Credentials'
    ],
};

app.use(cors(corsOptions));

app.use(cookieParser());

//routes
app.use('/api/courses', coursesRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/users', usersRouter);

//error handling middleware
app.use(errorHandler);

const start = async () => {
    try {
        await connectMongoDB(url);
        app.listen(port, () => {
            console.log(`Server is running...`);
        });
    }
    catch (error) {
        console.log(error);
    }
}

start();