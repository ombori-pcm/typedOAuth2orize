import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import session from "express-session";
import {deletePokemon, getPokemon, getPokemons, postPokemons, putPokemon} from "./controllers/pokemon";
import {postTrainers, getTrainers} from "./controllers/trainer";
import {postClients, getClients} from "./controllers/client";
import {isAuthenticated, isClientAuthenticated} from "./controllers/auth";
import {authorization, decision, token} from "./controllers/oauth2";

const app = express();

// Set view engine to ejs
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs");

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: "Super Secret Session Key",
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

const port = process.env.PORT || 3000;
const router = express.Router();

mongoose.connect("mongodb://localhost:27017/pokemonstorage",{ useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, });

router.get("/", (req, res) => {
    res.json({ message: "You are running dangerously low on pokemon!" });
});

router.route("/pokemons")
  .post(isAuthenticated, postPokemons)
  .get(isAuthenticated, getPokemons);

router.route("/pokemons/:pokemon_id")
  .get(isAuthenticated, getPokemon)
  .put(isAuthenticated, putPokemon)
  .delete(isAuthenticated, deletePokemon);

router.route("/trainers")
  .post(postTrainers)
  .get(isAuthenticated, getTrainers);

router.route("/clients")
  .post(isAuthenticated, postClients)
  .get(isAuthenticated, getClients);

// Create endpoint handlers for oauth2 authorize
router.route("/oauth2/authorize")
  .get(isAuthenticated, authorization)
  .post(isAuthenticated, decision);

// Create endpoint handlers for oauth2 token
router.route("/oauth2/token")
  .post(isClientAuthenticated, token);

app.use("/api", router);

app.listen(port);
console.log("Insert pokemon on port " + port);
