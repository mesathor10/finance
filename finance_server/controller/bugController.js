import { bugModel } from "../model/finModel.js";
import authModel from "../model/authModel.js";
import { UserId } from "./authController.js";

const BugData = async (req, res) => {
  const { Category, Amount, StartDate, EndDate } = req.body;
  try {
    const user = await authModel.findById(UserId);
    console.log(user);
    if (user) {
      const income = new bugModel({
        User: UserId,
        Category,
        Amount,
        StartDate,
        EndDate,
      });
      await income.save();
      res.json({ msg: "added" });
    }
  } catch (err) {
    res.json({ msg: "error" });
    console.log(err);
  }
};

const BugGet = async (req, res) => {
  try {
    const userData = await bugModel.find({ User: UserId });
    res.json({ msg: userData });
  } catch (err) {
    res.json({ msg: "not_got" });
  }
};

const BugUpt = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const userData = await bugModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.json({ msg: "updated" });
    console.log(userData);
  } catch (err) {
    res.json({ msg: "got_error" });
  }
};

const BugDel = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await bugModel.findByIdAndDelete(id);
    res.json(userData);
  } catch (err) {
    res.json({ msg: "get_error" });
  }
};

export { BugData, BugGet, BugUpt, BugDel };
