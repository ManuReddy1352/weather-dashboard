import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForecastPage from "./pages/ForecastPage";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forecast" element={<ForecastPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
