import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    secondName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phoneNumber: {
        type: String,
        
      },
  },
  {
    timestamp: true,
  }
);

export const User = mongoose.model("User", userSchema);
