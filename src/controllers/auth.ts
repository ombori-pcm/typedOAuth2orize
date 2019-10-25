import passport from "passport";
import { BasicStrategy } from "passport-http";
import Trainer from "../models/trainer";

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

export const isAuthenticated = passport.authenticate("basic", { session : false });
