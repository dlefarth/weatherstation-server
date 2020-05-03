import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { IStation } from "../models/Station";

const router = Router();

router.post('', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    if (!req.body.station.id) {
        return res.status(422).json({ errors: { id: 'cant be blank' } });
    }

    if (!req.body.station.password) {
        return res.status(422).json({ errors: { password: 'cant be blank' } });
    }

    passport.authenticate('local', { session: false }, (err, station: IStation, info) => {
        if (err) { return next(err); }

        if (station) {
            return res.json({ station: station.toAuthJSON() });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

export const LoginRoutes: Router = router;