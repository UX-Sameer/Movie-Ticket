import City from "../models/city.model.js";

// ✅ Add a new city
export const createCity = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await City.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "City already exists" });
    }

    const city = new City({ name });
    await city.save();
    res.status(201).json({ message: "City created", city });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get all cities
export const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
