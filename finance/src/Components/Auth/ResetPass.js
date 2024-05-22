import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Resetpass() {
  const nav = useNavigate();
  const { token } = useParams();

  const [Password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/auth/reset/" + token, { Password })
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            nav("/");
          }
          console.log(res.data);
        });
    } catch (e) {
      console.log("nnn", e);
    }
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="d-flex justify-content-center"
            id="exampleInputEmail1"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Resetpass;
