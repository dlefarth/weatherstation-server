import passport from 'passport';
import Station from "../models/Station"
import { BasicStrategy } from 'passport-http';

passport.use(new BasicStrategy(
    (id, password, done) => {
    Station.findOne({ _id: id }).then(station => {
        if (!station) {
            return done(null, false)
        }
        if (!station.validPassword(password)) {
            return done(null, false);
        }

        return done(null, station);
    })
}));