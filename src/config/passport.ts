import passport from 'passport';
import { Strategy } from 'passport-local';
import Station from "../models/Station"

passport.use(new Strategy({
    usernameField: 'station[id]',
    passwordField: 'station[password]'
}, (id, password, done) => {
    Station.findOne({ _id: id }).then(station => {
        if (!station) {
            return done(null, false, { message: 'id invalid' })
        }
        if (!station.validPassword(password)) {
            return done(null, false, { message: 'password incorrect' });
        }

        return done(null, station);
    })
}));