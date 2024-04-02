import { Routes, Route } from "react-router-dom";
import Home from "./containers/home";
import Template from "./containers/template";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template screen={<Home />} />} />
    </Routes>
  );
}

export default App;
