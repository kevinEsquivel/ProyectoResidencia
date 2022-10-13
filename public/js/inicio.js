/* CARRUSEL DE IMAGENES DE TITULO */
var imagenes = [
  "../assets/Inicio/Tribunal_EFO2.jpg",
  "../assets/Inicio/Tribunal2.jpg",
  "../assets/Inicio/N1.jpg",
];
var pos = 0;
window.setInterval(function () {
  var titulo = (document.getElementById("Titulo").style.backgroundImage =
    "url(" + imagenes[pos] + ")");
  pos = pos + 1;
  if (pos == 3) {
    pos = 0;
  }
}, 5000);

/*CARRUSEL  ESTE EVENTO TENDRA QUE ESTAR UNA VEZ Y JALAR TODO DE LA BASE DE DATOS*/
//!Este evento se tiene que llenar con la bd Dependiendo en la secicion que este

var imagenes2 = [
  "../assets/Inicio/Persona1.jpg",
  "../assets/Inicio/Persona2.jpg",
  "../assets/Inicio/Persona3.jpg",
];
var pos = 0;
window.setInterval(function () {
  document.getElementById("i1").src = imagenes2[pos];

  if (pos == 0) lineas("num1");
  if (pos == 1) lineas("num2");
  if (pos == 2) lineas("num3");
}, 2000);

var imagenes3 = ["../assets/N2.jpg", "../assets/N3.jpg", "../assets/Tribunal_EF.jpg"];
var pos = 0;
window.setInterval(function () {
  document.getElementById("i2").src = imagenes3[pos];

  if (pos == 0) lineas("num1");
  if (pos == 1) lineas("num2");
  if (pos == 2) lineas("num3");
}, 2000);

function lineas(id) {
  switch (id) {
    case "num1":
      document.getElementById(id).style.backgroundColor = "white";
      document.getElementById("num2").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      document.getElementById("num3").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      document.getElementById("i1").src = imagenes[0];

      break;
    case "num2":
      document.getElementById(id).style.backgroundColor = "white";
      document.getElementById("num1").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      document.getElementById("num3").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      document.getElementById("i1").src = imagenes[1];

      break;
    case "num3":
      document.getElementById(id).style.backgroundColor = "white";
      document.getElementById("num2").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      document.getElementById("num1").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      document.getElementById("i1").src = imagenes[2];
      break;
  }
}
(function () {
  const sliders = [...document.querySelectorAll(".slider_body")];
  const arrowNext = document.querySelector("#next");
  const arrowBefore = document.querySelector("#before");
  let value;

  arrowNext.addEventListener("click", () => changePosition(1));
  arrowBefore.addEventListener("click", () => changePosition(-1));

  function changePosition(change) {
    const currentElement = Number(
      document.querySelector(".slider_body--show").dataset.id
    );

    value = currentElement;
    value += change;
    if (value === 0 || value == sliders.length + 1) {
      value = value === 0 ? sliders.length : 1;
    }
    sliders[currentElement - 1].classList.toggle("slider_body--show");
    sliders[value - 1].classList.toggle("slider_body--show");
  }
})();
