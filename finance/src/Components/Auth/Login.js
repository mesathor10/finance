import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification.js";

// import NavBar from "../NavBar.js";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const login = () => {
  //   // Your login logic here
  //   setIsLoggedIn(!isLoggedIn);
  // };
  function chng() {
    let a = document.getElementById("form2");
    if (a.type === "password") {
      a.type = "text";
    } else {
      a.type = "password";
    }
  }

  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8000/auth/login", { Email, Password })
      .then((res) => {
        console.log(res.data.msg);

        if (res.data.msg === "password_incorrect") {
          alert("Check your password");
        } else if (res.data.msg === "please_signup") {
          alert("Go to signup");
        } else {
          alert("Successfully Logged In");
          Notification(res.data.msg._id);
          nav("/");
        }
      })
      .catch((err) => console.log("error", err));
  }

  return (
    <div
      className="bg-dark d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form
        className="w-50 text-center p-3 rounded-4 text-dark bg-light"
        onSubmit={handleSubmit}
      >
        <div className="fs-3 fw-bold text-decoration-underline text-center my-4">
          Login
        </div>
        <div data-mdb-input-init className="form-outline mb-4 ">
          <input
            type="email"
            id="form2Example1"
            className="form-control bg-secondary text-light"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email..."
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4 ">
          <input
            type="password"
            id="form2"
            className="form-control bg-secondary text-light"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
        </div>

        <div className="mb-4">
          <input type="checkbox" onClick={chng} name="" id="sp" />
          <label className="ms-1">show password</label>
        </div>

        <div className="row mb-4 ">
          <div className="col">
            <Link className="text-decoration-underline" to={"/forgot"}>
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-primary btn-block mb-4 "
        >
          Sign in
        </button>

        <div className="text-center ">
          <p>
            Not a member?{" "}
            <Link className="text-decoration-underline" to={"/signup"}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
