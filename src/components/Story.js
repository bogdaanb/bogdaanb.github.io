import React from "react";
import profpic from "../img/profpic.jpg";

const Story = () => {
  return (
    <div className="mt-72 p-8 sm:p-12 md:p-16 lg:p-20 flex items-center justify-center text-center">
      {/* Contenedor con flexbox para alinear la imagen y el texto */}
      <div className="flex flex-col sm:flex-row items-center relative border border-[#303030] dark:border-[#f2f0ef] rounded-md p-5 sm:p-8 m-2 max-w-full">
        <img
          src={profpic}
          alt="Bogdan"
          className="w-50 h-40 rounded-md mb-4 sm:mb-0 sm:mr-8"
        />
        <p className="text-lg sm:text-lg text-[#303030] dark:text-[#f2f0ef]">
          I'm a Spanish multiplatform programmer, passionate about technology and
          committed to creating beautiful and practical solutions.
        </p>
      </div>
    </div>
  );
};

export default Story;
