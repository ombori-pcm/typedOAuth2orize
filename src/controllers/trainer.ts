import Trainer from "../models/trainer";
import { RequestHandler } from "express";

export const postTrainers:RequestHandler = (req, res) => {
  const trainer = new Trainer({
    username: req.body.username,
    password: req.body.password
  });

  trainer.save((err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "New trainer added to room!" });
  });
};

export const getTrainers:RequestHandler = (req, res) => {
  Trainer.find((err, trainers) => {
    if (err) {
      res.send(err);
    }

    res.json(trainers);
  });
};
