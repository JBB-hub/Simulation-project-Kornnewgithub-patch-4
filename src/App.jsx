import { BrowserRouter, Routes, Route } from "react-router-dom";
import Simulation from "./components/Simulation";
import ResultPage from "./components/ResultPage"; // ✅ อย่าลืมสร้างไฟล์นี้

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🏠 Welcome Page */}
        <Route
          path="/"
          element={
            <div className="relative z-0 bg-primary min-h-screen">
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
              </div>
              {/* ส่วนอื่นคอมเมนต์ไว้ */}
              {/* <About />
              <Experience />
              <Tech />
              <Works />
              <Feedbacks /> */}
              <div className="relative z-0">
                {/* <Contact />
                <StarsCanvas /> */}
              </div>
            </div>
          }
        />

        {/* ⚙️ Simulation Page */}
        <Route
          path="/simulation"
          element={
            <div className="relative z-0 bg-primary min-h-screen">
              <Navbar />
              <Simulation />
            </div>
          }
        />

        {/* 📊 Result Page */}
        <Route
          path="/result"
          element={
            <div className="relative z-0 bg-primary min-h-screen">
              <Navbar />
              <ResultPage />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
