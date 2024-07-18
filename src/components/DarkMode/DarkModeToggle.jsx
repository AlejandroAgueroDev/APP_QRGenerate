import React, { useState } from "react";

const DarkModeToggle = ({ onToggle }) => {
 const [darkMode, setDarkMode] = useState(false);

 const toggleDarkMode = () => {
  const newMode = !darkMode;
  setDarkMode(newMode);
  onToggle(newMode); // Llama a la función de toggle en el componente padre (App.jsx)
 };

 return (
  <button onClick={toggleDarkMode} className="mt-4">
   {darkMode ? "Modo Claro" : "Modo Oscuro"}
  </button>
 );
};

export default DarkModeToggle;
