import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { signupSchema, loginSchema } from "../validation/schemas.js";
import sendResponse from "../helpers/sendResponse.js";
import { userModel } from "../models/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    if (error) return sendResponse(res, 400, null, false, error.message);

    const user = await userModel.findOne({ email: value.email });

    if (user)
      return sendResponse(
        res,
        403,
        null,
        false,
        "User with this email already exists."
      );

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value.password, saltRounds);
    value.password = hashedPassword;

    let newUser = new userModel({ ...value });
    newUser = await newUser.save();

    return sendResponse(
      res,
      201,
      newUser,
      true,
      "User registered successfully."
    );
  } catch (err) {
    return sendResponse(
      res,
      500,
      null,
      false,
      `Internal server error => ${err.message}`
    );
  }
});

router.post("/login", async (req, res) => {
  try {
    const { value, error } = loginSchema.validate(req.body);

    if (error) return sendResponse(res, 400, null, false, error.message);

    const user = await userModel.findOne({ email: value.email }).lean();

    if (!user)
      return sendResponse(
        res,
        404,
        null,
        false,
        "No user found with this email."
      );

    const isPasswordCorrect = await bcrypt.compare(
      value.password,
      user.password
    );

    if (!isPasswordCorrect)
      return sendResponse(res, 403, null, false, "Invalid credentials.");

    var token = jwt.sign(user, process.env.AUTH_SECRET);
    return sendResponse(
      res,
      200,
      { user, token },
      true,
      "User logged in successfully."
    );
  } catch (err) {
    console.log(err);

    return sendResponse(
      res,
      500,
      null,
      false,
      `Internal server error => ${err.message}`
    );
  }
});

export default router;
