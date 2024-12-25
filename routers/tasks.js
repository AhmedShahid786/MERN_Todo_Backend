//? Import required modules and libraries
import express from "express";
import { taskModel } from "../models/task.js";
import sendResponse from "../helpers/sendResponse.js";

//? Create a new router instance
const router = express.Router();

//? Route for fetching tasks of a particular user
router.get("/", async (req, res) => {
  try {
    //* Fetch the tasks fro db using user id
    let tasks = await taskModel.find({ createdBy: req.user._id });

    //* If no tasks found, return an error response
    if (!tasks) return sendResponse(res, 404, null, false, "Tasks not found.");

    //* Return success response with tasks data
    return sendResponse(res, 200, tasks, true, "Tasks fetched successfully.");
  } catch (err) {
    console.log("Internal server error ======>>>>>>", err);
    return sendResponse(res, 500, null, false, "Internal server error.");
  }
});

//? Route for adding a new task to the database against a particular user
router.post("/", async (req, res) => {
  try {
    //* Destructure the title and description from request body
    const { title, description } = req.body;

    //* If title is not provided, return an error response
    if (!title)
      return sendResponse(res, 403, null, false, "Title field is required.");

    //* Create a new task instance using taskModel
    let newTask = new taskModel({
      title,
      description: description ? description : "No Description.",
      createdBy: req.user._id,
    });

    //* Save the new task in the database
    newTask = await newTask.save();

    //* Return success response with new-task data
    sendResponse(res, 201, newTask, true, "Task added successfully.");
  } catch (err) {
    console.log("Internal server error ======>>>>>>", err);
    return sendResponse(res, 500, null, false, err);
  }
});

//? Route for marking a task as completed or pending
router.put("/:id", async (req, res) => {
  try {
    const { isCompleted } = req.body;

    //* If task completion status is not provided, return an error response
    if (isCompleted === null || isCompleted === undefined)
      return sendResponse(
        res,
        403,
        null,
        false,
        "Task completion status not provided."
      );

    //* Find the task in database using task id
    const taskFromDb = await taskModel.findById(req.params.id);

    //* If task is not found, return an error response
    if (!taskFromDb)
      return sendResponse(res, 404, null, false, "Task not found.");

    //* Update the task completion status in the database and save the updated task
    taskFromDb.isCompleted = isCompleted;
    await taskFromDb.save();

    //* Return success response with updated-task data
    return sendResponse(
      res,
      200,
      taskFromDb,
      true,
      "Task updated successfully."
    );
  } catch (err) {
    return sendResponse(res, 500, null, false, "Internal server error.");
  }
});

//? Route for deleting a task from the database
router.delete("/:id", async (req, res) => {
  try {
    //* Find the task in database using task id
    const task = await taskModel.findByIdAndDelete(req.params.id);

    //* If task is not found, return an error response
    if (!task) return sendResponse(res, 404, null, false, "Task not found.");

    //* Delete the task from the database
    await taskModel.deleteOne({ _id: req.params.id });

    //* Return success response with deleted-task data
    return sendResponse(res, 200, task, true, "Task deleted successfully.");
  } catch (err) {
    return sendResponse(res, 500, null, false, err.message);
  }
});

export default router;
