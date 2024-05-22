import mongoose from "mongoose";

const incSchema = mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: "authentications" },
  Name: String,
  Amount: Number,
  Source: String,
  IncDate: Date,
});
const incModel = mongoose.model("income", incSchema);

const expSchema = mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: "authentications" },
  Name: String,
  Amount: Number,
  Category: String,
  ExpDate: Date,
});
const expModel = mongoose.model("expense", expSchema);

const goalSchema = mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: "authentications" },
  Name: String,
  TargAmount: Number,
  CurrAmount: Number,
  DueDate: Date,
});
const goalModel = mongoose.model("goal", goalSchema);

const bugSchema = mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: "authentications" },
  Category: String,
  Amount: Number,
  StartDate: Date,
  EndDate: Date,
});
const bugModel = mongoose.model("budget", bugSchema);

export { incModel, expModel, goalModel, bugModel };
