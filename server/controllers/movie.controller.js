import Movie from "../models/movie.model.js";

// ✅ Add a new movie
export const createMovie = async (req, res) => {
  try {
    const { title, description, language, genre, posterUrl, city } = req.body;

    const movie = new Movie({ title, description, language, genre, posterUrl, city });
    await movie.save();

    res.status(201).json({ message: "Movie created", movie });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get all movies with city name
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("city", "name");
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
