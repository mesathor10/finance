import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "./Auth/LogInfoContext";

function NavBar() {
  const { isLoggedIn, toggleLogin } = useAuth();

  return (
    <nav className="navbar text-light sticky-top">
      <div className="container-fluid p-1">
        <Link className="fs-3 fw-bold ms-4" to={"/"}>
          .FinMan
        </Link>
        <ul className=" m-0 p-0 d-lg-flex d-none">
          <li className="nav-item mx-2 px-3 py-2 rounded-3">
            <HashLink to={"/#home"}>Home</HashLink>
          </li>
          <li className="nav-item mx-2 px-3 py-2 rounded-3">
            <Link
              onClick={toggleLogin}
              to={isLoggedIn ? "/finance/income" : "/login"}
            >
              Finance
            </Link>
          </li>
          <li className="nav-item mx-2 px-3 py-2 rounded-3">
            <HashLink to={"/#benefits"}>Benefits</HashLink>
          </li>
          <li className="nav-item mx-2 px-3 py-2 rounded-3">
            <HashLink to={"/#about"}>About Us</HashLink>
          </li>
          <li className="nav-item mx-2 px-3 py-2 rounded-3">
            <HashLink to={"/#contact"}>Contact</HashLink>
          </li>
        </ul>
        <button
          className="navbar-toggler bg-light d-block d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list fs-3"></i>
        </button>
        <div className="d-none d-lg-block">
          <Link to={isLoggedIn ? "/logout" : "/login"}>
            <div className="btn btn-primary mx-1" onClick={toggleLogin}>
              {isLoggedIn ? "Log Out" : "Log In"}
            </div>
          </Link>

          <Link to={"/signup"}>
            <div className="btn btn-primary mx-1">SignUp</div>
          </Link>
        </div>
        <div
          className="offcanvas d-lg-none offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              FinMan
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body text-dark">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item mx-2 px-3 py-2 rounded-3">
                <HashLink className="text-dark" to={"/#home"}>
                  Home
                </HashLink>
              </li>
              <li className="nav-item mx-2 px-3 py-2 rounded-3">
                <Link className="text-dark" to={"/finance/income"}>
                  Finance
                </Link>
              </li>
              <li className="nav-item mx-2 px-3 py-2 rounded-3">
                <HashLink className="text-dark" to={"/#benefits"}>
                  Benefits
                </HashLink>
              </li>
              <li className="nav-item mx-2 px-3 py-2 rounded-3">
                <HashLink className="text-dark" to={"/#about"}>
                  About Us
                </HashLink>
              </li>
              <li className="nav-item mx-2 px-3 py-2 rounded-3">
                <HashLink className="text-dark" to={"/#contact"}>
                  Contact
                </HashLink>
              </li>
            </ul>
            <div className="ms-3">
              <Link to={"/signup"}>
                <div className="btn btn-primary mx-1">Sign Up</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
