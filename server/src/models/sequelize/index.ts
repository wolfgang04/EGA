import { sequelize } from "../../utils/db";
import Category from "./category";
import Profile from "./profile";
import Request from "./request";
import RequestHistory from "./requestStatusHistory";
import RequestTool from "./requestTool";
import Tool from "./tool";
import User from "./user";

// user - profile association
User.belongsTo(User, {
  as: "creator",
  foreignKey: "created_by",
});
User.hasMany(User, {
  as: "createdUsers",
  foreignKey: "created_by",
});
User.hasOne(Profile, {
  as: "userProfile",
  foreignKey: "userID",
});
Profile.belongsTo(User, {
  as: "userProfile",
  foreignKey: "userID",
});

// tool - category association
Tool.belongsTo(Category, {
  as: "categoryTool",
  foreignKey: "categoryID",
});

// request - tool association
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

// request - requestHistory association
Request.hasMany(RequestHistory, {
  as: "statuses",
  foreignKey: "requestID",
});
RequestHistory.belongsTo(Request, {
  as: "request",
  foreignKey: "requestID",
});

// request - requestTool association
Request.hasMany(RequestTool, {
  as: "requestFiled",
  foreignKey: "requestID",
});
RequestTool.belongsTo(Tool, {
  as: "requestedTool",
  foreignKey: "toolID",
});

// requestHistory - profile association
RequestHistory.belongsTo(Profile, {
  as: "changedByProfile",
  foreignKey: "changed_by",
});
Profile.hasMany(RequestHistory, {
  as: "requestHistories",
  foreignKey: "changed_by",
});

Request.belongsTo(Profile, {
  as: "requestByProfile",
  foreignKey: "requestBy",
});

export { sequelize, Profile, User, Request, RequestHistory, RequestTool, Tool };
