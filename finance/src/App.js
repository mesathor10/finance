import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Auth/SignUp";
import Login from "./Components/Auth/Login";
import Resetpass from "./Components/Auth/ResetPass";
import ForgetPass from "./Components/Auth/ForgotPass";
import NavBar from "./Components/NavBar";
import Finance from "./Components/Finance/Finance";
import Income from "./Components/Finance/Income";
import Goals from "./Components/Finance/Goals";
import Expense from "./Components/Finance/Expense";
import Budget from "./Components/Finance/Budget";
import Logout from "./Components/Auth/Logout";
import LogInfoProvider from "./Components/Auth/LogInfoContext.js";

function App() {
  return (
    <LogInfoProvider>
      <div className="App w-100 text-light">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/finance/*" element={<Finance />}>
              <Route path="income" element={<Income />} />

              <Route path="budget" element={<Budget />} />
              <Route path="expense" element={<Expense />} />
              <Route path="goals" element={<Goals />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<ForgetPass />} />
            <Route path="/reset/:token" element={<Resetpass />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LogInfoProvider>
  );
}

export default App;
