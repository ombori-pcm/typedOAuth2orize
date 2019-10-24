import passport from "passport";
import { BasicStrategy } from "passport-http";
import Trainer from "../models/trainer";

passport.use(new BasicStrategy(
  (username, password, callback) => {
    Trainer.findOne({ username }, (err, trainer) => {
      if (err) { return callback(err); }

      // No user found with that username
      if (!trainer) { return callback(null, false); }

      // Make sure the password is correct
      trainer.verifyPassword(password, (error, isMatch) => {
        if (error) { return callback(error); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, trainer);
      });
    });
  }
));

export const isAuthenticated = passport.authenticate("basic", { session : false });
