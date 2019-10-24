import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import {deletePokemon, getPokemon, getPokemons, postPokemons, putPokemon} from "./controllers/pokemon";
import {postTrainers, getTrainers} from "./controllers/trainer";
const app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
  }));

const port = process.env.PORT || 3000;
const router = express.Router();

mongoose.connect("mongodb://localhost:27017/pokemonstorage");

router.get("/", (req, res) => {
    res.json({ message: "You are running dangerously low on pokemon!" });
});

router.route("/pokemons")
  .post(postPokemons)
  .get(getPokemons);

router.route("/pokemons/:pokemon_id")
  .get(getPokemon)
  .put(putPokemon)
  .delete(deletePokemon);

router.route("/trainers")
  .post(postTrainers)
  .get(getTrainers);

app.use("/api", router);

app.listen(port);
console.log("Insert pokemon on port " + port);
