import React from "react";
import html2canvas from "html2canvas";

const ButtonIMG = ({ qrRef, darkMode }) => {
 const handleDownloadImage = async () => {
  const canvas = await html2canvas(qrRef.current);
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "qr-code.png";
  link.click();
 };

 return (
  <>
   <button
    title="Descargar el QR en formado .img"
    onClick={handleDownloadImage}
    className={`py-2 px-4 rounded-lg mt-4 ${
     darkMode
      ? "bg-yellow-700 text-white hover:bg-yellow-800"
      : "bg-yellow-500 text-white hover:bg-yellow-600"
    }`}
   >
    DESCARGAR EN IMAGEN
   </button>
  </>
 );
};

export default ButtonIMG;
