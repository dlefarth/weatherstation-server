import express, { Router, Request, Response } from 'express';
import Measurement, { IMeasurement } from '../models/Measurement';
import { Mongoose } from 'mongoose';
import Station from '../models/Station';
import { authentication } from './auth';

const router = express.Router();

interface NewMeasurement { temperature: number, humidity: number, timestamp: Date }

router.get('/', (req, res) => {
    Measurement
        .find()
        .then(stations => res.json(stations));
});

router.get('/:stationId', (req, res) => {
    const stationId = req.params.stationId;

    Station.findOne({ _id: stationId })
        .then(station => Measurement.find({ station: station.id }))
        .then(measurements => res.json(measurements))
});

router.post('/:stationId', authentication.required, (req: Request, res: Response) => {
    const stationId = req.params.stationId;
 
    Station.findOne({_id: stationId})
        .then(station => req.body.map((dto: NewMeasurement) => ({...dto, station: station.id}))
        .then((measurements: IMeasurement[]) => Measurement.insertMany(measurements));
});

export const MeasurementRoutes: Router = router;