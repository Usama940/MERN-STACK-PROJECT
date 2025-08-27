const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Create a user
router.post("/", async (req, res) => {
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

    const result = await User.create(body);

    return res.status(201).json({
      message: "User created successfully",
      user: result,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const allDbUsers = await User.find({});
    res.json(allDbUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

// Get single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// Update user
router.patch("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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
router.delete("/:id", async (req, res) => {
  try {
    const userdelete = await User.findByIdAndDelete(req.params.id);

    if (!userdelete) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User deleted successfully",
      user: userdelete.firstName,
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res
      .status(400)
      .json({ message: "Error deleting user", error: err.message });
  }
});

module.exports = router;
