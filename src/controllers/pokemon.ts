import Pokemon from "../models/pokemon";
import { RequestHandler } from "express";

export const postPokemons:RequestHandler = ( (req, res) => {
  const pokemon = new Pokemon();

  pokemon.name = req.body.name;
  pokemon.type = req.body.type;
  pokemon.quantity = req.body.quantity;

  pokemon.save( (err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Pokemon added to the storage!", data: pokemon });
  });
});

export const getPokemons:RequestHandler = ( (req, res) => {
    Pokemon.find( (err, pokemons) => {
      if (err) {
        res.send(err);
      }
      res.json(pokemons);
    });
  });

export const getPokemon:RequestHandler = ((req, res) => {
    Pokemon.findById(req.params.pokemon_id, (err, pokemon) => {
      if (err) {
        res.send(err);
      }

      res.json(pokemon);
    });
  });
export const putPokemon:RequestHandler = ((req, res) => {
  Pokemon.findById(req.params.beer_id, (err, pokemon) => {
    if (err) {
      res.send(err);
    }
    pokemon.quantity = req.body.quantity;

    pokemon.save((error) => {
      if (error) {
        res.send(error);
      }

      res.json(pokemon);
    });
  });
});

export const deletePokemon:RequestHandler = ( (req, res) => {
  Pokemon.findByIdAndRemove(req.params.beer_id, (err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Pokemon removed from the storage!" });
  });
});
