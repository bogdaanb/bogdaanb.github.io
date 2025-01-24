// HeroSection.js
import React, { useEffect, useRef } from "react";
import SplitType from "split-type"; // Asegúrate de tener instalada la librería
import { gsap } from "gsap"; // Importar gsap
import { Canvas } from "@react-three/fiber";

const HeroSection = ({ isLightMode }) => {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Inicializar SplitType en el texto
    new SplitType('.animate', {
      types: 'lines, words, chars',
      tagName: 'span'
    });
  
    // Animar cada palabra con GSAP
    gsap.from('.animate .word', {
      y: '100%', // Palabras aparecen desde abajo
      opacity: 0, // Comienza oculto
      duration: 0.5, // Duración de la animación
      ease: 'power1.out', // Easing
      stagger: 0.1, // Retraso entre animaciones
    });
  
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1; // Normalizar a rango [-1, 1]
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalizar a rango [-1, 1]
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <div className="h-screen w-full flex items-center">
      <div className="w-9/12">
        <h1 className="text-[10vw] font-bold leading-tight">
          <span className="text-[#303030] dark:text-[#f2f0ef] animate">
            Hey! My name is Bogdan.
          </span>
        </h1>
      </div>
      {/* Canvas para el elemento 3D */}
      <Canvas style={{ position: "absolute", right: "0", top: "0", height: "100vh", width: "50vw" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
};

export default HeroSection;
