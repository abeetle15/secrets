/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import verifyToken from "../services/verifyToken.js";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userIntent, setUserIntent] = useState("login");

  useEffect(() => {
    async function initializeAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await verifyToken(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          console.log(error);
        }
      }
      setIsLoading(false);
    }
    initializeAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        userIntent,
        setUserIntent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
