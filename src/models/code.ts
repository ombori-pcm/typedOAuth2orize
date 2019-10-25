import { Document, Schema, model } from "mongoose";

export interface ICode extends Document {
    value: string;
    redirectUri: string;
    trainerId: string;
    clientId: string;
}

const CodeSchema = new Schema({
    value: { type: String, required: true },
    redirectUri: { type: String, required: true },
    trainerId: { type: String, required: true },
    clientId: { type: String, required: true }
});

export default model<ICode>("Code", CodeSchema);
