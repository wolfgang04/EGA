import { Request, Response } from "express";
import {
  ChangeRequestStatus,
  CreateRequestToolBody,
} from "../models/Request.model";
import {
  Profile,
  Request as request,
  RequestHistory,
  RequestTool,
  sequelize,
  Tool,
} from "../models/sequelize";
import Category from "../models/sequelize/category";
import { Op } from "sequelize";

export const requestTools = async (
  req: Request<{}, {}, CreateRequestToolBody>,
  res: Response
): Promise<any> => {
  const { tools } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const generateReq = await request.create(
      { requestBy: req.session.userID! },
      { transaction }
    );

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

export const getRequestUpdates = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const requests = await RequestHistory.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      attributes: ["request_id", "status", "changed_by", "changed_at"],
      order: [["changed_at", "DESC"]],
      include: [
        {
          model: request,
          as: "request",
          attributes: ["public_id"],
          include: [
            {
              model: Profile,
              as: "requestByProfile",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Profile,
          as: "changedByProfile",
          attributes: ["name"],
        },
      ],
    });

    return res.status(200).json(requests);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching requests:", error);
      return res.status(500).json({ msg: "Error fetching requests" });
    } else {
      console.error("Unknown error occured:", error);
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};

export const changeRequestStatus = async (
  req: Request<{}, {}, ChangeRequestStatus>,
  res: Response
): Promise<any> => {
  const { requestHistoryID, status } = req.body;

  try {
    const requestHistory = await RequestHistory.findByPk(requestHistoryID);
    if (!requestHistory)
      return res.status(400).json({ msg: "Request history not found" });

    await RequestHistory.create({
      status,
      changedBy: req.session.userID!,
      requestID: requestHistory.requestID,
    });

    return res.status(200).json({ msg: "Request status successfully changed" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error changing request status:", error);
      return res.status(500).json({ msg: "Error changing request status" });
    } else {
      console.error("Unknown error occured:", error);
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};

export const requestOverview = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { requestID } = req.query;

  if (!requestID || Array.isArray(requestID) || isNaN(Number(requestID)))
    return res.status(400).json({ msg: "Invalid or missing requestID" });

  try {
    const requestDetails = await request.findOne({
      where: { id: Number(requestID) },
      include: [
        {
          model: RequestTool,
          as: "requestFiled",
          attributes: ["quantity", "note"],
          include: [
            {
              model: Tool,
              as: "requestedTool",
              attributes: ["name", "location", "categoryID", "publicID"],
              include: [
                {
                  model: Category,
                  as: "categoryTool",
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
        {
          model: RequestHistory,
          as: "statuses",
          attributes: ["status", "changedAt"],
          include: [
            {
              model: Profile,
              as: "changedByProfile",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    return res.status(200).json(requestDetails);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching request details:", error);
      return res.status(500).json({ msg: "Error fetching request details" });
    } else {
      console.error("Unknown error occured:", error);
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};

export const getUserOngoingRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  const user = Number(req.session.userID);

  try {
    const userLatest = await RequestHistory.findAll({
      attributes: [
        "id",
        "status",
        "changed_at",
        [sequelize.fn("MIN", sequelize.col("changed_at")), "lastChangedAt"],
      ],
      where: {
        id: user,
        status: { [Op.not]: "returned" },
      },
      group: ["id"],
      order: [["changed_at", "DESC"]],
    });

    return res.status(200).json(userLatest);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user latest request:", error);
      return res
        .status(500)
        .json({ msg: "Error fetching user latest request" });
    } else {
      console.error("Unknown error occured:", error);
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};
