import { Document, Schema, model } from "mongoose";
import datePlugins from "../tools/plugin";

export interface IPokemon extends Document {
    name: string;
    quantity: number;
    type: string;
    trainerId: string;
}

const PokemonSchema = new Schema({
    name: String,
    quantity: Number,
    type: String,
    trainerId: String,
});

PokemonSchema.plugin(datePlugins);

export default model<IPokemon>("Pokemon", PokemonSchema);
