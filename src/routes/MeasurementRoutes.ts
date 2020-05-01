import express, { Router } from 'express';
import Measurement from '../models/Measurement';
import { Mongoose } from 'mongoose';
import Station from '../models/Station';
import { stat } from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
    Measurement
        .find()
        .then(stations => res.json(stations));
});

router.get('/:stationId', (req, res) => {
    const stationId = req.params.stationId;

    Station.findOne({_id: stationId})
        .then(station => Measurement.find({station: station.id}))
        .then(measurements => res.json(measurements))
});

export const MeasurementRoutes: Router = router;