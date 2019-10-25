import { Document, Schema, model } from "mongoose";
import datePlugins from "../tools/plugin";

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

ClientSchema.plugin(datePlugins)

export default model<IClient>("Client", ClientSchema);
