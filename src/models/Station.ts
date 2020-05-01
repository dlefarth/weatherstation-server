import mongoose, { Schema, Document } from 'mongoose';

export interface Station extends Document {
    name: string;
    position: [number];
}

const StationSchema: Schema = new Schema({
    name: { type: String, required: true },
    position: { type: [Number], required: true }
});

export default mongoose.model<Station>('Station', StationSchema);