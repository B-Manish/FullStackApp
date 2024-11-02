import React, { createContext, useState } from "react";
import UserPool from "../UserPool";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser(); // tells whether user exists or not
      if (user) {
        // console.log("user", user);
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        // reject();
      }
    });
  };

  const logOut = () => {
    const user = UserPool.getCurrentUser(); // tells whether user exists or not
    if (user) {
      user.signOut(); // cognito's logout function
      setIsLoggedIn(false);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        username,
        getSession,
        logOut,
        setIsLoggedIn,
        setUsername,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
