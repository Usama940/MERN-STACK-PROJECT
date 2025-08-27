const User = require("../models/user");

// Create a user
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !gender || !jobTitle) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      gender,
      jobTitle,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format", error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating user", error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully", user: deleted.firstName });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: err.message });
  }
};
