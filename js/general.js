/*Cambiar de pagina a html aqui deberia ir la verificacion */
let modal = document.querySelector(".modal-footer");
let btnLogin = document.querySelector(".btn");

btnLogin.addEventListener("click", (e) =>{
  
  window.open("/html/administracion/PDF.html", "_self");
});
