import mongoose, { Schema, Document } from 'mongoose';

export interface IStation extends Document {
    validPassword(password: string): boolean;
    name: string;
    position: [number];
}

const StationSchema: Schema = new Schema({
    name: { type: String, required: true },
    position: { type: [Number], required: true }
});

StationSchema.methods.validPassword = (password: string): boolean => {return password.length > 0};

export default mongoose.model<IStation>('Station', StationSchema);