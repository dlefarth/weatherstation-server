import mongoose, { Schema, Document } from 'mongoose';
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

StationSchema.methods.toAuthJSON = function () {
    return {
        id: this.username
    };
};


export default mongoose.model<IStation>('Station', StationSchema);