import React, { useReducer, useEffect } from "react";
import { defaults } from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { Bar, Line, Radar } from "react-chartjs-2";
import { AddInc } from "../DataForms/Add";
import { UptInc } from "../DataForms/Update";
import axios from "axios";

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

function Income() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchInc = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/income/get");
      const data = res.data.msg;
      dispatch({ type: "SET_DATAS", payload: data });
      console.log(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  function getTotalAmountByMonth(data, source) {
    const primaryData = data.filter((item) => item.Source === source);

    const mappedData = primaryData.reduce((acc, item) => {
      const date = new Date(item.IncDate);
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
    const source = data.Source;
    const amount = data.Amount;

    if (totals[source]) {
      totals[source] += amount;
    } else {
      totals[source] = amount;
    }

    return totals;
  }, {});

  const aggregatedData1 = Object.entries(sourceTotals).map(
    ([source, total]) => ({ Source: source, Amount: total })
  );

  const handleDataUpload = () => {
    fetchInc();
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

  const delInc = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/user/income/delete/${id}`
      );
      console.log(res.data.msg);
      dispatch({
        type: "SET_DATAS",
        payload: state.datas.filter((item) => item._id !== id),
      });
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  useEffect(() => {
    fetchInc();
    dispatch({
      type: "SET_CHG_GRAPH",
      payload: getTotalAmountByMonth(state.datas, "primary"),
    });
  }, [state.datas]);

  return (
    <React.Fragment>
      {state.visible1 ? <AddInc onDataLoad={handleDataUpload} /> : ""}
      {state.visible2 ? (
        <UptInc onDataLoad={[handleDataUpload, state.filData]} />
      ) : (
        ""
      )}
      <div className="fs-2 fw-semibold my-4 fst-italic text-decoration-underline text-center">
        Income
      </div>
      <div className="col-12 l1 bg-light rounded-4 p-4">
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
                      payload: getTotalAmountByMonth(state.datas, "primary"),
                    })
                  }
                >
                  Primary
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "secondary"),
                    })
                  }
                >
                  Secondary
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "investment"),
                    })
                  }
                >
                  Investment
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "business"),
                    })
                  }
                >
                  Business
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "retirement"),
                    })
                  }
                >
                  Retirement
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "gifts"),
                    })
                  }
                >
                  Gifts
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "royalties"),
                    })
                  }
                >
                  Royalties
                </li>
                <li
                  onClick={() =>
                    dispatch({
                      type: "SET_CHG_GRAPH",
                      payload: getTotalAmountByMonth(state.datas, "other"),
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
                    label: "Total Revenue",
                    data: Object.values(state.chgGraph),
                    fill: false,
                    borderColor: "red",
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Income by Month",
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
                    text: "Income by Month",
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
          <div className="d-flex bg-secondary rounded-3 position-sticky top-0 justify-content-between align-items-center">
            <div className="ms-3 fs-5 fw-bold">Income Data</div>
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
                <th>Amount</th>
                <th>Source</th>
                <th>Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {state.datas.map((e, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{e.Name}</td>
                  <td>{e.Amount}</td>
                  <td>{e.Source}</td>
                  <td>{e.IncDate.substring(0, 10)}</td>
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
                      onClick={() => delInc(e._id)}
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
                  aggregatedData1.map((data) => data.Source.toLowerCase())
                ),
              ],
              datasets: [
                {
                  label: "Income",
                  data: aggregatedData1.map((data) => data.Amount),
                  backgroundColor: ["red", "blue", "green", "yellow"],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Income by Source",
                },
              },
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Income;
