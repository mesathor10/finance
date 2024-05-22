import axios from "axios";

async function Notification(userId) {
  let userName;
  let Email;
  let DueDate = [];
  try {
    // Fetch user data

    await axios
      .get(`http://localhost:8000/auth/userdata/${userId}`)
      .then((res) => {
        const datas = res.data.msg;
        userName = datas[0].Name;
        Email = datas[0].Email;
      });
    console.log(userId, "not run");
    console.log("b", userName, Email);

    await axios.get("http://localhost:8000/user/goal/get").then((res) => {
      console.log("a", res);
      const datas = res.data.msg;
      console.log(datas);
      DueDate.push(...datas.map((e) => new Date(e.DueDate).toDateString()));
    });

    console.log(DueDate);

    const budgetsResponse = await axios.get(
      "http://localhost:8000/user/budget/get"
    );
    const budgetsData = budgetsResponse.data.msg;
    DueDate.push(...budgetsData.map((e) => new Date(e.EndDate).toDateString()));

    // Construct the URL with query parameters
    const url = `http://localhost:8000/auth/notifi?DueDate=${encodeURIComponent(
      JSON.stringify(DueDate)
    )}&User=${encodeURIComponent(userName)}&Email=${encodeURIComponent(Email)}`;

    // Send a request to the backend
    const notificationResponse = await axios.post(url);
    console.log(notificationResponse.data);
    console.log("Mail Sent");
  } catch (err) {
    console.error("Notification error:", err);
    alert("An error occurred while sending notification");
  }
}

export default Notification;
