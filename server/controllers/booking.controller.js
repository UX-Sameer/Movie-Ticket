import Booking from "../models/booking.model.js";
import Show from "../models/show.model.js";

export const createBooking = async (req, res) => {
  try {
    const { show, user, seatsBooked } = req.body;

    // ✅ Check if enough seats are available
    const selectedShow = await Show.findById(show);
    if (!selectedShow) return res.status(404).json({ message: "Show not found" });

    if (selectedShow.availableSeats < seatsBooked) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    // ✅ Create Booking
    const booking = new Booking({ show, user, seatsBooked });
    await booking.save();

    // ✅ Update available seats
    selectedShow.availableSeats -= seatsBooked;
    await selectedShow.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("show").populate("user", "fullName email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};
