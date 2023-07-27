import express from "express";

const router = express.Router();

/* GET epoch */
router.get("/time", function (req, res, next) {
  const epoch = Math.floor(Date.now() / 1000);
  res.json({ epoch });
});

export default router;
