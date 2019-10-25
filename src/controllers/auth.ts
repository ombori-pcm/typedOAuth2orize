import passport from "passport";
import { BasicStrategy } from "passport-http";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import Trainer from "../models/trainer";
import Client from "../models/client";
import Token from "../models/token";

passport.use(new BasicStrategy(
  (username, password, callback) => {
    Trainer.findOne({ username }, (err, trainer) => {

      if (err) { return callback(err); }

      if (!trainer) { return callback(null, false); }

      trainer.verifyPassword(password, (error: Error, isMatch: boolean) => {
        if (error) { return callback(error); }

        if (!isMatch) { return callback(null, false); }

        return callback(null, trainer);
      });
    });
  }
));

export const isAuthenticated = passport.authenticate(["basic", "bearer"], { session : false });

passport.use("client-basic", new BasicStrategy(
  (username, password, callback) => {
    Client.findOne({ id: username }, (err, client) => {
      if (err) { return callback(err); }

      if (!client || client.secret !== password) { return callback(null, false); }

      return callback(null, client);
    });
  }
));

export const isClientAuthenticated = passport.authenticate("client-basic", { session : false });

passport.use(new BearerStrategy(
  (accessToken, callback) => {
    Token.findOne({value: accessToken }, (tokenErr, token) => {
      if (tokenErr) { return callback(tokenErr); }

      if (!token) { return callback(null, false); }

      Trainer.findOne({ _id: token.trainerId }, (trainerErr, trainer) => {
        if (trainerErr) { return callback(trainerErr); }

        if (!trainer) { return callback(null, false); }

        callback(null, trainer, { scope: "*" });
      });
    });
  }
));

export const isBearerAuthenticated = passport.authenticate("bearer", { session: false });
