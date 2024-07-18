import React, { useState } from "react";
import "./style.css"; // Importar los estilos desde style.css

const ButtonDarkMode = ({ onToggle }) => {
 const [darkMode, setDarkMode] = useState(false);

 const toggleDarkMode = () => {
  const newMode = !darkMode;
  setDarkMode(newMode);
  onToggle(newMode); // Llama a la función de toggle en el componente padre (App.jsx)
 };

 return (
  <div
   className="dark-mode-toggle flex items-center justify-center mt-4"
   onClick={toggleDarkMode}
   title="DarkMode/LightMode"
  >
   <input
    type="checkbox"
    className="toggle-checkbox"
    checked={darkMode}
    readOnly // Hace que el input sea de solo lectura
   />
   <div className="toggle-slot">
    <div className="sun-icon-wrapper">
     <div
      className="iconify sun-icon"
      data-icon="feather-sun"
      data-inline="false"
     ></div>
    </div>
    <div className="toggle-button"></div>
    <div className="moon-icon-wrapper">
     <div
      className="iconify moon-icon"
      data-icon="feather-moon"
      data-inline="false"
     ></div>
    </div>
   </div>
  </div>
 );
};

export default ButtonDarkMode;