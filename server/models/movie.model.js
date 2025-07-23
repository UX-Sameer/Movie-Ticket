import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  language: String,
  genre: String,
  posterUrl: String,
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true
  }
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
