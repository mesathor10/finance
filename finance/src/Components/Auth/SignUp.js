import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Password, setPassword] = useState("");

  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:8000/auth/signup", {
          Name: Name,
          Email: Email,
          Mobile: Mobile,
          Password: Password,
        })
        .then((res) => {
          console.log(res.data.msg);
          if (res.data.msg === "added") {
            alert("signed up");
            nav("/login");
          } else if (res.data.msg === "exist") {
            alert(Email + " : Already Exist");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              required
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              onChange={(e) => setName(e.target.value)}
                            />
                            <label className="form-label">Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              required
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label">Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              required
                              type="number"
                              id="form3Example4c"
                              className="form-control"
                              onChange={(e) => setMobile(e.target.value)}
                            />
                            <label className="form-label">Mobile</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              required
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="form-label">Password</label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                            required
                          />
                          <label className="form-check-label">
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                        <div className="text-center fs-5 text-decoration-underline">
                          <Link to="/login">Go to Login</Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
