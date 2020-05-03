import mongoose, { Schema, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../routes/auth';
import bcrypt from 'bcrypt';

export interface IStation extends Document {
    toAuthJSON(): any;
    generateJWT(): any;
    validPassword(password: string): boolean;
    name: string;
    position: [number];
    password: string;
}

const StationSchema: Schema = new Schema({
    name: { type: String, required: true },
    position: { type: [Number], required: true },
    password: {type: String, required: true}
});

StationSchema.methods.validPassword = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
};

// tslint:disable-next-line: only-arrow-functions
StationSchema.methods.generateJWT = function(): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + (60 * 24));

    return jwt.sign({
        id: this._id,
        exp: (exp.getTime() / 1000),
    }, jwtSecret);
};

StationSchema.methods.toAuthJSON = function () {
    return {
        id: this.username,
        token: this.generateJWT()
    };
};


export default mongoose.model<IStation>('Station', StationSchema);