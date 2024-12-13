import React, { createContext, useState, useEffect } from "react";
import { userPool } from "../aws-cognito";
import { jwtDecode } from "jwt-decode";
export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartRestaurant, setCartRestaurant] = useState("");
  const [updateCount, setUpdateCount] = useState(false);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInMessage, setSignInMessage] = useState("");
  const userPoolId = "17shnbmh639c0vhp8j591437j7";
  const [selectedAddress, setSelectedAddress] = useState({});

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

      if (userEmail) {
        setEmail(userEmail);
        setIsLoggedIn(true);
      }
      if (userName) setUsername(userName);
    } else {
      console.log("not logged in");
    }
  };

  const lastAuthUserKey = `CognitoIdentityServiceProvider.${userPoolId}.LastAuthUser`;
  const accessTokenKey = `CognitoIdentityServiceProvider.${userPoolId}.manish.accessToken`;

  useEffect(() => {
    // Check if the JWT token exists in localStorage to set the sign-in state
    const lastAuthUser = localStorage.getItem(lastAuthUserKey);
    const accessToken = localStorage.getItem(accessTokenKey);

    if (lastAuthUser && accessToken) {
      setSignInMessage("You are already signed in!");
    }
  }, []);

  const handleSignOut = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
      setSignInMessage("You have successfully signed out.");
      setSignInError("");
      setUsername("");

      // Remove all related keys from localStorage
      localStorage.removeItem(lastAuthUserKey);
      localStorage.removeItem(accessTokenKey);
      localStorage.removeItem(
        `CognitoIdentityServiceProvider.${userPoolId}.manish.idToken`
      );
      localStorage.removeItem(
        `CognitoIdentityServiceProvider.${userPoolId}.manish.refreshToken`
      );
      localStorage.removeItem(
        `CognitoIdentityServiceProvider.${userPoolId}.manish.clockDrift`
      );
      setIsLoggedIn(false);
    } else {
      setSignInError("No active user session found.");
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
        signInError,
        setSignInError,
        signInMessage,
        setSignInMessage,
        handleSignOut,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
