import jwt from "jsonwebtoken";
import "dotenv/config";
import sendResponse from "../helpers/sendResponse.js";
import { userModel } from "../models/user.js";

export async function authenticateUser(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken.split(" ")[1];

    if (!token)
      return sendResponse(res, 403, null, false, "Token not provided.");

    const decodedData = jwt.verify(token, process.env.AUTH_SECRET);
    console.log("Decoded data from jwt ======>>>>>>", decodedData);

    if (!decodedData)
      return sendResponse(res, 404, null, false, "Error in token decoding.");

    const user = await userModel.findById(decodedData._id);
    if (!user) return sendResponse(res, 404, null, false, "User not found.");

    req.user = decodedData;
    next();
  } catch (err) {
    console.log("Internal server error ======>>>>>>", err);
    return sendResponse(res, 500, null, false, "Internal server error.");
  }
}
