import React, { useState } from "react";
import axios from "axios";

function AddInc({ onDataLoad }) {
  const [visible, setVisible] = useState(false);

  const [Name, setName] = useState();
  const [Amount, setAmount] = useState();
  const [Source, setSource] = useState();
  const [IncDate, setIncDate] = useState();

  const change = () => {
    return setVisible(!visible);
  };

  const AddIncData = (e) => {
    e.preventDefault();
    axios
      .post("https://finance-8ze7.onrender.com/user/income", {
        Name,
        Amount,
        Source,
        IncDate,
      })
      .then((res) => {
        console.log(res);
        if (res.status) {
          // alert("Your Data has been added");
          onDataLoad();
          change();
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <div
      className="container add p-0 m-0 row justify-content-center align-items-center"
      style={{ display: visible ? "none" : "" }}
    >
      <div className="col-6 bg-dark rounded-4">
        <form
          method="post"
          style={{ height: "80%", width: "100%" }}
          className="p-4  text-light"
          onSubmit={AddIncData}
        >
          <div className="row justify-content-center align-items-center">
            <div className="fs-3 fw-bold fst-italic text-center col-11 text-decoration-underline">
              Add Income
            </div>
            <div className="col-1">
              <i className="bi bi-x-circle-fill fs-4" onClick={change}></i>
            </div>
            <div className="col-12 mt-4">
              <label className="d-flex align-items-center my-1">
                <h5>Name: </h5>
                <input
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Amount: </h5>
                <input
                  required
                  type="number"
                  onChange={(e) => setAmount(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Source: </h5>
                <select
                  name=""
                  id=""
                  required
                  onChange={(e) => setSource(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                >
                  <option disabled selected value="">
                    --Select--
                  </option>
                  <option value="Primary">Primary Income</option>
                  <option value="Secondary">Secondary Income</option>
                  <option value="Investment ">Investment Income</option>
                  <option value="Business">Business Income</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Gifts">Gifts or Inheritance</option>
                  <option value="Royalties">Royalties</option>
                  <option value="Other">Other Income</option>
                </select>
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Date: </h5>
                <input
                  required
                  type="date"
                  onChange={(e) => setIncDate(e.target.value)}
                  className="p-2 rounded-3 ms-2"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-25 my-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddBug({ onDataLoad }) {
  const [visible, setVisible] = useState(false);

  const [Category, setCategory] = useState();
  const [Amount, setAmount] = useState();
  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();

  const change = () => {
    return setVisible(!visible);
  };
  const AddBugData = (e) => {
    e.preventDefault();
    axios
      .post("https://finance-8ze7.onrender.com/user/budget", {
        Category,
        Amount,
        StartDate,
        EndDate,
      })
      .then((res) => {
        console.log(res);
        if (res.status) {
          onDataLoad();
          change();
        } else {
          alert("Something went wrong");
        }
      });
  };
  return (
    <div
      className="container add p-0 m-0 row justify-content-center align-items-center"
      style={{ display: visible ? "none" : "" }}
    >
      <div className="col-6 bg-dark rounded-4">
        <form
          method="post"
          style={{ height: "80%", width: "100%" }}
          className="p-4  text-light"
          onSubmit={AddBugData}
        >
          <div className="row justify-content-center align-items-center">
            <div className="fs-3 fw-bold fst-italic text-center col-11 text-decoration-underline">
              Add Budget
            </div>
            <div className="col-1">
              <i class="bi bi-x-circle-fill fs-4" onClick={change}></i>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Category: </h5>
                <select
                  name=""
                  id=""
                  onChange={(e) => setCategory(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                >
                  <option disabled selected value="">
                    --Select--
                  </option>
                  <option value="Housing">Housing</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Food">Food</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Debt">Debt Payments</option>
                  <option value="Savings">Savings</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Education">Education</option>
                  <option value="Others">Others</option>
                </select>
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Budget Amount: </h5>
                <input
                  type="number"
                  onChange={(e) => setAmount(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <div className="col-6">
              <label className="d-flex align-items-center my-1">
                <h5>Start Date: </h5>{" "}
                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <div className="col-6">
              <label className="d-flex align-items-center my-1">
                <h5>End Date: </h5>
                <input
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                  className="p-2 rounded-3 ms-2"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-25 my-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function AddExp({ onDataLoad }) {
  const [visible, setVisible] = useState(false);
  const [Name, setName] = useState();
  const [Amount, setAmount] = useState();
  const [Category, setCategory] = useState();
  const [ExpDate, setExpDate] = useState();

  const change = () => {
    return setVisible(!visible);
  };
  const AddExpData = (e) => {
    e.preventDefault();
    axios
      .post("https://finance-8ze7.onrender.com/user/expense", {
        Name,
        Amount,
        Category,
        ExpDate,
      })
      .then((res) => {
        console.log(res);
        if (res.status) {
          onDataLoad();
          change();
        } else {
          alert("Something went wrong");
        }
      });
  };
  return (
    <div
      className="container add p-0 m-0 row justify-content-center align-items-center"
      style={{ display: visible ? "none" : "" }}
    >
      <div className="col-6 bg-dark rounded-4">
        <form
          method="post"
          onSubmit={AddExpData}
          style={{ height: "80%", width: "100%" }}
          className="p-4  text-light"
        >
          <div className="row justify-content-center align-items-center">
            <div className="fs-3 fw-bold fst-italic text-center col-11 text-decoration-underline">
              Add Expenses
            </div>
            <div className="col-1">
              <i class="bi bi-x-circle-fill fs-4" onClick={change}></i>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Name: </h5>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Amount: </h5>
                <input
                  type="number"
                  onChange={(e) => setAmount(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Category: </h5>{" "}
                <select
                  name=""
                  id=""
                  onChange={(e) => setCategory(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                >
                  <option disabled selected value="">
                    --Select--
                  </option>
                  <option value="Utilities">Utilities</option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Debt">Debt Payments</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Others">Others</option>
                </select>
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Date: </h5>{" "}
                <input
                  type="date"
                  onChange={(e) => setExpDate(e.target.value)}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-25 my-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function AddGoal({ onDataLoad }) {
  const [visible, setVisible] = useState(false);

  const [Name, setName] = useState();
  const [TargAmount, setTargAmount] = useState();
  const [CurrAmount, setCurrAmount] = useState();
  const [DueDate, setDueDate] = useState();

  const change = () => {
    return setVisible(!visible);
  };
  const AddGoalData = (e) => {
    e.preventDefault();
    axios
      .post("https://finance-8ze7.onrender.com/user/goal", {
        Name,
        TargAmount,
        CurrAmount,
        DueDate,
      })
      .then((res) => {
        console.log(res);
        if (res.status) {
          onDataLoad();
          change();
        } else {
          alert("Something went wrong");
        }
      });
  };
  return (
    <div
      className="container add p-0 m-0 row justify-content-center align-items-center"
      style={{ display: visible ? "none" : "" }}
    >
      <div className="col-6 bg-dark rounded-4">
        <form
          method="post"
          onSubmit={AddGoalData}
          style={{ height: "80%", width: "100%" }}
          className="p-4  text-light"
        >
          <div className="row justify-content-center align-items-center">
            <div className="fs-3 fw-bold fst-italic text-center col-11 text-decoration-underline">
              Add Goals
            </div>
            <div className="col-1">
              <i class="bi bi-x-circle-fill fs-4" onClick={change}></i>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Name: </h5>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Target Amount: </h5>
                <input
                  type="number"
                  onChange={(e) => setTargAmount(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Current Amount: </h5>{" "}
                <input
                  type="number"
                  onChange={(e) => setCurrAmount(e.target.value.toLowerCase())}
                  className="p-2 rounded-3 w-100 ms-2"
                />
              </label>
            </div>
            <div className="col-12">
              <label className="d-flex align-items-center my-1">
                <h5>Due Date:</h5>
                <input
                  type="date"
                  onChange={(e) => setDueDate(e.target.value)}
                  className="p-2 rounded-3 ms-2"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-25 my-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { AddInc, AddBug, AddGoal, AddExp };
