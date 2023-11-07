import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import Users from "./users.js";

const app = express();

app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "/public")
  )
);

app.use(cors());
app.use(express.json());
// remove /api for development
app.use("/api/users", Users);

function db_connect() {
  mongoose
    .connect(
      "mongodb+srv://user1:user1@learnmern.uiuaz3e.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => console.log("Could not connect to MongoDB"));
}

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  db_connect();
  console.log(`Server started on port ${PORT}!`);
});
