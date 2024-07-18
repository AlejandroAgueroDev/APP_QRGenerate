import React, { useState } from "react";
import QRCodeGenerator from "./components/QR/QRCodeGenerator";
import ButtonDarkMode from "./components/Buttons/ButtonDarkMode/ButtonDarkMode"; // Importar el componente ButtonDarkMode

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (newMode) => {
    setDarkMode(newMode); // Actualiza el estado de modo oscuro en App.jsx
  };

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
        <ButtonDarkMode darkMode={darkMode} onToggle={toggleDarkMode}/>
        <h1 className="text-3xl font-bold mt-1 mb-2 uppercase">
          Generador de Código QR
        </h1>
        <QRCodeGenerator darkMode={darkMode} />
      </div>
    </>
  );
}

export default App;