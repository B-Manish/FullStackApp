import { Routes, Route } from "react-router-dom";
import Home from "./containers/home";
import Template from "./containers/template";
import RestaurantDetails from "./containers/restaurantdetails";
import SignUp from "./containers/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template screen={<Home />} />} />
      <Route
        path="/restaurant/:restaurantID"
        element={<Template screen={<RestaurantDetails />} />}
      />
      <Route path="/signup" element={<Template screen={<SignUp />} />} />
    </Routes>
  );
}

export default App;
