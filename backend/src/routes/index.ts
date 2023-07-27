import express from "express";

const router = express.Router();

router.get("/time", (req, res) => {
  const epoch = Math.floor(Date.now() / 1000);
  res.json({ epoch });
});

export default router;
