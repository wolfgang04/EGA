import { Request, Response } from "express";
import { Profile, User } from "../models/sequelize";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants";
import { validatePasswordInput } from "../utils/input";
import { CreateAccountRequestBody } from "../models/Request.model";
import { issue } from "../utils/auth";

export const createAccount = async (
  req: Request<{}, {}, CreateAccountRequestBody>,
  res: Response
): Promise<any> => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    address,
    contact,
    userType,
    birthday,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !address ||
    !birthday ||
    !contact ||
    !userType
  ) {
    return res.status(400).json({ msg: "all fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash("mypassword", SALT_ROUNDS);

    const user = await User.create({
      password: hashedPassword,
      userType: req.user.accType,
      created_by: Number(req.user.userId),
    });

    await Profile.create({
      name: {
        first: firstName,
        middle: middleName,
        last: lastName,
      },
      email,
      contact,
      address,
      birthday,
      userID: user.id,
    });

    return res.status(200).json({
      msg: `account created successfully! username is ${user.public_id}`,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in signup:", err);
      return res.status(500).json({ msg: "error creating user" });
    } else {
      console.error("Unknown error occured");
      return res.status(500).json({ msg: "unknown error occured" });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const user = await User.findOne({ where: { public_id: username } });
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user!.password);

    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = issue({ userId: user.id, accType: user.userType });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    console.log(token, req.user);

    return res
      .status(200)
      .json({ msg: "Logged in successfully!", accType: user.userType });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error logging in:", err);
      return res.status(500).json({ msg: "Error logging in" });
    } else {
      console.error("Unknown error occured");
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};

export const logout = async (_req: Request, res: Response): Promise<any> => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "Logged out successfully" });
};

export const resetDefaultPass = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { password, confirmPassword } = req.body;

  const validationError = validatePasswordInput(password, confirmPassword);
  if (validationError) {
    return res.status(500).json({ msg: validationError });
  }

  try {
    const hashedPassword = await bcrypt.hash(password.trim(), SALT_ROUNDS);

    const user = await User.findOne({
      where: { id: req.user.userId },
    });
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.password = hashedPassword;
    await user!.save();

    return res.status(200).json({ msg: "Password successfully changed" });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error changing password:", err);
      return res.status(500).json({ msg: "Error changing password" });
    } else {
      console.error("Unknown error occured");
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};

export const authCheck = (req: Request, res: Response): Promise<any> => {
  console.log(req.user);

  return new Promise((resolve) => {
    if (!req.user) {
      resolve(res.status(401).json({ msg: "Unauthorized" }));
    } else {
      resolve(res.status(200).json({ accType: req.user.accType }));
    }
  });
};
