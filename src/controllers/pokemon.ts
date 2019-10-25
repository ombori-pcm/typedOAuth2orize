import Pokemon from "../models/pokemon";
import { RequestHandler } from "express";

export const postPokemons: RequestHandler = ( (req, res) => {
  const pokemon = new Pokemon();

  pokemon.name = req.body.name;
  pokemon.type = req.body.type;
  pokemon.quantity = req.body.quantity;
  pokemon.trainerId = req.user._id;

  pokemon.save( (err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Pokemon added to the storage!", data: pokemon });
  });
});

export const getPokemons: RequestHandler = ( (req, res) => {
    Pokemon.find({ trainerId: req.user._id }, (err, pokemons) => {
      if (err) {
        res.send(err);
      }
      res.json(pokemons);
    });
  });

export const getPokemon: RequestHandler = ((req, res) => {
    Pokemon.find({ trainerId: req.user._id, _id: req.params.pokemon_id }, (err, pokemon) => {
      if (err) {
        res.send(err);
      }

      res.json(pokemon);
    });
  });
export const putPokemon: RequestHandler = ((req, res) => {
  Pokemon.update(
    { trainerId: req.user._id, _id: req.params.pokemon_id },
    { quantity: req.body.quantity },
    (err, num, raw) => {{
      if (err) {
        res.send(err);
      }

      res.json({ message: num + " updated" });
  }});
});

export const deletePokemon: RequestHandler = ( (req, res) => {
  Pokemon.remove({ trainerId: req.user._id, _id: req.params.pokemon_id }, (err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Pokemon removed from the storage!" });
  });
});
