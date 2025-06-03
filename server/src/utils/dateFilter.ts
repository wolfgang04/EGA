import { Op, WhereOptions } from "sequelize";

export const setRange = (dateType: string, date: string): WhereOptions => {
  let baseDate: Date, endDate: Date;
  if (typeof date === "string") {
    baseDate = new Date(date);
  } else baseDate = new Date();

  baseDate.setHours(0, 0, 0, 0);
  endDate = new Date(baseDate);
  endDate.setHours(23, 59, 59, 999);
  let where = {};

  if (dateType === "date") {
    where = { changed_at: { [Op.between]: [baseDate, endDate] } };
  } else if (dateType === "week") {
    endDate.setDate(endDate.getDate() + 5);
    where = { changed_at: { [Op.between]: [baseDate, endDate] } };
  } else if (dateType === "month") {
    baseDate.setDate(1);
    baseDate.setDate(baseDate.getDate() + 1); // starts at the first day of the month

    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    where = { changed_at: { [Op.between]: [baseDate, endDate] } };
  } else if (dateType === "year") {
    baseDate.setMonth(0);
    baseDate.setDate(1);
    baseDate.setDate(baseDate.getDate() + 1);

    endDate.setFullYear(endDate.getFullYear() + 1);
    endDate.setMonth(0);
    endDate.setDate(0);
    where = { changed_at: { [Op.between]: [baseDate, endDate] } };
  } else if (date === undefined) {
    where = {};
  }

  return where;
};
