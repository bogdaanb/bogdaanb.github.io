import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Pointer = ({ isLightMode, isHovering }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const pointerElement = document.querySelector('.pointer');
    if (pointerElement) {
      gsap.to(pointerElement, {
        duration: 0.3,
        x: position.x,
        y: position.y,
        ease: 'power3.out',
      });
    }
  }, [position, isMobile]);

  if (isMobile) return null; // 🚀 No renderiza el puntero en móviles

  const crossColor = isLightMode ? '#303030' : '#f2f0ef'; 

  return (
    <div>
      <div
        className="pointer"
        style={{
          position: 'fixed',
          left: '0px',
          top: '0px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: `1px solid ${isLightMode ? '#303030' : '#f2f0ef'}`,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovering ? '#303030' : 'transparent',
        }}
      />
      {!isHovering && (
        <div
          className="cross-pointer"
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '1px',
              height: '20px',
              backgroundColor: crossColor,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '20px',
              height: '1px',
              backgroundColor: crossColor,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Pointer;
