import React from "react";

const ButtonClean = ({ onClick, darkMode }) => {
 return (
  <button
   onClick={onClick}
   className={`py-2 px-4 rounded-lg mt-4 ${
    darkMode
     ? "bg-red-700 text-white hover:bg-red-800"
     : "bg-red-500 text-white hover:bg-red-600"
   }`}
  >
   LIMPIAR
  </button>
 );
};

export default ButtonClean;
