import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  

  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:8081/api/user/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // console.log(response.data);
          if (response.data.success) {
            setUser(response.data.user);
          }

        } else {

          setUser(null);
        }

      } catch (error) {
        // console.log(error);

        if (error.response.data.error === "Token not valid") {

          localStorage.removeItem("token");
          setUser(null);
          navigate("/login");
          
        }
      } 
    };
    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;  
