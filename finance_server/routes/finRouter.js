import express from "express";
import {
  IncData,
  IncGet,
  IncUpt,
  IncDel,
} from "../controller/incController.js";

import {
  ExpData,
  ExpGet,
  ExpUpt,
  ExpDel,
} from "../controller/expController.js";

import {
  GoalData,
  GoalGet,
  GoalUpt,
  GoalDel,
} from "../controller/goalController.js";

import {
  BugData,
  BugGet,
  BugUpt,
  BugDel,
} from "../controller/bugController.js";
// import { UserId } from "../controller/authController.js";
// import { authenticateToken } from "../controller/authController.js";

const finRouter = express.Router();

finRouter.route(`/income`).post(IncData);
finRouter.route(`/income/get`).get(IncGet);
finRouter.route(`/income/update/:id`).post(IncUpt);
finRouter.route(`/income/delete/:id`).delete(IncDel);

finRouter.route(`/expense`).post(ExpData);
finRouter.route(`/expense/get`).get(ExpGet);
finRouter.route(`/expense/update/:id`).post(ExpUpt);
finRouter.route(`/budget/delete/:id`).delete(ExpDel);

finRouter.route(`/goal`).post(GoalData);
finRouter.route(`/goal/get`).get(GoalGet);
finRouter.route(`/goal/update/:id`).post(GoalUpt);
finRouter.route(`/budget/delete/:id`).delete(GoalDel);

finRouter.route(`/budget`).post(BugData);
finRouter.route(`/budget/get`).get(BugGet);
finRouter.route(`/budget/update/:id`).post(BugUpt);
finRouter.route(`/budget/delete/:id`).delete(BugDel);

export default finRouter;
