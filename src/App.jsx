import React, { useState, useEffect } from "react";
import QRCodeGenerator from "./components/QR/QRCodeGenerator";
import ButtonDarkMode from "./components/Buttons/ButtonDarkMode/ButtonDarkMode";

function App() {
 // Función para obtener el valor inicial del modo oscuro
 const getInitialMode = () => {
  // Primero, verifica el almacenamiento local
  const savedMode = JSON.parse(localStorage.getItem("darkMode"));
  if (savedMode !== null) return savedMode;

  // Si no hay valor en el almacenamiento local, consulta la configuración del sistema
  const prefersDarkMode = window.matchMedia(
   "(prefers-color-scheme: dark)"
  ).matches;
  return prefersDarkMode;
 };

 const [darkMode, setDarkMode] = useState(getInitialMode);

 const toggleDarkMode = (newMode) => {
  setDarkMode(newMode);
 };

 useEffect(() => {
  // Guardar el estado del modo oscuro en el almacenamiento local cuando cambia
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
 }, [darkMode]);

 return (
  <>
   <div
    className={`flex flex-col items-center ${darkMode ? "dark-mode" : ""}`}
    style={{
     background: darkMode ? "#333333" : "#d1d1d3",
     color: darkMode ? "#d1d1d3" : "#333333",
     minHeight: "100vh",
     transition: "background 0.3s ease-in-out",
     overflowX: "hidden",
     overflowY: "auto",
    }}
   >
    <ButtonDarkMode darkMode={darkMode} onToggle={toggleDarkMode} />
    <h1 className="text-2xl sm:text-3xl font-bold mt-1 mb-2 uppercase">
     Generador de Código QR
    </h1>
    <QRCodeGenerator darkMode={darkMode} />
   </div>
  </>
 );
}

export default App;
