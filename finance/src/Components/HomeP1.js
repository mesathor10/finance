import React from "react";

function HomeP1() {
  return (
    <div id="home" className="container-fluid">
      <div className="home1 row justify-content-center align-items-center">
        <div className="d-none d-md-block col-6 p-0">
          <img src="./photos/money.gif" className="w-100" alt="" />
        </div>
        <div className="col-12 col-md-6 p-0 my-5 text-center">
          <div className="p-5 fst-italic">
            <h1 style={{ textShadow: "3px 3px 5px black" }}>
              Your Personal Finance Manager
            </h1>
            <p style={{ textShadow: "3px 3px 5px black" }}>
              Money can evoke a range of difficult emotions for many of us. This
              anxiety only grows when we’re living through economically fragile
              times or don’t come from wealth. It can feel awkward,
              uncomfortable, and even scary to navigate these feelings when they
              show up. But know that it’s still possible to make smart decisions
              that will help you become financially stable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeP1;
