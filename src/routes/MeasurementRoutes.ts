import express, { Router, Request, Response } from 'express';
import Measurement, { IMeasurement } from '../models/Measurement';
import { Mongoose } from 'mongoose';
import Station, { IStation } from '../models/Station';
import passport from 'passport';
import auth from '../config/auth';

const router = express.Router();

interface NewMeasurement { temperature: number, pressure: number, timestamp: Date }

router.get('/', (req, res) => {
    Measurement.find()
        .then(stations => res.json(stations));
});

router.get('/:stationId', (req, res) => {
    const stationId = req.params.stationId;

    Station.findOne({ _id: stationId })
        .then(station => Measurement.find({ station: station.id }))
        .then(measurements => res.json(measurements))
});

router.post('', auth, (req: Request, res: Response) => {
    const {_id} = req.user as IStation;

    Station.findOne({ _id })
        .then(station => req.body.map((dto: NewMeasurement) => ({ ...dto, station: station._id })))
        .then((measurements: IMeasurement[]) => Measurement.insertMany(measurements))
        .then(_ => res.json())
});

export const MeasurementRoutes: Router = router;