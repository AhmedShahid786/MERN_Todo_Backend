//? Import required modules and libraries
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

//? Import route handlers
import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/users.js";
import taskRoutes from "./routers/tasks.js";
import { authenticateUser } from "./middleware/authenticate.js";

//? Initialize the Express app and define port for the server
const app = express();
const port = 4000;

//? Application level middleware setup
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors("*"));

//? Connect server to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log("Error in connecting mongodb =>", err));

//? Default route to verify the server is running
app.get("/", (req, res) => {
  res.send(`Server is running on port:${port}`);
});

//? Define routes for the server using route-handlers
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/tasks", authenticateUser, taskRoutes);

//? Start the server and listen on the defined port
app.listen(port, () => console.log(`App is listening on port:${port}`));
