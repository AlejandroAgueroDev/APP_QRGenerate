import React from "react";
import "./style.css";

const ButtonDarkMode = ({ darkMode, onToggle }) => {
 const toggleDarkMode = () => {
  const newMode = !darkMode;
  onToggle(newMode);
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
    readOnly
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
