import { Request, Response } from "express";
import { Profile, User } from "../models/sequelize";

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const users = await User.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      attributes: ["public_id", "userType", "created_by", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Profile,
          as: "userProfile",
          attributes: ["name", "email"],
        },
      ],
    });

    return res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching all users:", error);
      return res.status(500).json({ msg: "Error fetching all users" });
    } else {
      console.error("Unknown error occured");
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { public_id } = req.query;

  if (!public_id || typeof public_id !== "string")
    return res
      .status(400)
      .json({ msg: "public id is required and must be a string" });

  try {
    const user = await User.findOne({
      where: { public_id },
      include: [
        {
          model: Profile,
          as: "userProfile",
        },
      ],
    });

    if (user === null) return res.status(400).json({ msg: "Cannot find user" });

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ msg: "Error fetching user" });
    } else {
      console.error("Unknown error occured");
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};
