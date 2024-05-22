import { incModel } from "../model/finModel.js";
import authModel from "../model/authModel.js";
import { UserId } from "./authController.js";

const IncData = async (req, res) => {
  const { Name, Amount, Source, IncDate } = req.body;
  try {
    const user = await authModel.findById(UserId);
    console.log(user);
    if (user) {
      const income = new incModel({
        User: UserId,
        Name,
        Amount,
        Source,
        IncDate,
      });
      await income.save();
      res.json({ msg: "added" });
    }
  } catch (err) {
    res.json({ msg: "error" });
    console.log(err);
  }
};

const IncGet = async (req, res) => {
  try {
    const userData = await incModel.find({ User: UserId });
    res.json({ msg: userData });
  } catch (err) {
    res.json({ msg: "not_got" });
  }
};

const IncUpt = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const userData = await incModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.json({ msg: "updated" });
    console.log(userData);
  } catch (err) {
    res.json({ msg: "got_error" });
  }
};

const IncDel = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await incModel.findByIdAndDelete(id);
    res.json(userData);
  } catch (err) {
    res.json({ msg: "get_error" });
  }
};

export { IncData, IncGet, IncUpt, IncDel };
