import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Story from "./components/Story";
import Pointer from "./components/Pointer";
import Projects from "./components/Projects";
import MidnightProject from "./pages/MidnightProject";
import "./App.css";

const MainLayout = ({
  isLightMode,
  setIsLightMode,
  hoverState,
  setHoverState,
}) => {
  return (
    <div
      className={`App transition-colors duration-300 ${
        isLightMode ? "bg-[#f2f0ef]" : "bg-[#303030]"
      } ${hoverState ? "bg-[#303030]" : ""}`} // 🔹 hoverState is now passed correctly
    >
      <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
      <HeroSection />
      <Story />
      <Pointer isLightMode={isLightMode} />
      <Projects isLightMode={isLightMode} setHoverState={setHoverState} />
    </div>
  );
};

const App = () => {
  const [isLightMode, setIsLightMode] = useState(true);
  const [hoverState, setHoverState] = useState(false); // 🔹 Declare hoverState here

  useEffect(() => {
    // Solo activar Lenis en pantallas grandes (mayores a 768px)
    if (window.innerWidth > 768) {
      const lenis = new Lenis({
        duration: 0.8,
        lerp: 0.1,
        easing: (t) => t,
        smooth: true,
        gestureOrientation: "both", 
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [isLightMode]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              isLightMode={isLightMode}
              setIsLightMode={setIsLightMode}
              hoverState={hoverState} // 🔹 Fix: Now hoverState is passed
              setHoverState={setHoverState}
            />
          }
        />
        <Route
          path="/midnight-project"
          element={
            <MidnightProject
              isLightMode={isLightMode}
              setIsLightMode={setIsLightMode}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
