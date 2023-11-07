import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  urls: [
    {
      title: String,
      url: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
