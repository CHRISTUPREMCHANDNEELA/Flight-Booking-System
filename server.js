
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://127.0.0.1:27017/abbeyFlightDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
}

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  age: { type: Number, required: true, min: 1 },
  phone: { type: String, required: true },
  journeyPlace: { type: String, required: true },
  journeyDate: { type: Date, required: true }
});

const Booking = mongoose.model("Booking", bookingSchema);
// Create booking
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, gender, age, phone, journeyPlace, journeyDate } = req.body;

    if (!name || !email || !gender || !age || !phone || !journeyPlace || !journeyDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingBooking = await Booking.findOne({ email });
    if (existingBooking) {
      return res.status(409).json({ message: "Email already booked" });
    }

    const newBooking = new Booking({
      name,
      email,
      gender,
      age,
      phone,
      journeyPlace,
      journeyDate
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating booking" });
  }
});

app.get("/api/bookings", async (req, res) => {
  try {
    const { search, sortBy } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      };
    }

    let bookings = await Booking.find(query);

    if (sortBy === "name") {
      bookings = bookings.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "date") {
      bookings = bookings.sort((a, b) => new Date(a.journeyDate) - new Date(b.journeyDate));
    }

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
});

app.get("/api/bookings/email/:email", async (req, res) => {
  try {
    const booking = await Booking.findOne({ email: req.params.email });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching booking" });
  }
});

app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { name, email, gender, age, phone, journeyPlace, journeyDate } = req.body;

    if (!name || !email || !gender || !age || !phone || !journeyPlace || !journeyDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { name, email, gender, age, phone, journeyPlace, journeyDate },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (err) {
    if (err.code === 11000 && err.keyValue && err.keyValue.email) {
      return res.status(400).json({ message: "This email is already booked" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error updating booking" });
  }
});

app.delete("/api/bookings/email/:email", async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ email: req.params.email });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking deleted successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting booking" });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = { app, Booking, mongoose };
