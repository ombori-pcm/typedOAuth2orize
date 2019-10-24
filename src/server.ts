import express from "express";

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "You are running dangerously low on beer!" });
});

app.use("/api", router);

app.listen(port);
console.log("Insert beer on port " + port);
