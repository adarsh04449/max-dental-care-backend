const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const reviewRoutes = require("./router/review-router");
const cors = require('cors');

dotenv.config();
app.use(cors({ origin: "*" }));

const port = 3000;


const mongoURI = process.env.MONGODB_URI
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoURI);
}

app.use(express.json());

app.use("/reviews", reviewRoutes);

app.use("/", (req, res) => {
    res.send("Working");
})


app.listen(port, () => {
    console.log("listening on port 3000");
})