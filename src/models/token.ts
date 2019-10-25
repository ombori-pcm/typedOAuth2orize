import { Document, Schema, model } from "mongoose";

export interface IToken extends Document {
    value: string;
    trainerId: string;
    clientId: string;
}

const TokenSchema = new Schema({
    value: { type: String, required: true },
    trainerId: { type: String, required: true },
    clientId: { type: String, required: true }
});

export default model<IToken>("Token", TokenSchema);
