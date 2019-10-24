import mongoose, { Document, Schema } from "mongoose";

export interface IPokemon extends Document {
    name: string;
    quantity: number;
    type: string;
}

const PokemonSchema = new Schema({
    name: String,
    quantity: Number,
    type: String,
});

export default mongoose.model<IPokemon>("Pokemon", PokemonSchema);
