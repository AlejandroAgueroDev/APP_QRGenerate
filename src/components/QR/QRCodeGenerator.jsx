import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import { validateInput } from "./validator";

//*Buttons
import ButtonPDF from "../Buttons/ButtonPDF/ButtonPDF";
import ButtonIMG from "../Buttons/ButtonIMG/ButtonIMG";
import ButtonClean from "../Buttons/ButtonClean/ButtonClean";
import ButtonCopi from "../Buttons/ButtonCopi/ButtonCopi";
import ButtonGenerate from "../Buttons/ButtonGenerate/ButtonGenerate";

const QRCodeGenerator = ({ darkMode }) => {
 const [inputValue, setInputValue] = useState("");
 const [qrValue, setQrValue] = useState();
 const [generated, setGenerated] = useState(false);
 const [error, setError] = useState("");
 const [buttonDisabled, setButtonDisabled] = useState(true);
 const [inputType, setInputType] = useState("");
 const [isInputDisabled, setIsInputDisabled] = useState(false);
 const [isSelectDisabled, setIsSelectDisabled] = useState(false);
 const qrRef = useRef(null);

 const handleChange = (event) => {
  const value = event.target.value;
  const validationError = validateInput(value, inputType);

  setInputValue(value);
  setError(validationError);
  setButtonDisabled(!!validationError || value.length === 0);
 };

 const handleGenerate = () => {
  const validationError = validateInput(inputValue, inputType);

  if (validationError) {
   setError(validationError);
   return;
  }

  setQrValue(inputValue);
  setGenerated(true);
  setIsInputDisabled(true);
  setIsSelectDisabled(true);
  setError("");
  setButtonDisabled(true);
 };

 const handleCopy = () => {
  navigator.clipboard.writeText(inputValue);
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
 };

 const handleInputTypeChange = (event) => {
  const newInputType = event.target.value;
  setInputType(newInputType);
  setError("");
  setButtonDisabled(!newInputType);
 };

 return (
  <div className={`flex flex-col items-center ${darkMode ? "dark-mode" : ""}`}>
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
     Seleccion de entrada
    </option>
    <option value="CBU/ALIAS">CBU/ALIAS</option>
    <option value="EMAIL">Email</option>
    <option value="LINK">Link</option>
   </select>

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
   {error && <p className="text-red-500 -mt-2 mb-2">{error}</p>}

   {!generated && (
    <ButtonGenerate
     onClick={handleGenerate}
     disabled={buttonDisabled}
     darkMode={darkMode}
    />
   )}

   {qrValue && (
    <>
     <section
      className="flex flex-col items-center border-2 border-gray-800 rounded-xl p-4"
      ref={qrRef}
     >
      <QRCode value={qrValue} />
     </section>

     <section className="flex space-x-4 mt-4">
      <ButtonCopi onClick={handleCopy} darkMode={darkMode} />

      <ButtonClean onClick={handleClear} darkMode={darkMode} />
     </section>

     <ButtonIMG qrRef={qrRef} darkMode={darkMode} />

     <ButtonPDF qrRef={qrRef} darkMode={darkMode} />
    </>
   )}
  </div>
 );
};

export default QRCodeGenerator;
