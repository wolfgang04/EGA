import { Request, Response } from "express";
import { CreateRequestToolBody } from "../models/Request.model";
import {
  Request as request,
  RequestHistory,
  RequestTool,
  sequelize,
} from "../models/sequelize";

export const requestTools = async (
  req: Request<{}, {}, CreateRequestToolBody>,
  res: Response
): Promise<any> => {
  const { tools } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const generateReq = await request.create({}, { transaction });

    for (const tool of tools) {
      await RequestTool.create(
        {
          quantity: tool.quantity,
          note: tool.note,
          toolID: tool.toolID,
          requestID: generateReq.id,
        },
        { transaction }
      );
    }

    await RequestHistory.create(
      {
        changedBy: req.session.userID!,
        requestID: generateReq.id,
      },
      { transaction }
    );

    await transaction.commit();

    return res.status(200).json({ msg: "Request successfully created" });
  } catch (error) {
    await transaction.rollback();
    if (error instanceof Error) {
      console.error("Error creating request:", error);
      return res.status(500).json({ msg: "Error creating request" });
    } else {
      console.error("Unknown error occured:", error);
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};
