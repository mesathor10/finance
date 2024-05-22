import { expModel } from "../model/finModel.js";
import authModel from "../model/authModel.js";
import { UserId } from "./authController.js";

const ExpData = async (req, res) => {
  const { Name, Amount, Category, ExpDate } = req.body;
  try {
    // const userId = UserId.replace(/"/g, "");
    const user = await authModel.findById(UserId);
    console.log(user);
    if (user) {
      const income = new expModel({
        User: UserId,
        Name,
        Amount,
        Category,
        ExpDate,
      });
      await income.save();
      res.json({ msg: "added" });
    }
  } catch (err) {
    res.json({ msg: "error" });
    console.log(err);
  }
};

// let GotExpData = null;
const ExpGet = async (req, res) => {
  try {
    const userData = await expModel.find({ User: UserId });
    // GotExpData = userData;
    // console.log(GotExpData);
    res.json({ msg: userData });
  } catch (err) {
    res.json({ msg: "not_got" });
  }
};

const ExpUpt = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const userData = await expModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.json({ msg: "updated" });
    console.log(userData);
  } catch (err) {
    res.json({ msg: "got_error" });
  }
};

const ExpDel = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await expModel.findByIdAndDelete(id);
    res.json(userData);
  } catch (err) {
    res.json({ msg: "get_error" });
  }
};

export { ExpData, ExpGet, ExpUpt, ExpDel };
