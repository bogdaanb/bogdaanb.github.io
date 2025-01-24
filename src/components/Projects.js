// src/components/Projects.js

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom"; // Importar Link
import midnightIcon from "../img/midnighticon.png";

const Projects = ({ isLightMode, setHoverState }) => {
  const project = {
    title: "Midnight Club",
    description: "GAME-CHANGERS",
    link: "/midnight-project", // Aquí la ruta hacia la página del proyecto
    icon: midnightIcon
  };

  const projectRef = useRef(null);

  useEffect(() => {
    const element = projectRef.current;

    if (element) {
      const onMouseEnter = () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.3,
          ease: "power3.out",
          backgroundColor: isLightMode ? "transparent" : "transparent",
        });
        setHoverState(true);
      };

      const onMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
          backgroundColor: isLightMode ? "transparent" : "transparent",
        });
        setHoverState(false);
      };

      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);

      return () => {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [setHoverState, isLightMode]);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="p-8 sm:p-12 md:p-16 lg:p-20 flex justify-center bg-transparent">
      <div
        ref={projectRef}
        className="border border-[#303030] dark:border-[#f2f0ef] p-5 rounded-md shadow-md max-w-lg w-full flex items-center justify-between cursor-pointer relative bg-transparent"
        onClick={handleClick}
      >
        <div>
          <h3 className="text-xl font-semibold text-[#303030] dark:text-[#f2f0ef] mb-2">
            {project.title}
          </h3>
          <p className="text-md text-[#303030] dark:text-[#f2f0ef] mb-4">
            {project.description}
          </p>
          {/* Usamos Link para la navegación */}
          <Link
            to={project.link} // Navega a la ruta especificada
            className="text-blue-500 dark:text-blue-300 block"
          >
            View Project
          </Link>
        </div>
        <div className="flex-shrink-0">
          <img
            src={project.icon}
            alt={`${project.title} icon`}
            className="w-20 h-20"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
