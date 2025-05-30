import { Request, Response } from "express";
import Category from "../models/sequelize/category";
import { sequelize } from "../utils/db";
import { QueryTypes } from "sequelize";

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

export const categoriesOverview = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    // get total distinct tools, total # of tools, and total available per category
    const categories = await sequelize.query(
      `
      SELECT
        c.id,
        c.name AS category_name,
        COUNT(t.id) AS total_tools,
        SUM(t.quantity) AS total_quantity,
        SUM(t.quantity - COALESCE(used.total_requested, 0)) AS total_available
      FROM category c
      LEFT JOIN tool t ON c.id = t.category_id
      LEFT JOIN (
        SELECT
          rt.tool_id,
          SUM(rt.quantity) AS total_requested
        FROM request_tool rt
        INNER JOIN (
          SELECT DISTINCT ON (request_id)
            request_id,
            status
          FROM
            request_status_history rsh
          ORDER BY
            request_id, changed_at DESC
        ) rsh ON rt.request_id = rsh.request_id
        WHERE rsh.status IN ('approved', 'borrowed')
        GROUP BY rt.tool_id
      ) AS used ON used.tool_id = t.id
      GROUP BY
        c.id, c.name;
      `,
      { type: QueryTypes.SELECT }
    );

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
