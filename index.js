import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/users.js";
import taskRoutes from "./routers/tasks.js";

const app = express();
const port = 4000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors("*"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log("Error in connecting mongodb =>", err));

app.get("/", (req, res) => {
  res.send(`Server is running on port:${port}`);
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.listen(port, () => console.log(`App is listening on port:${port}`));
