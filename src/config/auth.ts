import passport from "passport";

const auth = passport.authenticate('basic', { session: false });

export default auth;