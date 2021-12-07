const { Router } = require("express");
const router = Router();

const messages = [];
let counter = 0;

router.get("/", (req, res) => {
  res.json(messages);
});

router.post("/", (req, res) => {
  messages.push({ ...req.body, _id: counter++, addedAt: new Date() });
  res.json(messages);
});

module.exports = router;
