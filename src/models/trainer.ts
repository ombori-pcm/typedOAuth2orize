import bcrypt from "bcrypt-nodejs";
import {Document, Schema, HookNextFunction, model} from "mongoose";

export interface ITrainer extends Document {
  username: string;
  password: string;
}

export interface ITrainerModel extends ITrainer, Document {
  verifyPassword(password: string, cb: any): void;
}

export type IVerifyPasswordNextFunction = (err: Error, isMatch?: boolean) => void;

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

function saveNext(next: HookNextFunction) {
  const trainer = this;

  if (!trainer.isModified("password")) { return next(); }

  bcrypt.genSalt(5, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(trainer.password, salt, null, (error, hash) => {
      if (error) {return next(error); }
      trainer.password = hash;
      next();
    });
  });
}

TrainerSchema.pre("save", saveNext);

function verifyPassword(password: string, next: IVerifyPasswordNextFunction) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) { return next(err); }
    next(null, isMatch);
  });
}

TrainerSchema.methods.verifyPassword = verifyPassword;

export default model<ITrainerModel>("Trainer", TrainerSchema);
