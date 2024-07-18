import React from "react";

const ButtonGenerate = ({ onClick, darkMode, disabled }) => {
 return (
  <>
   <button
    onClick={onClick}
    disabled={disabled}
    className={`py-2 px-4 rounded-lg mb-4 ${
     disabled
      ? "bg-gray-400 text-white cursor-not-allowed"
      : darkMode
      ? "bg-blue-700 text-white hover:bg-blue-800"
      : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
   >
    GENERAR
   </button>
  </>
 );
};

export default ButtonGenerate;