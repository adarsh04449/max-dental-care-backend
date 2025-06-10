const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;