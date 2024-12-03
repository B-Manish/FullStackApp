import { Routes, Route } from "react-router-dom";
import Home from "./containers/home";
import Template from "./containers/template";
import RestaurantDetails from "./containers/restaurantdetails";
import SignUp from "./containers/signup";
import Profile from "./containers/profile";
import Search from "./containers/search";
import CartDetails from "./components/CartDetails";
import React, { useEffect, useContext } from "react";
import { LoginContext } from "./context/LoginContext";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const { getSession, setIsLoggedIn, setUsername } = useContext(LoginContext);

  useEffect(() => {
    getSession().then((session) => {
      console.log("session", session);
      setIsLoggedIn(true);
      // setUsername("bsdk");
    });
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Template screen={<Home />} page="home" />} />
      <Route
        path="/restaurant/:restaurantID"
        element={<Template screen={<RestaurantDetails />} />}
      />
      <Route path="/signup" element={<Template screen={<SignUp />} />} />
      <Route path="/profile" element={<Template screen={<Profile />} />} />
      <Route path="/cart" element={<Template screen={<CartDetails />} />} />
      <Route path="/search" element={<Template screen={<Search />} />} />
    </Routes>
  );
}

export default App;
