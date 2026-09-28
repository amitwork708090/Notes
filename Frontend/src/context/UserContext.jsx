import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);

  const handleCurrentUser = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      console.log(result.data);
      setUserData(result.data);
    } catch (error) {
        console.log(error);
    }
  };

  const value = {
    serverUrl,
    userData,
    setUserData,
    handleCurrentUser,
  };

   useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
