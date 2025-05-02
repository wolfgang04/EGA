import { Request, Response } from "express";
import Category from "../models/sequelize/category";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, description, image } = req.body;

  if (!name.trim())
    return res.status(400).json({ msg: "Category name missing" });

  try {
    await Category.create({
      name,
      description,
      image,
    });

    console.log("Category successfully created");
    return res.status(200).json({ msg: "Categoy successfully created" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating tool category:", error);
      return res.status(500).json({ msg: "Error creating tool category" });
    } else {
      console.error("Unknown error occured");
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};

export const getCategories = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ msg: "Error fetching categories" });
    } else {
      console.error("Unknown error occured");
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};
