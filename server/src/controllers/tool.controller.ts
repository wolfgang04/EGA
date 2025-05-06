import { Request, Response } from "express";
import { CreateToolRequestBody } from "../models/Request.model";
import { Tool } from "../models/sequelize";

export const createTool = async (
  req: Request<{}, {}, CreateToolRequestBody>,
  res: Response
): Promise<any> => {
  const { name, location, quantity = 1, categoryID } = req.body;

  if (!name) return res.status(400).json({ msg: "Name required" });

  try {
    await Tool.create({
      name: name.trim(),
      location: location.trim(),
      quantity: Number(quantity),
      categoryID: Number(categoryID),
    });

    console.log("Tool successfully created");
    return res.status(200).json({ msg: "Tool successfully created" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured while creating tool:", error);
      return res.status(500).json({ msg: "Error occured while creating tool" });
    } else {
      console.error("Unknown error occured:", error);
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};

export const getCategoryTools = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { categoryID } = req.query;

  try {
    const tools = await Tool.findAll({ where: { categoryID } });

    return res.status(200).json(tools);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured while fetching tools:", error);
      return res
        .status(500)
        .json({ msg: "Error occured while fetching tools" });
    } else {
      console.error("Unknown error occured:", error);
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};

export const getTools = async (_req: Request, res: Response): Promise<any> => {
  try {
    const tools = await Tool.findAll({
      attributes: ["name", "id"],
    });

    return res.status(200).json(tools);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured while fetching tools:", error);
      return res
        .status(500)
        .json({ msg: "Error occured while fetching tools" });
    } else {
      console.error("Unknown error occured:", error);
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};
