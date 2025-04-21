import { sequelize } from "../../utils/db";
import Profile from "./profile";
import Request from "./request";
import RequestHistory from "./requestStatusHistory";
import RequestTool from "./requestTool";
import Tool from "./tool";
import User from "./user";

User.hasOne(User, {
  as: "creator",
  foreignKey: "created_by",
});
User.hasMany(User, {
  as: "createdUsers",
  foreignKey: "created_by",
});

Profile.hasOne(User, {
  as: "userProfile",
  foreignKey: "userID",
});

Request.belongsToMany(Tool, {
  through: RequestTool,
  as: "tools",
  foreignKey: "requestID",
});
Tool.belongsToMany(Request, {
  through: RequestTool,
  as: "requests",
  foreignKey: "toolID",
});

RequestHistory.belongsTo(Request, {
  as: "request",
  foreignKey: "requestID",
});
RequestHistory.belongsTo(Profile, {
  as: "setBy",
  foreignKey: "changed_by",
});

export { sequelize, Profile, User, Request, RequestHistory, RequestTool, Tool };
