import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Logout() {
  axios.get("http://localhost:8000/auth/logout").then((res) => {
    console.log("logged out", res.data);
  });

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1 className="mt-4 text-center fst-italic  fw-bold">Logged Out</h1>
      <p className="fs-4 my-4">
        Go to{" "}
        <Link
          className="text-dark text-center text-decoration-underline"
          to="/login"
        >
          LogIn
        </Link>
      </p>
    </div>
  );
}

export default Logout;
