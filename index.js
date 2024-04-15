import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";

const app = express();
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

//Route for Save a new User
app.post("/user", async (request, response) => {
  try {
    if (
      request.body.firstName ||
      request.body.secondName ||
      request.body.email ||
      request.body.password
    ) {
      return response.status(400).send({
        message:
          "Send all required properties: firstName, secondName, email, password",
      });
    }
    const newUser = {
      firstName: request.body.firstName,
      secondName: request.body.secondName,
      email: request.body.email,
      password: request.body.password,
      phoneNumber: request.body.phoneNumber,
    };
    const user = await User.create(newUser)

    return response.status(201).send(user)
  } catch (error) {
    console.log(error.message)
        response.status(500).send({message:error.message})
    }
  
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
