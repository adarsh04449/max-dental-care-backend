const express = require("express");
const Review = require("../model/review-model");
const reviewValidation = require("../model/review-validation");

const router = express.Router();

router.post("/", async (req, res) => {
    const { error, value } = reviewValidation.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(detail => detail.message),
      });
    }

    try {
        const review = new Review(value);
        await review.save();
        res.status(200).json({ message: 'Review submitted' });
        
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit review' });
    }
})

router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
})

router.delete("/", async (req, res) => {
    try {
        await Review.deleteMany({});
        res.status(200).json({ message: "All reviews deleted successfully." });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete reviews.", details: error.message });
      }
})

module.exports = router;