import express from "express";
import { authenticateUser } from "../middleware/authenticate";
import { userModel } from "../models/user";
import sendResponse from "../helpers/sendResponse";

const router = express.Router();

router.get("/info", authenticateUser, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).exec(true);

    if (!user) return sendResponse(res, 404, null, false, "User not found.");

    return sendResponse(res, 200, user, true, "User data fetched from db.");
  } catch (err) {
    console.log("Internal server error ======>>>>>>", err);
    return sendResponse(res, 500, null, false, "Internal server error.");
  }
});

export default router;
