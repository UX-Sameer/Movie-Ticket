import Show from "../models/show.model.js";

// ✅ Add a new show
export const createShow = async (req, res) => {
  try {
    const { movie, theatre, showDate, showTime, price, totalSeats } = req.body;

    const show = new Show({
      movie,
      theatre,
      showDate,
      showTime,
      price,
      totalSeats,
      availableSeats: totalSeats
    });

    await show.save();
    res.status(201).json({ message: "Show created", show });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get all shows with movie details
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find().populate("movie", "title posterUrl");
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
