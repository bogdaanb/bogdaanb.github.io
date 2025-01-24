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
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => t,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
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
        {/* ✅ Pass hoverState to MainLayout */}
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
