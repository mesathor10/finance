import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Income from "./Income";
import Budget from "./Budget";
import Expense from "./Expense";
import Goals from "./Goals";

function Finance() {
  return (
    <div className="container-fluid mb-5">
      <div className="row justify-content-center align-items-center px-3">
        <div className=" position-fixed bottom-0 w-75 p-2 z-3">
          <div className="bg-primary rounded-4 w-100">
            <ul className="nav2 h-100 p-1 m-0 d-flex  text-center justify-content-evenly align-items-center fs-5">
              <li>
                <Link to={"/finance/income"}>Income</Link>
              </li>
              <li>
                <Link to={"/finance/expense"}>Expenses</Link>
              </li>
              <li className="text-center">
                <Link to={"/"}>
                  <i className="bi bi-house-fill text-light fs-1"></i>
                </Link>
              </li>
              <li>
                <Link to={"/finance/budget"}>Budgets</Link>
              </li>
              <li>
                <Link to={"/finance/goals"}>Goals</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 row justify-content-center px-4 mb-5">
          <Routes>
            <Route path="income" element={<Income />} />
            <Route path="budget" element={<Budget />} />
            <Route path="expense" element={<Expense />} />
            <Route path="goals" element={<Goals />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Finance;

// <div className="col-6 p-2">
//             <div className="bg-light rounded-4">
//               <Line
//                 data={{
//                   labels: sourceData2.map((data) => data.label),
//                   datasets: [
//                     {
//                       label: "Revenue",
//                       data: sourceData2.map((data) => data.amt),
//                       backgroundColor: ["red", "blue", "green", "yellow"],
//                       borderColor: "red",
//                     },
//                     {
//                       label: "Ads",
//                       data: sourceData2.map((data) => data.tot),
//                       backgroundColor: ["red", "blue", "green", "yellow"],
//                       borderColor: "blue",
//                     },
//                   ],
//                 }}
//                 options={{
//                   elements: {
//                     line: {
//                       tension: 0.5,
//                     },
//                   },
//                   plugins: {
//                     title: {
//                       text: "Line Revenue",
//                     },
//                   },
//                 }}
//               />
//             </div>
//           </div>
