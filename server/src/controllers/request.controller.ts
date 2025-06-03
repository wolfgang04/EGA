import { Request, Response } from "express";
import {
  ChangeRequestStatus,
  CreateRequestToolBody,
  RequestToolInterface,
  ToolAvailability,
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
import { Op, QueryTypes } from "sequelize";
import { setRange } from "../utils/dateFilter";

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
  const {
    page = 1,
    filter = "",
    date,
    dateType = "",
    sort = "DESC",
  } = req.query;
  const limit = 10;
  const where = setRange(dateType as string, date as string);

  try {
    const requests = await RequestHistory.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      attributes: ["request_id", "status", "changed_by", "changed_at"],
      order: [["changed_at", sort as string]],
      where: { ...where },
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
              where: {
                [Op.or]: [
                  { "name.first": { [Op.iLike]: `%${filter}%` } },
                  { "name.middle": { [Op.iLike]: `%${filter}%` } },
                  { "name.last": { [Op.iLike]: `%${filter}%` } },
                ],
              },
            },
          ],
        },
        {
          model: Profile,
          as: "changedByProfile",
          attributes: ["name"],
          where: {
            [Op.or]: [
              { "name.first": { [Op.iLike]: `%${filter}%` } },
              { "name.middle": { [Op.iLike]: `%${filter}%` } },
              { "name.last": { [Op.iLike]: `%${filter}%` } },
            ],
          },
        },
      ],
    });

    return res.status(200).json({ count: requests.count, rows: requests.rows });
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

    if (status === "approved") {
      const toolsInRequest = await RequestTool.findAll({
        where: { requestID: reqq.id },
        attributes: ["toolID", "quantity"],
      });

      for (const tool of toolsInRequest as unknown as RequestToolInterface[]) {
        const toolID = tool.toolID;
        const quantity = tool.quantity;

        const [toolAvailability] = await sequelize.query<ToolAvailability>(
          `
          SELECT
            t.quantity AS total_quantity,
            COALESCE(t.quantity - SUM(
              CASE
                WHEN
                  latest_status.status IN ('approved', 'borrowed')
                THEN
                  rt.quantity
                ELSE
                  0
              END
            ), t.quantity) AS available_quantity
          FROM tool t
          LEFT JOIN request_tool rt ON t.id = rt.tool_id
          LEFT JOIN (
            SELECT DISTINCT ON (request_id)
              request_id, status
            FROM
              request_status_history
            ORDER BY
              request_id, changed_at DESC
          ) AS latest_status ON latest_status.request_id = rt.request_id
          WHERE
            t.id = :toolID
          GROUP BY
            t.quantity;
        `,
          {
            replacements: { toolID },
            type: QueryTypes.SELECT,
          }
        );

        if (
          !toolAvailability ||
          quantity > Number(toolAvailability.available_quantity)
        )
          return res.status(400).json({ msg: "Not enough available tools" });
      }
    }

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
  const { id } = req.params;

  if (!id || Array.isArray(id) || isNaN(Number(id)))
    return res.status(400).json({ msg: "Invalid or missing id" });

  try {
    const requestDetails = await request.findOne({
      where: { id: Number(id) },
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
    const userChanges = await RequestHistory.findAndCountAll({
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

    const userPrev = userChanges.rows.map((item) => ({
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
