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
import { literal, Op, QueryTypes } from "sequelize";

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
  const { page = 1 } = req.query;
  const limit = 10;

  try {
    const requests = await RequestHistory.findAndCountAll({
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

    const numOfPages = requests.count / 10 + 1;
    return res.status(200).json({ numOfPages, rows: requests.rows });
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
  const { requestID, status } = req.body;

  try {
    const reqq = await request.findByPk(requestID);
    if (!reqq)
      return res.status(400).json({ msg: "Request history not found" });

    await RequestHistory.create({
      status,
      changedBy: req.session.userID!,
      requestID: reqq.id,
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
      attributes: ["request_by", "id"],
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
          order: [["changedAt", "DESC"]],
          separate: true,
        },
        {
          model: Profile,
          as: "requestByProfile",
          attributes: ["name"],
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
    const results = await sequelize.query(
      `
      SELECT h.request_id, h.status, h.changed_at
        FROM request_status_history h
      INNER JOIN (
        SELECT request_id, MAX(changed_at) AS latest_change
        FROM request_status_history
        GROUP BY request_id
      ) AS latest
        ON h.request_id = latest.request_id AND h.changed_at = latest.latest_change
      INNER JOIN request r
        ON h.request_id = r.id
      WHERE h.status NOT IN ('returned', 'denied')
        AND r.request_by = :user
      ORDER BY h.changed_at DESC;
    `,
      {
        type: QueryTypes.SELECT,
        replacements: { user },
      }
    );

    return res.status(200).json(results);
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

export const prevRequests = async (
  req: Request,
  res: Response
): Promise<any> => {
  const user = Number(req.session.userID);

  try {
    const userChanges = await RequestHistory.findAll({
      attributes: ["requestID", "status", "changedAt"],
      where: {
        status: { [Op.in]: ["returned", "denied"] },
      },
      order: [["changed_at", "DESC"]],
      include: [
        {
          model: request,
          as: "request",
          attributes: ["id"],
          where: {
            requestBy: user,
          },
        },
      ],
    });

    const userPrev = userChanges.map((item) => ({
      changed_at: item.changedAt,
      status: item.status,
      request_id: item.requestID,
    }));

    return res.status(200).json(userPrev);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching previous requests:", error);
      return res.status(500).json({ msg: "Error fetching previous requests" });
    } else {
      console.error("Unknown error occured:", error);
      return res.status(500).json({ msg: "Unknown error occured" });
    }
  }
};
