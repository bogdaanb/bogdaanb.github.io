import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Header from "../components/Header";

const MidnightProject = ({ isLightMode, setIsLightMode }) => {
  const textRef = useRef([]);

  useEffect(() => {
    // Aseguramos que el array textRef contiene los elementos que queremos animar
    textRef.current = textRef.current.slice(0, 3); // Limitar el array a 3 párrafos

    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 20, // Comienza desde abajo
      },
      {
        opacity: 1,
        y: 0, // Se mueve a su posición original
        stagger: 0.2, // La animación de cada letra/párrafo tiene un pequeño retraso
        duration: 0.8, // Duración de cada animación
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isLightMode ? "bg-[#f2f0ef]" : "bg-[#303030]"
      }`}
    >
      {/* Header */}
      <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode} />

      {/* Contenedor centrado */}
      <div className="flex flex-col items-center justify-start h-screen pt-20 relative">
        <h1 className="text-8xl font-bold text-[#303030] dark:text-[#f2f0ef] relative">
          MIDNIGHT
          <span
            className="text-blue-500 font-curvy text-8xl inline-block ml-2 mt-8 transform rotate-9"
          >
            Club
          </span>
        </h1>
        <h2 className="text-4xl font-semibold text-[#303030] dark:text-[#f2f0ef]">
          GAMECHANGERS
        </h2>

        {/* Recuadro con información */}
        <div
          className="mt-28 w-2/4 p-6 bg-[#303030] dark:bg-[#f2f0ef] rounded-lg shadow-md text-left self-start ml-6"
          ref={(el) => textRef.current.push(el)} // Guardamos el contenedor en textRef
        >
          <p className="text-lg text-[#f2f0ef] dark:text-[#303030]">
            <strong>Midnight Project</strong> is a social app designed for{" "}
            <strong>unconventional meetups</strong> in designated areas.
          </p>

          <p className="text-lg text-[#f2f0ef] dark:text-[#303030]">
            It connects people for unique events like{" "}
            <strong>car meetups</strong>, <strong>graffiti competitions</strong>
            , <strong>parkour</strong>, and <strong>urban parties</strong>.
          </p>

          <p className="text-lg text-[#f2f0ef] dark:text-[#303030]">
            The platform offers a space for those passionate about alternative
            culture and authentic experiences, fostering creativity and
            self-expression.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MidnightProject;
