import mongoose, { Schema, Document } from 'mongoose';

export interface IMeasurement extends Document {
    station: Schema.Types.ObjectId;
    timestamp: Date,
    temperature: number,
    humidity: number
}

const measurementSchema: Schema = new Schema({
    station: { type: Schema.Types.ObjectId, ref: 'Station' },
    timestamp: { type: Date, default: Date.now },
    temperature: { type: Number },
    humidity: { type: Number }
});

export default mongoose.model<IMeasurement>('Measurement', measurementSchema);