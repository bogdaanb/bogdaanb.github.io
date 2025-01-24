import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ToggleLightMode from "./ToggleLightMode"; // Importa el nuevo componente

const Header = ({ isLightMode, setIsLightMode }) => {
  const animationRef = useRef(null);
  const headerRef = useRef(null); // Reference for the header
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu open/close
  const [isMenuVisible, setIsMenuVisible] = useState(true); // State for menu button visibility
  const menuButtonRef = useRef(null); // Reference for the menu button
  let hideTimeout = useRef(null); // Store timeout ID for hiding the menu

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  // Function to show the header using GSAP animation
  const handleMenuClick = () => {
    setIsMenuOpen(true); // Set menu open to true
    setIsMenuVisible(false); // Hide the "Menu" button

    // Show the header with GSAP animation
    gsap.fromTo(
      headerRef.current,
      { y: "-100%", opacity: 0 }, // Start from outside the view (above)
      { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" } // Animate down into view
    );

    // Set a timer to hide the header after 5 seconds
    if (hideTimeout.current) clearTimeout(hideTimeout.current); // Clear previous timeout if exists
    hideTimeout.current = setTimeout(() => {
      hideHeader(); // Call function to hide the header
      animateMenuButton(); // Call function to animate menu button
    }, 8000); // 5000 ms = 5 seconds
  };

  // Function to hide the header with animation
  const hideHeader = () => {
    gsap.to(headerRef.current, {
      y: "-100%", // Move the header up out of view
      opacity: 0, // Fade out
      duration: 0.5,
      ease: "power2.in", // Ease in for hiding
      onComplete: () => {
        setIsMenuOpen(false); // After the animation, set menu open to false
      }
    });
  };

  // Function to animate the "Menu" button appearance
  const animateMenuButton = () => {
    gsap.fromTo(
      menuButtonRef.current,
      { y: "-50%", opacity: 0 }, // Start from above and invisible
      { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" } // Animate to original position and fade in
    );
    setIsMenuVisible(true); // Show the "Menu" button
  };

  // Clean up the timeout when component unmounts
  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (animationRef.current) {
      gsap.to(animationRef.current, {
        duration: 0.3,
        backgroundColor: isLightMode ? "#303030" : "#f2f0ef", // Cambiar colores
        left: isLightMode ? 0 : "50%",
        borderRadius: "8px",
      });
    }
  }, [isLightMode]);

  return (
    <div>
      {/* Button to trigger menu */}
      {isMenuVisible && !isMenuOpen && (
        <button
          ref={menuButtonRef} // Reference for GSAP animation
          onClick={handleMenuClick}
          className="fixed top-4 right-4 text-lg text-[#303030] dark:text-[#dedcdc] z-20"
        >
          Menu
        </button>
        
      )}

      {/* Header element, initially hidden */}
      <header
        ref={headerRef}
        className="bg-[#f2f0ef] dark:bg-[#303030] p-4 flex justify-between items-center transition-colors duration-300"
        style={{
          display: isMenuOpen ? "flex" : "none", 
          position: "fixed", // Fixed for sticky effect
          top: 0, 
          left: 0, 
          width: "100%", 
          zIndex: 50, // Ensure the header is always above other elements
        }}
      >
        <nav className="flex space-x-4">
          <button className="text-[#303030] dark:text-[#f2f0ef]">Story</button>
          <button className="text-[#303030] dark:text-[#f2f0ef]">Projects</button>
          <button className="text-[#303030] dark:text-[#f2f0ef]">Contact</button>
        </nav>
        <div className="relative flex items-center">
          {/* Chicle */}
          <div
            ref={animationRef}
            className="absolute h-full transition-all duration-300"
            style={{
              backgroundColor: isLightMode ? "#303030" : "#f2f0ef", // Cambiar colores
              width: "50%", // Ocupa la mitad del contenedor
              top: 0,
              left: isLightMode ? 0 : "50%", // Mueve el chicle a la izquierda o derecha
              borderRadius: "8px", // Bordes redondeados
            }}
          />
          <button
            onClick={toggleTheme}
            className="bg-transparent border border-[#303030] dark:border-[#f2f0ef] rounded-lg p-2 flex items-center relative z-10 space-x-4"
          >
            <ToggleLightMode /> {/* Usamos el nuevo componente */}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
