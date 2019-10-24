import bcrypt from "bcrypt-nodejs";
import mongoose, {Document, Schema} from "mongoose";

export interface ITrainer extends Document {
    username: string;
    password: string;
    verifyPassword: (password: string, cb: VoidFunction) => void;
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

// Execute before each user.save() call
TrainerSchema.pre("save", (callback) => {
  const trainer = this;

  // Break out if the password hasn't changed
  if (!trainer.isModified("password")) { return callback(); }

  // Password changed so we need to hash it
  bcrypt.genSalt(5, (err, salt) => {
    if (err) { return callback(err); }

    bcrypt.hash(trainer.password, salt, null, (error, hash) => {
      if (error) {return callback(error); }
      trainer.password = hash;
      callback();
    });
  });
});

TrainerSchema.methods.verifyPassword = (password, cb) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) { return cb(err); }
      cb(null, isMatch);
    });
  };

// Export the Mongoose model
export default mongoose.model<ITrainer>("Trainer", TrainerSchema);
