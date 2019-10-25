import Client from "../models/client";

export const postClients = (req, res) => {
  const client = new Client();

  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.trainerId = req.user._id;

  client.save((err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Client added to the locker!", data: client });
  });
};

export const getClients = (req, res) => {
  Client.find({ trainerId: req.user._id }, (err, clients) => {
    if (err) {
      res.send(err);
    }

    res.json(clients);
  });
};
