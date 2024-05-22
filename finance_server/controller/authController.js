import authModel from "../model/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const SignUp = async (req, res) => {
  const { Name, Email, Password } = req.body;
  try {
    const user = await authModel.findOne({ Email });
    console.log(user);

    if (user) {
      res.json({ msg: "exist" });
    } else {
      const hashPassword = await bcrypt.hash(Password, 10);
      const userData = new authModel({
        Name,
        Email,
        Password: hashPassword,
        Crt_Date: new Date(),
      });
      await userData.save();
      res.json({ msg: "added" });
    }
  } catch (err) {
    res.json({ msg: "error" });
  }
};

let UserId = null;

const Login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await authModel.findOne({ Email });
    if (!user) {
      res.json({ msg: "please_signup" });
    } else {
      const valid = await bcrypt.compare(Password, user.Password);
      UserId = user._id.toString();
      console.log(UserId);
      if (!valid) {
        res.json({ msg: "password_incorrect" });
      } else {
        res.json({ msg: user });
      }
    }
  } catch (err) {
    res.json({ msg: "error" });
    console.log(err);
  }
};

const ForgotPassword = async (req, res) => {
  const { Email } = req.body;
  try {
    const user = await authModel.findOne({ Email });
    if (!user) {
      return res.json({ msg: "user not exist" });
    }
    const token = jwt.sign({ id: user._id }, "secretkey", {
      expiresIn: "3m",
    });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true, // true for 587, false for other ports
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: "sathishkumar4118@gmail.com",
        pass: "qexh cegz kusg xmob",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    let mailOptions = {
      from: "sathishkumar4118@gmail.com",
      to: Email,
      subject: "Reset Password",
      text: `http://localhost:3000/reset/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({ msg: "mail not sent" });
      } else {
        res.json({ status: true, msg: "mail sent" });
      }
    });
  } catch (e) {
    console.log("forgot password error");
  }
};

const ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { Password } = req.body;

  try {
    const verified = jwt.verify(token, "secretkey");
    const id = verified.id;
    console.log(id);
    const hashPassword = await bcrypt.hash(Password, 10);
    await userModel.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    res.json({ status: true, msg: "password updated" });
    alert("updated");
  } catch (err) {
    res.json({ msg: "invalid token" });
  }
};

// Logout
const Logout = async (req, res) => {
  UserId = null;
  res.clearCookie("token");
  res.json({ status: true, msg: "cleared" });
};

const FindUserData = async (req, res) => {
  const userId = req.params;
  try {
    const user = await authModel.find({ _id: userId.id });
    // res.json({ msg: userId.id });
    if (!user) {
      res.json({ msg: "user does not exist" });
    } else {
      res.json({ msg: user });
    }
  } catch (err) {
    console.log(err);
  }
};

const Notfi = async (req, res) => {
  const DueDate = req.query.DueDate;
  const User = req.query.User;
  const Email = req.query.Email;

  // const { Email, DueDate, User } = req.body;
  try {
    const user = await authModel.findOne({ Email });
    console.log(user);
    if (!user) {
      return res.json({ msg: "User does not exist" });
    }

    const today = new Date().toDateString();
    // const dueDates = DueDate.forEach((e) => e.toDateString());
    console.log(today);

    if (DueDate.includes(today)) {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sathishkumar4118@gmail.com",
          pass: "qexh cegz kusg xmob",
        },
      });

      let mailOptions = {
        from: "sathishkumar4118@gmail.com",
        to: Email,
        subject: "Alert Notification",
        text: `Hi ${User},\n\nHope you are making good progress in life.\nYour time for completing the task is closing up! Please hurry and finish your job.`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.json({ status: false, msg: "Mail not sent" });
        } else {
          return res.json({ status: true, msg: "Mail sent" });
        }
      });
    } else {
      return res.json({ msg: "No due date matches today" });
    }
  } catch (error) {
    console.log("Notification error:", error);
    return res.json({ msg: "An error occurred while sending notification" });
  }
};

export {
  Login,
  SignUp,
  ForgotPassword,
  ResetPassword,
  Logout,
  Notfi,
  FindUserData,
  UserId,
};
