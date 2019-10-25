import bcrypt from "bcrypt-nodejs";
import {Document, Schema, Model, model} from "mongoose";

export interface ITrainer extends Document {
  username: string;
  password: string;
}

export interface ITrainerModel extends ITrainer, Document {
  verifyPassword(password: string, cb: any): void;
}

// Define our user schema
const TrainerSchema = new Schema({
    password: {
        required: true,
        type: String,
      },
  username: {
    required: true,
    type: String,
    unique: true,
  },
});

function cb(next) {
  const trainer = this;

  // Break out if the password hasn't changed
  if (!trainer.isModified("password")) { return next(); }

  // Password changed so we need to hash it
  bcrypt.genSalt(5, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(trainer.password, salt, null, (error, hash) => {
      if (error) {return next(error); }
      trainer.password = hash;
      next();
    });
  });
}

// Execute before each user.save() call
TrainerSchema.pre("save", cb);

function verifyPassword(password, next) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) { return next(err); }
    next(null, isMatch);
  });
}

TrainerSchema.methods.verifyPassword = verifyPassword;

// Export the Mongoose model
export default model<ITrainerModel>("Trainer", TrainerSchema);
