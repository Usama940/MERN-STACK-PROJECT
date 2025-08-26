const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
mongoose
  .connect("mongodb+srv://usama:Ka7VFWtThXa4oGol@cluster0.fhxqlda.mongodb.net/")
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection fail:", err));

//  Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// Middlewares
app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

//  Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello from route handler home 🚀" });
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Create a user
app.post("/api/users", async (req, res) => {
  try {
    const body = req.body;
    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.gender ||
      !body.jobTitle
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle,
    });

    console.log("User created:", result);
    return res
      .status(201)
      .json({ message: "User created successfully", user: result });
  } catch (err) {
    console.error("Error creating user:", err);
    return res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

// Get single user
app.get("/api/users/:id", async (req, res) => {});

// Update user
app.patch("/api/users/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      Number(req.params.id),
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(400)
      .json({ message: "Error updating user", error: err.message });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {});

app.listen(PORT, () =>
  console.log(`🚀 Server started on http://localhost:${PORT}`)
);
