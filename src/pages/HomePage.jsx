import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Home/src/App.css";
import Home from "./Home/src/Pages/Home";
import Legal from "./Home/src/Pages/Legal";
import Appointment from "./Home/src/Pages/Appointment";
const HomePage = () => {
  return (
    <>
      <div className="App">
        <Router basename="/Health-Plus">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default HomePage;
