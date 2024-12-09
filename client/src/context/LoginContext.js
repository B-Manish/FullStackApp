import React, { createContext, useState } from "react";
// import UserPool from "../UserPool";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartRestaurant, setCartRestaurant] = useState("");
  const [updateCount, setUpdateCount] = useState(false);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const userPoolId = "17shnbmh639c0vhp8j591437j7";

  const defaultCartData = {
    billdetails: {
      deliveryfee: 0,
      gst: 0,
      haspremium: false,
      platformfee: 0,
      total: 0,
      item_total: 0,
    },
    branch: "branch",
    items: [],
    items_count: 0,
    restaurant_id: "",
    restaurant_name: "",
    username: "gg",
  };
  const [cartData, setCartData] = useState(() => {
    const storedCartData = localStorage.getItem("cartData");
    return storedCartData ? JSON.parse(storedCartData) : defaultCartData;
  });

  const getSession = async () => {
    // return await new Promise((resolve, reject) => {
    //   const user = UserPool.getCurrentUser(); // tells whether user exists or not
    //   if (user) {
    //     // console.log("user", user);
    //     user.getSession((err, session) => {
    //       if (err) {
    //         reject();
    //       } else {
    //         resolve(session);
    //       }
    //     });
    //   } else {
    //     // reject();
    //   }
    // });
  };

  const logOut = () => {
    // const user = UserPool.getCurrentUser(); // tells whether user exists or not
    // if (user) {
    //   user.signOut(); // cognito's logout function
    //   setIsLoggedIn(false);
    // }
  };

  const idTokenKey = `CognitoIdentityServiceProvider.${userPoolId}.manish.idToken`;

  const extractUserInfoFromToken = () => {
    const idToken = localStorage.getItem(idTokenKey);
    if (idToken) {
      const decodedToken = jwtDecode(idToken);
      const userEmail = decodedToken?.email;
      const userName = decodedToken?.["cognito:username"];

      if (userEmail) setEmail(userEmail);
      if (userName) setUsername(userName);
    } else {
      console.log("not logged in");
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
        // cartCount,
        // setCartCount,
        cartData,
        setCartData,
        cartRestaurant,
        setCartRestaurant,
        updateCount,
        setUpdateCount,
        openDialogBox,
        setOpenDialogBox,
        email,
        setEmail,
        extractUserInfoFromToken,
        userPoolId,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
