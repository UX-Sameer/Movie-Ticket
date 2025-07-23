import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  theatre: {
    type: String,
    required: true
  },
  showDate: {
    type: String, // or Date, but string is easier to manage in frontend
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  totalSeats: {
    type: Number,
    default: 100
  },
  availableSeats: {
    type: Number,
    default: 100
  }
});

const Show = mongoose.model("Show", showSchema);
export default Show;
