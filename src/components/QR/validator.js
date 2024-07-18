// export const validateInput = (inputValue) => {
//  const regex = /^[a-zA-Z0-9.]*$/;

//  if (!inputValue) {
//    return "Debe completar correctamente el campo";
//  }

//  if (!regex.test(inputValue)) {
//    return "El valor solo puede contener letras, números y puntos.";
//  }

//  if(inputValue.length < 6 || inputValue.length > 22){
//    return "El valor debe tener entre 5 y 20 caracteres.";
//  }

//  return "";
// };

export const validateInput = (inputValue, inputType) => {
 const regexCBU_ALIAS = /^[a-zA-Z0-9.]*$/;
 const regexEMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const regexLINK = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

 inputValue = inputValue.trim();

 if (!inputValue) {
  return "Debe completar correctamente el campo";
 }

 switch (inputType) {
  case "CBU/ALIAS":
   if (!regexCBU_ALIAS.test(inputValue)) {
    return "El valor solo puede contener letras, números y puntos.";
   }
   if (inputValue.length < 5 || inputValue.length > 22) {
    return "El valor debe tener entre 5 y 22 caracteres.";
   }
   break;

  case "EMAIL":
   if (!regexEMAIL.test(inputValue)) {
    return "Debe ingresar un email válido.";
   }
   break;

  case "LINK":
   if (!regexLINK.test(inputValue)) {
    return "Debe ingresar un enlace válido.";
   }
   break;

  default:
   return "Debe seleccionar tipo de QR";
 }

 return "";
};
