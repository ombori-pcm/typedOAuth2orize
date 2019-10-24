import Trainer from "../models/trainer";

// Create endpoint /api/users for POST
export const postTrainers = (req, res) => {
  const trainer = new Trainer({
    username: req.body.username,
    password: req.body.password
  });

  trainer.save((err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "New beer drinker added to the locker room!" });
  });
};

// Create endpoint /api/users for GET
export const getTrainers = (req, res) => {
  Trainer.find((err, trainers) => {
    if (err) {
      res.send(err);
    }

    res.json(trainers);
  });
};
