import Pokemon from "../models/pokemon";

// Create endpoint /api/beers for POSTS
export const postPokemons = ( (req, res) => {
  // Create a new instance of the Beer model
  const pokemon = new Pokemon();

  // Set the beer properties that came from the POST data
  pokemon.name = req.body.name;
  pokemon.type = req.body.type;
  pokemon.quantity = req.body.quantity;

  // Save the beer and check for errors
  pokemon.save( (err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Pokemon added to the storage!", data: pokemon });
  });
});

export const getPokemons = ( (req, res) => {
    // Use the Beer model to find all beer
    Pokemon.find( (err, pokemons) => {
      if (err) {
        res.send(err);
      }
      res.json(pokemons);
    });
  });

  // Create endpoint /api/beers/:beer_id for GET
export const getPokemon = ((req, res) => {
    // Use the Beer model to find a specific beer
    Pokemon.findById(req.params.pokemon_id, (err, pokemon) => {
      if (err) {
        res.send(err);
      }

      res.json(pokemon);
    });
  });
export const putPokemon = ((req, res) => {
  // Use the Beer model to find a specific beer
  Pokemon.findById(req.params.beer_id, (err, pokemon) => {
    if (err) {
      res.send(err);
    }
    // Update the existing beer quantity
    pokemon.quantity = req.body.quantity;

    // Save the beer and check for errors
    pokemon.save((error) => {
      if (error) {
        res.send(error);
      }

      res.json(pokemon);
    });
  });
});

export const deletePokemon = ( (req, res) => {
  // Use the Beer model to find a specific beer and remove it
  Pokemon.findByIdAndRemove(req.params.beer_id, (err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Beer removed from the locker!" });
  });
});
