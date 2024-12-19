import express from "express";
import { taskModel } from "../models/task.js";
import { authenticateUser } from "../middleware/authenticate.js";
import sendResponse from "../helpers/sendResponse.js";

const router = express.Router();

router.get("/", authenticateUser, async (req, res) => {
  try {
    let tasks = await taskModel.find({ createdBy: req.user._id });

    if (!tasks) return sendResponse(res, 404, null, false, "Tasks not found.");

    return sendResponse(res, 200, tasks, true, "Tasks fetched successfully.");
  } catch (err) {
    console.log("Internal server error ======>>>>>>", err);
    return sendResponse(res, 500, null, false, "Internal server error.");
  }
});

router.post("/", authenticateUser, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title)
      return sendResponse(res, 403, null, false, "Title field in required.");

    let newTask = new taskModel({
      title,
      description: description ? description : null,
      createdBy: req.user._id,
    });

    newTask = await newTask.save();
    sendResponse(res, 201, newTask, true, "Task added successfully.");
  } catch (err) {
    console.log("Internal server error ======>>>>>>", err);
    return sendResponse(res, 500, null, false, "Internal server error.");
  }
});

export default router;
