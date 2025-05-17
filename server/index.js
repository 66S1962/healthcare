import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";

// Import models
import UserModel from "./Models/Users.js";
import AppointmentModel from "./Models/Appointment.js";
import ReportModel from "./Models/Reports.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the database
const connectString = "mongodb+srv://admain:admain@cluster0.hlu6waf.mongodb.net/healthDb?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(connectString)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Register patient
app.post("/registerPatient", async (req, res) => {
  try {
    const { name, email, password, age, phone, address, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Please fill in all required fields" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      age,
      phone,
      address,
      role
    });

    await user.save();
    res.send({ msg: "Patient registered successfully", success: true });
  } catch (error) {
    console.error("❌ Error during registration:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const userResponse = {
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age,
      phone: user.phone,
      address: user.address,
      token: "dummy-token", // Can be changed to JWT later
    };

    res.json({ user: userResponse });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

// Book an appointment
app.post("/api/appointments/book", async (req, res) => {
  try {
    const { name, email, date, time, reason, specialty } = req.body;

    if (!name || !email || !date || !time || !reason || !specialty) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const appointment = new AppointmentModel({
      name,
      email,
      date,
      time,
      reason,
      specialty
    });

    await appointment.save();
    res.status(201).json({ success: true, message: "Appointment booked successfully", appointment });

  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Error occurred while booking" });
  }
});

// Get all appointments
app.get("/api/appointments/all", async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Error occurred while fetching appointments" });
  }
});

// Get medical reports
app.get("/reports", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const reports = await ReportModel.find({ email }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error("❌ Error fetching reports:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Update user profile
app.put("/update-profile", async (req, res) => {
  try {
    const { email, name, age, phone, address } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.age = age;
    user.phone = phone;
    user.address = address;

    await user.save();  // Save updated user data

    res.json(user);  // Send updated user data back to client
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
