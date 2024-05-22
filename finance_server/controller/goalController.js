import { goalModel } from "../model/finModel.js";
import authModel from "../model/authModel.js";
import { UserId } from "./authController.js";

const GoalData = async (req, res) => {
  const { Name, TargAmount, CurrAmount, DueDate } = req.body;
  try {
    // const userId = UserId.replace(/"/g, "");
    const user = await authModel.findById(UserId);
    console.log(user);
    if (user) {
      const income = new goalModel({
        User: UserId,
        Name,
        TargAmount,
        CurrAmount,
        DueDate,
      });
      await income.save();
      res.json({ msg: "added" });
    }
  } catch (err) {
    res.json({ msg: "error" });
    console.log(err);
  }
};

// let GotGoalData = null;
const GoalGet = async (req, res) => {
  try {
    const userData = await goalModel.find({ User: UserId });
    res.json({ msg: userData });
  } catch (err) {
    res.json({ msg: "not_got" });
  }
};

const GoalUpt = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const userData = await goalModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.json({ msg: "updated" });
    console.log(userData);
  } catch (err) {
    res.json({ msg: "got_error" });
  }
};

const GoalDel = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await goalModel.findByIdAndDelete(id);
    res.json(userData);
  } catch (err) {
    res.json({ msg: "get_error" });
  }
};

export { GoalData, GoalGet, GoalUpt, GoalDel };
