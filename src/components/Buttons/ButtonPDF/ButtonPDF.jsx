import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ButtonPDF = ({ qrRef, darkMode }) => {
 const handleDownloadPDF = async () => {
  const canvas = await html2canvas(qrRef.current);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF();
  const imgWidth = 180;
  const imgHeight = 180;
  const pageWidth = 210;
  const pageHeight = 287;
  const x = (pageWidth - imgWidth) / 2;
  const y = (pageHeight - imgHeight) / 2;

  pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
  pdf.save("qr-code.pdf");
 };

 return (
  <>
   <button
    title="Descargar el QR en formado .pdf"
    onClick={handleDownloadPDF}
    className={`py-2 px-4 rounded-lg mt-4 ${
     darkMode
      ? "bg-purple-700 text-white hover:bg-purple-800"
      : "bg-purple-500 text-white hover:bg-purple-600"
    }`}
   >
    DESCARGAR EN PDF
   </button>
  </>
 );
};

export default ButtonPDF;
