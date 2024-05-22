import React, { useReducer, useEffect } from "react";
import { defaults } from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { Bar, Line, Radar } from "react-chartjs-2";
import axios from "axios";
import { AddBug } from "../DataForms/Add";
import { UptBug } from "../DataForms/Update";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const initialState = {
  visible1: false,
  visible2: false,
  datas: [],
  filData: null,
  chgGraph: {},
  chgView: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_VISIBLE1":
      return { ...state, visible1: action.payload };
    case "SET_VISIBLE2":
      return { ...state, visible2: action.payload };
    case "SET_DATAS":
      return { ...state, datas: action.payload };
    case "SET_FIL_DATA":
      return { ...state, filData: action.payload };
    case "SET_CHG_GRAPH":
      return { ...state, chgGraph: action.payload };
    case "SET_CHG_VIEW":
      return { ...state, chgView: action.payload };
    default:
      throw new Error();
  }
}

function Budget() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchBug();
    dispatch({
      type: "SET_CHG_GRAPH",
      payload: getTotalAmountByMonth(state.datas, "transportation"),
    });
  }, [state.datas]);

  const fetchBug = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/budget/get");
      const data = res.data.msg;
      dispatch({ type: "SET_DATAS", payload: data });
      console.log(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  function getTotalAmountByMonth(data, category) {
    const primaryData = data.filter((item) => item.Category === category);

    const mappedData = primaryData.reduce((acc, item) => {
      const date = new Date(item.EndDate);
      const year = date.getFullYear();
      const month =
        date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const yearMonth = `${year}-${month}-${day}`;
      if (!acc[yearMonth]) acc[yearMonth] = 0;
      acc[yearMonth] += item.Amount;
      return acc;
    }, {});

    const sortedKeys = Object.keys(mappedData).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const sortedObj = {};
    sortedKeys.forEach((key) => (sortedObj[key] = mappedData[key]));
    return sortedObj;
  }

  const sourceTotals = state.datas.reduce((totals, data) => {
    const category = data.Category;
    const amount = data.Amount;

    if (totals[category]) {
      totals[category] += amount;
    } else {
      totals[category] = amount;
    }

    return totals;
  }, {});

  const aggregatedData1 = Object.entries(sourceTotals).map(
    ([category, total]) => ({ Category: category, Amount: total })
  );

  const handleDataUpload = () => {
    fetchBug();
  };

  const updateData = (id) => {
    const filtered = state.datas.filter((e) => e._id === id);
    dispatch({ type: "SET_FIL_DATA", payload: filtered });
    console.log(filtered);
  };

  const change1 = () => {
    dispatch({ type: "SET_VISIBLE1", payload: !state.visible1 });
  };

  const change2 = () => {
    dispatch({ type: "SET_VISIBLE2", payload: !state.visible2 });
  };

  const delBug = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/user/budget/delete/${id}`
      );
      console.log(res.data);
      dispatch({
        type: "SET_DATAS",
        payload: state.datas.filter((item) => item._id !== id),
      });
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  return (
    <React.Fragment>
      {state.visible1 && <AddBug onDataLoad={handleDataUpload} />}
      {state.visible2 && (
        <UptBug onDataLoad={[handleDataUpload, state.filData]} />
      )}
      <div className="fs-2 fw-semibold my-4 fst-italic text-decoration-underline text-center">
        Budget
      </div>
      <div className="col-12 l1 bg-light rounded-4 p-3">
        <div className="position-relative">
          <div className="plus text-dark d-flex">
            <div className="dropdown">
              <i
                className="bi bi-calendar2 fs-5 rounded-3 btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <ul className="dropdown-menu p-2">
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "utilities"),
                    })
                  }
                >
                  Utilities
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "food"),
                    })
                  }
                >
                  Food
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(
                        state.datas,
                        "transportation"
                      ),
                    })
                  }
                >
                  Transportation
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "education"),
                    })
                  }
                >
                  Education
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "healthcare"),
                    })
                  }
                >
                  Healthcare
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "insurance"),
                    })
                  }
                >
                  Insurance
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "dept"),
                    })
                  }
                >
                  Dept
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "savings"),
                    })
                  }
                >
                  Savings
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(
                        state.datas,
                        "entertainment"
                      ),
                    })
                  }
                >
                  Entertainment
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "clothing"),
                    })
                  }
                >
                  Clothing
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "housing"),
                    })
                  }
                >
                  Housing
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "others"),
                    })
                  }
                >
                  Others
                </li>
              </ul>
            </div>
            <i
              onClick={() =>
                dispatch({ type: "SET_CHG_VIEW", payload: !state.chgView })
              }
              className="bi bi-eye-fill fs-3 mx-1 rounded-3 py-1 px-2"
            ></i>
            <i
              className="bi bi-plus-square-fill fs-3 mx-1 rounded-3 px-2 py-1"
              onClick={change1}
            ></i>
          </div>
          {state.chgView ? (
            <Line
              className="w-100"
              style={{ height: "80vh" }}
              data={{
                labels: Object.keys(state.chgGraph),
                datasets: [
                  {
                    label: "Revenue",
                    data: Object.values(state.chgGraph),
                    backgroundColor: "yellow",
                    borderColor: "red",
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Budget by Month",
                  },
                },
                scales: {
                  x: {
                    type: "time",
                    display: true,
                    min: new Date(Object.keys(state.chgGraph)[0]),
                    max: new Date(
                      Object.keys(state.chgGraph)[
                        Object.keys(state.chgGraph).length - 1
                      ]
                    ),
                    time: {
                      unit: "month",
                    },
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Total Amount",
                    },
                  },
                },
              }}
            />
          ) : (
            <Radar
              className="w-100"
              style={{ height: "80vh" }}
              data={{
                labels: Object.keys(state.chgGraph),
                datasets: [
                  {
                    label: "Revenue",
                    data: Object.values(state.chgGraph),
                    backgroundColor: "yellow",
                    borderColor: "red",
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Budget by Month",
                  },
                },
              }}
            />
          )}
        </div>
      </div>
      <div className="col-md-7 col-12 p-2">
        <div
          style={{ height: "60vh" }}
          className="s1 bg-light rounded-4 p-3 overflow-scroll"
        >
          <div className="d-flex bg-secondary rounded-3 position-sticky top-0 justify-content-between w-100 align-items-center">
            <div className="ms-3 fs-5 fw-bold">Budget Data</div>
            <i
              className="bi bi-plus-square-fill fs-3 me-4 rounded-3 px-2 py-1"
              onClick={change1}
            ></i>
          </div>
          <table className="w-100 table text-center text-dark">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Amount</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {state.datas.map((e, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{e.Category}</td>
                  <td>{e.Amount}</td>
                  <td>{e.StartDate.substring(0, 10)}</td>
                  <td>{e.EndDate.substring(0, 10)}</td>
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
                      onClick={() => delBug(e._id)}
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
              labels: aggregatedData1.map((data) => data.Category),
              datasets: [
                {
                  label: "Revenue",
                  data: aggregatedData1.map((data) => data.Amount),
                  backgroundColor: ["red", "blue", "green", "yellow"],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Budget by Source",
                  display: true,
                },
              },
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Budget;
