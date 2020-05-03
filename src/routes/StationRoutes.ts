import express, { Router, Request, Response } from 'express';
import Station from '../models/Station';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('', (req: Request, res: Response) => {
    Station.find()
        .then(stations => res.json(stations));
});

router.post('', (req: Request, res: Response) => {
    const {name, position, password} = req.body;
    const salt = bcrypt.genSaltSync(10);

    const station = new Station();
    station.name = name;
    station.position = position;
    station.password = bcrypt.hashSync(password, salt);
    station.save()
        .then(_ => res.json());
});

export const StationRoutes: Router = router;