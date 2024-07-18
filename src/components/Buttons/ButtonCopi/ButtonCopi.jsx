import React from "react";

const ButtonCopi = ({ onClick, darkMode }) => {
 return (
  <>
   <button
    onClick={onClick}
    className={`py-2 px-4 rounded-lg mt-4 ${
     darkMode
      ? "bg-green-700 text-white hover:bg-green-800"
      : "bg-green-500 text-white hover:bg-green-600"
    }`}
   >
    COPIAR
   </button>
  </>
 );
};

export default ButtonCopi;