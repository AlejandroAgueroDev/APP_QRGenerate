import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { validateInput } from "./validator";

//*Buttons
import ButtonPDF from "../Buttons/ButtonPDF/ButtonPDF";
import ButtonIMG from "../Buttons/ButtonIMG/ButtonIMG";
import ButtonClean from "../Buttons/ButtonClean/ButtonClean";
import ButtonCopi from "../Buttons/ButtonCopi/ButtonCopi";
import ButtonGenerate from "../Buttons/ButtonGenerate/ButtonGenerate";

const QRCodeGenerator = ({ darkMode }) => {
  const [inputValue, setInputValue] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputType, setInputType] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const qrRef = useRef(null);
  const qrInstanceRef = useRef(null);

  // Redes WiFi
  const [wifiNetworks] = useState([
    {
      id: "2.4",
      ssid: "Alejandro2.4",
      password: "Asdfghjkl01",
      security: "WPA",
    },
    {
      id: "5.0",
      ssid: "Alejandro5.0",
      password: "Asdfghjkl@01",
      security: "WPA",
    },
  ]);

  // Limpiar la instancia anterior cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (qrInstanceRef.current) {
        qrInstanceRef.current = null;
      }
    };
  }, []);

  // Generar QR cuando se monta el div y tenemos qrValue
  useEffect(() => {
    if (generated && qrValue && qrRef.current) {
      // Limpiar el contenedor antes de generar nuevo QR
      qrRef.current.innerHTML = "";

      // Crear nueva instancia de QR
      const qr = new QRCodeStyling({
        width: 300,
        height: 300,
        data: qrValue,
        dotsOptions: {
          color: darkMode ? "#f9f6f2" : "#333333",
          type: "dots",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: darkMode ? "#f9f6f2" : "#333333",
        },
        cornersDotOptions: {
          type: "dot",
          color: darkMode ? "#f9f6f2" : "#333333",
        },
        backgroundOptions: {
          color: darkMode ? "#333333" : "#f9f6f2",
        },
        qrOptions: {
          errorCorrectionLevel: "H",
        },
      });

      // Renderizar el QR
      qr.append(qrRef.current);
      qrInstanceRef.current = qr;
    }
  }, [generated, qrValue, darkMode]);

  const handleChange = (event) => {
    const value = event.target.value;
    const validationError = validateInput(value, inputType);

    setInputValue(value);
    setError(validationError);
    setButtonDisabled(!!validationError || value.length === 0);
  };

  const handleGenerate = () => {
    let valueToEncode = inputValue;

    if (inputType.startsWith("WIFI_")) {
      const netId = inputType.replace("WIFI_", "");
      const net = wifiNetworks.find((n) => n.id === netId);
      if (net) {
        valueToEncode = `WIFI:T:${net.security};S:${net.ssid};P:${net.password};;`;
      }
    } else {
      const validationError = validateInput(inputValue, inputType);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setQrValue(valueToEncode);
    setGenerated(true);
    setIsInputDisabled(true);
    setIsSelectDisabled(true);
    setError("");
    setButtonDisabled(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue || inputValue);
    alert("Copiado al portapapeles!");
  };

  const handleClear = () => {
    setInputValue("");
    setQrValue("");
    setGenerated(false);
    setIsInputDisabled(false);
    setIsSelectDisabled(false);
    setError("");
    setButtonDisabled(true);
    setInputType("");

    // Limpiar el QR
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
    }
    qrInstanceRef.current = null;
  };

  const handleInputTypeChange = (event) => {
    const newInputType = event.target.value;
    setInputType(newInputType);
    setError("");

    if (newInputType.startsWith("WIFI_")) {
      setButtonDisabled(false);
      setIsInputDisabled(true);
      setInputValue(""); // Limpiar input value para WiFi
    } else {
      setButtonDisabled(!newInputType);
      setIsInputDisabled(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center ${darkMode ? "dark-mode" : ""}`}
    >
      <select
        value={inputType}
        onChange={handleInputTypeChange}
        className={`mb-2 p-2 border-2 border-gray-500 rounded-xl ${
          isSelectDisabled ? "cursor-not-allowed" : ""
        }`}
        style={{
          background: darkMode ? "#333333" : "#f9f6f2",
          color: darkMode ? "#f9f6f2" : "#333333",
        }}
        disabled={isSelectDisabled}
      >
        <option value="" hidden>
          Seleccionar tipo de entrada
        </option>
        <option value="CBU/ALIAS">CBU/ALIAS</option>
        <option value="EMAIL">Email</option>
        <option value="LINK">Link</option>
        <optgroup label="REDES WIFI">
          {wifiNetworks.map((net) => (
            <option key={net.id} value={`WIFI_${net.id}`}>
              {net.ssid}
            </option>
          ))}
        </optgroup>
      </select>

      {!inputType.startsWith("WIFI_") && (
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={
            inputType ? `Ingrese ${inputType}` : "Seleccione tipo de entrada"
          }
          className={`border-2 text-center border-gray-500 p-2 rounded-xl mb-3 mt-2 w-56 max-w-md ${
            !inputType || isInputDisabled ? "cursor-not-allowed" : ""
          }`}
          style={{
            background: darkMode ? "#333333" : "#f9f6f2",
            color: darkMode ? "#f9f6f2" : "#333333",
          }}
          disabled={!inputType || isInputDisabled}
        />
      )}

      {error && <p className="text-red-500 -mt-2 mb-2">{error}</p>}

      {!generated && (
        <ButtonGenerate
          onClick={handleGenerate}
          disabled={buttonDisabled}
          darkMode={darkMode}
        />
      )}

      {generated && (
        <div
          ref={qrRef}
          className="flex flex-col items-center border-2 border-gray-800 rounded-xl p-4 mt-4 min-h-[320px]"
          style={{
            background: darkMode ? "#333333" : "#f9f6f2",
          }}
        />
      )}

      {generated && (
        <section className="flex space-x-4 mt-4">
          <ButtonCopi onClick={handleCopy} darkMode={darkMode} />
          <ButtonClean onClick={handleClear} darkMode={darkMode} />
          <ButtonIMG qrRef={qrRef} darkMode={darkMode} />
          <ButtonPDF qrRef={qrRef} darkMode={darkMode} />
        </section>
      )}
    </div>
  );
};

export default QRCodeGenerator;