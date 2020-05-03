import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MainRouter } from './routes';
import './config/passport';

dotenv.config();

const isProduction = false;
const { PORT, MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`;
mongoose.connect(mongoUrl);

const app = express();

app.use(bodyParser.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
        'errors': {
            message: err.message,
            error: err
        }
    });
});

app.use('/api', MainRouter);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));