// LogInfoContext.js
import { createContext, useState, useContext } from "react";

const LogInfoContext = createContext();

const LogInfoProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <LogInfoContext.Provider value={{ isLoggedIn, toggleLogin }}>
      {children}
    </LogInfoContext.Provider>
  );
};

export default LogInfoProvider;

export const useAuth = () => useContext(LogInfoContext);
