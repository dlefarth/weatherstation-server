import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MainRouter } from './routes';

dotenv.config();

const {PORT, MONGO_USER, MONGO_PASSWORD, MONGO_PATH} = process.env;

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`;
mongoose.connect(mongoUrl);

const app = express();

app.use('/api', MainRouter);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));