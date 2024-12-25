//? Import required modules and libraries
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { signupSchema, loginSchema } from "../validation/schemas.js";
import sendResponse from "../helpers/sendResponse.js";
import { userModel } from "../models/user.js";

//? Create a new router instance
const router = express.Router();

//? Route for user signup
router.post("/signup", async (req, res) => {
  try {
    //* Validate the request data using Joi schema
    const { error, value } = signupSchema.validate(req.body);

    //* If validation fails, return an error response
    if (error) return sendResponse(res, 400, null, false, error.message);

    //* Check if the user already exists in database
    const user = await userModel.findOne({ email: value.email });

    //* If user already exists in database, return an error response
    if (user)
      return sendResponse(
        res,
        403,
        null,
        false,
        "User with this email already exists."
      );

    //* Hash the password before saving to the database using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value.password, saltRounds);
    value.password = hashedPassword;

    //* Save the new user to the database
    let newUser = new userModel({ ...value });
    newUser = await newUser.save();

    //* Return success response with new-user data
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

//? Route for user login
router.post("/login", async (req, res) => {
  try {
    //* Validate the request data using Joi schema
    const { value, error } = loginSchema.validate(req.body);

    //* If validation fails, return an error response
    if (error) return sendResponse(res, 400, null, false, error.message);

    //* Find the user in database by email
    const user = await userModel.findOne({ email: value.email }).lean();

    //* If user doesnot exist in database, return an error response
    if (!user)
      return sendResponse(
        res,
        404,
        null,
        false,
        "No user found with this email."
      );

    //* Check if the password is correct using bcrypt
    const isPasswordCorrect = await bcrypt.compare(
      value.password,
      user.password
    );

    //* If the password doesnot match, return an error response
    if (!isPasswordCorrect)
      return sendResponse(res, 403, null, false, "Invalid credentials.");

    //* Generate a JWT Token
    var token = jwt.sign(user, process.env.AUTH_SECRET);

    //* Return success response with the user data and the JWT token
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
