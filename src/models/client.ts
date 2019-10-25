import { Document, Schema, model } from "mongoose";

export interface IClient extends Document {
    name: string;
    id: number;
    secret: string;
    trainerId: string;
}

const ClientSchema = new Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    secret: { type: String, required: true },
    trainerId: { type: String, required: true }
});

export default model<IClient>("Client", ClientSchema);
