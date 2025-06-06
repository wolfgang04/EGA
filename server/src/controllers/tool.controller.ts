import { Request, Response } from "express";
import { CreateToolRequestBody } from "../models/Request.model";
import { sequelize, Tool } from "../models/sequelize";
import { QueryTypes } from "sequelize";

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
  const { id } = req.params;

  try {
    const tools = await sequelize.query(
      `
      SELECT
        t.*,
        SUM(t.quantity - COALESCE(used.total_requested, 0)) AS total_available,
        borrowers_info.borrowers
      FROM 
        tool t
      LEFT JOIN (
        SELECT
          tool_id,
          SUM(quantity) AS total_requested
        FROM 
          request_tool rt
        INNER JOIN (
          SELECT DISTINCT ON (request_id)
            request_id, status
          FROM 
            request_status_history rsh
          ORDER BY
            request_id, changed_at DESC
        ) rsh ON rsh.request_id = rt.request_id
        WHERE
          rsh.status IN ('approved', 'borrowed')
        GROUP BY
          rt.tool_id
      ) AS used ON used.tool_id = t.id
       LEFT JOIN (
        SELECT
          rt.tool_id,
          ARRAY_AGG(DISTINCT jsonb_build_object('name', p.name, 'request_id', r.id))
            FILTER (WHERE r.id IS NOT NULL) AS borrowers
        FROM
          request_tool rt
        INNER JOIN
          request r ON r.id = rt.request_id
        INNER JOIN
          profile p ON p.id = r.request_by
        INNER JOIN (
          SELECT DISTINCT ON (request_id)
            request_id, status
          FROM
            request_status_history rsh
          ORDER BY
            request_id, changed_at DESC
        ) latest_status ON latest_status.request_id = r.id
        WHERE
          latest_status.status IN ('approved', 'borrowed')
        GROUP BY
          rt.tool_id
      ) borrowers_info ON borrowers_info.tool_id = t.id
      WHERE
        t.category_id = :categoryID
      GROUP BY
        t.id, borrowers_info.borrowers;
      `,
      { replacements: { categoryID: id }, type: QueryTypes.SELECT }
    );

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
    const tools = await sequelize.query(
      `
      SELECT 
        t.id,
        t.name,
        t.quantity AS total_quantity,
        t.category_id,
        t.location,
        c.name AS category_name,
        COALESCE(t.quantity - SUM(CASE 
          WHEN 
            latest_status.status IN ('approved', 'borrowed') 
          THEN rt.quantity 
          ELSE 
            0 
          END
        ), t.quantity) AS available_quantity
      FROM tool t
      LEFT JOIN request_tool rt ON rt.tool_id = t.id
      LEFT JOIN (
        SELECT DISTINCT ON (request_id)
          request_id, status
        FROM request_status_history
        ORDER BY request_id, changed_at DESC
      ) latest_status ON latest_status.request_id = rt.request_id
      LEFT JOIN category c ON c.id = t.category_id
      GROUP BY t.id, t.name, t.quantity, t.location, t.category_id, c.name;
    `,
      { type: QueryTypes.SELECT }
    );

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

export const editTool = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { edit } = req.body;

  if (Object.keys(edit).length === 0)
    return res.status(400).json({ msg: "No valid fields to update" });

  try {
    await Tool.update(edit, { where: { id } });

    return res.status(200).json({ msg: "Tool updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured while editing tool:", error);
      return res.status(500).json({ msg: "Error occured while editing tool" });
    }
    console.error("Unknown error occured:", error);
    return res.status(500).json({ msg: "Unknown error occured" });
  }
};
