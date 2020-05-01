import express, { Router } from 'express';
import Station from '../models/Station';
import { Mongoose } from 'mongoose';

const router = express.Router();

router.get('', (req, res) => {
    Station.find()
        .then(stations => res.json(stations));
});

export const StationRoutes: Router = router;