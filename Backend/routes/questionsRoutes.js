const express = require("express");
const Question = require("../models/Questions");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("route working");
});

router.get("/filter", async (req, res) => {
  try {
    const { limit, category, difficulty } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const questions = await Question.aggregate([
        {$match: filter},
        {$sample: {size: parseInt(limit || 10)}}
    ])
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.messages });
  }
});

module.exports = router;
