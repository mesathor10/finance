import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth/LogInfoContext";

function HomeP5() {
  const { isLoggedIn } = useAuth();

  return (
    <div id="contact" className="bg-dark text-light">
      <div className="container p-5">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-5 col-12">
            <HashLink to={"/#home"}>
              <h1 className="fw-bold lh-lg">.FinMan</h1>
            </HashLink>
            <p>
              No:B2, velayuthum street, keelkattalai, Chennai - 117
              <br />
              Ph.no: 7806906149
            </p>
          </div>
          <div className="col-md-3 col-6">
            <ul className="lh-lg fs-5">
              <li>
                <HashLink to={"/#home"}>
                  <i className="bi bi-house-door-fill"></i> Home
                </HashLink>
              </li>
              <li>
                <Link to={isLoggedIn ? "/finance/income" : "/login"}>
                  <i className="bi bi-bank"></i> Finance
                </Link>
              </li>
              <li>
                <HashLink to={"/#about"}>
                  <i className="bi bi-file-person"></i> About Us
                </HashLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-6">
            <h5>Socail Media</h5>
            <ul className="lh-lg p-0 m-0 fs-5">
              <a href="https://api.whatsapp.com/send?phone=15551234567">
                <li>
                  <i className="bi bi-whatsapp text-success"></i> Whatsapp
                </li>
              </a>
              <a href="https://www.instagram.com/sath_ish10/">
                <li>
                  <i className="bi bi-instagram text-danger"></i> Instagram
                </li>
              </a>
              <a href="https://twitter.com/Sathish87323647">
                <li>
                  <i className="bi bi-twitter-x text-secondary"></i> Twitter
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeP5;
