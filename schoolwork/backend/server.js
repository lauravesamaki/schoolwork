require('dotenv').config();
require('./mongodb');
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./mongodb');
const userRouter = require('./routes/users');
const assignmentRouter = require('./routes/assignments');
const courseRouter = require('./routes/courses');
const APIError = require('./errors/custom');
const app = express();
const port = process.env.PORT;
const url = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/assignments', assignmentRouter);
app.use('/api/courses', courseRouter);

const start = async () => {
    try {
        await connectMongoDB(url);
        app.listen(port, () => {
            console.log(`Server is running...`);
        });
    }
    catch (error) {
        throw new APIError('Error connecting to MongoDB', 500);
    }
};

start();