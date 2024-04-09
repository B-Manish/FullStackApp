import { Routes, Route } from "react-router-dom";
import Home from "./containers/home";
import Template from "./containers/template";
import RestaurantDetails from "./containers/restaurantdetails";
import SignUp from "./containers/signup";
import SignIn from "./containers/signin";
import UserPool from "./UserPool";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser(); // tells whether user exists or not
      if (user) {
        console.log("user", user);
        user.getSession((err, session) => {
          if (err) {
            // reject();
            navigate("/signin");
          } else {
            navigate("/home");
            // resolve(session);
          }
        });
      } else {
        // reject();
        navigate("/signin");
      }
    });
  };

  useEffect(() => {
    getSession();
  }, []);

  const logOut = () => {
    const user = UserPool.getCurrentUser(); // tells whether user exists or not
    if (user) {
      user.signOut(); // cognito's logout function
      // navigate("/signin");
    }
  };
  return (
    <Routes>
      <Route path="/" element={<Template screen={<SignIn />} />} />
      <Route path="/home" element={<Template screen={<Home />} />} />
      <Route
        path="/restaurant/:restaurantID"
        element={<Template screen={<RestaurantDetails />} />}
      />
      <Route path="/signup" element={<Template screen={<SignUp />} />} />
      <Route path="/signin" element={<Template screen={<SignIn />} />} />
    </Routes>
  );
}

export default App;
