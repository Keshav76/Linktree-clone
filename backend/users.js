import express from "express";
import UserModel from "./model.js";

const app = express.Router();

app.post("/", async (req, res) => {
  const { username } = req.body;
  try {
    const users = await UserModel.findOne({ username });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/links/:url", async (req, res) => {
  try {
    const { url } = req.params;

    // Find the user with the specified URL
    const user = await UserModel.findOne({ url });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the URLs associated with the user
    res.json(user.urls);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password, url } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser)
      return res.status(409).json({ message: "Username already exists" });

    const newUser = new UserModel({ username, password, url });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during user registration" + err });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = password === user.password;
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during login" });
  }
});

app.post("/add/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { title, url } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // user.urls.push({ title, url });
    // await user.save();
    await UserModel.updateOne(
      { username },
      { $push: { urls: { title, url } } }
    );
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding URL for the user" + err });
  }
});

app.post("/delete/:username", async (req, res) => {
  const { username } = req.params;
  const { title } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserModel.updateOne({ username }, { $pull: { urls: { title } } });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing URL for the user" });
  }
});

export default app;
