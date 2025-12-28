import React, { useState, useEffect } from "react";
import { defaults } from "chart.js/auto";
import { Bar, Pie, Radar } from "react-chartjs-2";
import axios from "axios";
// import cron from "node-cron";
import { AddGoal } from "../DataForms/Add";
import { UptGoal } from "../DataForms/Update";
// import Notification from "../Auth/Notification";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Goals() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [datas, setDatas] = useState([]);
  const [filData, setFilData] = useState();
  const [chgView, setChgView] = useState(true);

  useEffect(() => {
    fetchGoal();
  }, []);

  const fetchGoal = async () => {
    await axios
      .get("https://finance-8ze7.onrender.com/user/goal/get")
      .then((res) => {
        const data = res.data.msg;
        console.log(data);
        setDatas(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
      });
  };

  function getTotalAmountByMonth(data, source) {
    const primaryData = data.filter((item) => item.Source === source);

    const mappedData = primaryData.reduce((acc, item) => {
      const date = new Date(item.DueDate);
      const year = date.getFullYear();
      const month =
        date.getMonth() < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const yearMonth = year + "-" + month + "-" + day;
      if (!acc[yearMonth]) {
        acc[yearMonth] = 0;
      }
      acc[yearMonth] += item.CurrAmount;
      return acc;
    }, {});

    const sortedKeys = Object.keys(mappedData).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const sortedObj = {};

    sortedKeys.forEach((key) => {
      sortedObj[key] = mappedData[key];
    });
    return sortedObj;
  }

  console.log(getTotalAmountByMonth);

  // Create an object to store the sum of amounts for each unique source
  const sourceTotals = datas.reduce((totals, data) => {
    const name = data.Name;
    const amount = data.CurrAmount;

    if (totals[name]) {
      totals[name] += amount;
    } else {
      totals[name] = amount;
    }
    return totals;
  }, {});

  const aggregatedData1 = Object.entries(sourceTotals).map(([name, total]) => ({
    Name: name,
    Amount: total,
  }));
  console.log(aggregatedData1);

  const handleDataUpload = () => {
    fetchGoal();
  };

  const updateData = (id) => {
    const filtered = datas.filter((e) => e._id === id);
    setFilData(filtered);
    console.log(filtered);
  };

  const change1 = () => {
    return setVisible1(!visible1);
  };

  const change2 = () => {
    return setVisible2(!visible2);
  };

  const delGoal = (id) => {
    axios.delete(`https://finance-8ze7.onrender.com/user/goal/delete/${id}`).then((res) => {
      console.log(res.data.msg);
      setDatas((prevDatas) => prevDatas.filter((item) => item._id !== id));
    });
  };

  // cron.schedule("0 0 * * *", async () => {
  //   // This will run the function every day at midnight (00:00)
  //   await
  // });

  return (
    <React.Fragment>
      {visible1 ? <AddGoal onDataLoad={handleDataUpload} /> : ""}
      {visible2 ? <UptGoal onDataLoad={[handleDataUpload, filData]} /> : ""}
      <div className="fs-2 fw-semibold my-4 fst-italic text-decoration-underline text-center">
        Goals
      </div>
      <div className="col-12 l1 bg-light rounded-4 p-3">
        <div className="position-relative">
          <div className="plus text-dark d-flex">
            <i
              onClick={() => setChgView(!chgView)}
              className="bi bi-eye-fill fs-3 mx-1 rounded-3 py-1 px-2"
            ></i>
            <i
              className="bi bi-plus-square-fill fs-3 mx-1 rounded-3 px-2 py-1"
              onClick={change1}
            ></i>
          </div>
          {chgView ? (
            <Radar
              className="w-100"
              style={{ height: "80vh" }}
              data={{
                labels: [
                  ...new Set(
                    aggregatedData1.map((data) => data.Name.toLowerCase())
                  ),
                ],
                datasets: [
                  {
                    label: "Revenue",
                    data: aggregatedData1.map((data) => data.Amount),
                    backgroundColor: "rgba(38, 38, 250, 0.521)",
                    borderColor: "red",
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Goal by Current Amount",
                  },
                },
              }}
            />
          ) : (
            <Pie
              className="w-100"
              style={{ height: "80vh" }}
              data={{
                labels: [
                  ...new Set(
                    aggregatedData1.map((data) => data.Name.toLowerCase())
                  ),
                ],
                datasets: [
                  {
                    label: "Revenue",
                    data: aggregatedData1.map((data) => data.Amount),
                    backgroundColor: [
                      "red",
                      "blue",
                      "green",
                      "yellow",
                      "pink",
                      "grey ",
                    ],
                    borderColor: "rgba(237, 65, 65, 0.505)",
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Goal by Current Amount",
                  },
                },
              }}
            />
          )}
        </div>
      </div>
      <div className="col-md-7 col-12 p-2 ">
        <div
          style={{ height: "60vh" }}
          className="s1 bg-light rounded-4 p-3 overflow-scroll"
        >
          <div className="d-flex bg-secondary rounded-3 w-100 position-sticky top-0 justify-content-between align-items-center">
            <div className="ms-3 fs-5 fw-bold">Goals Data</div>
            <i
              className="bi bi-plus-square-fill fs-3 me-4 rounded-3 px-2 py-1"
              onClick={change1}
            ></i>
          </div>
          <table className="w-100 table text-center text-dark">
            <thead>
              <tr className=" w-100">
                <th>S.no</th>
                <th>Name</th>
                <th>TargAmount</th>
                <th>CurrAmount</th>
                <th>DueDate</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((e, id) => (
                <tr key={id} className="">
                  <td>{id + 1}</td>
                  <td>{e.Name}</td>
                  <td>{e.TargAmount}</td>
                  <td>{e.CurrAmount}</td>
                  <td>{e.DueDate.substring(0, 10)}</td>
                  <td className="py-1">
                    <div
                      className="btn btn-success"
                      onClick={() => {
                        change2();
                        updateData(e._id);
                      }}
                    >
                      Update
                    </div>
                  </td>
                  <td className="py-1">
                    <div
                      className="btn btn-danger"
                      onClick={() => delGoal(e._id)}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-5 col-12 p-2">
        <div style={{ height: "60vh" }} className="s2 bg-light rounded-4 p-3">
          <Bar
            data={{
              labels: [
                ...new Set(
                  aggregatedData1.map((data) => data.Name.toLowerCase())
                ),
              ],
              datasets: [
                {
                  label: "Goals",
                  data: aggregatedData1.map((data) => data.Amount),
                  backgroundColor: ["red", "blue", "green", "yellow"],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Bar Revenue",
                },
              },
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Goals;
