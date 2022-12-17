//*================= CALENDARIO============================

/* document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendarInicio');
  var calendar = new FullCalendar.Calendar(calendarEl, {
      contentHeight: 200,
        events: SesionesPublicas,
        eventClick: function(info) {
          info.jsEvent.preventDefault(); // don't let the browser navigate
          if (info.event.url) {
              window.open(info.event.url);
            }
        }
  });
  calendar.render();
}); */

/* CARRUSEL DE IMAGENES DE TITULO */
var imagenes = [
  "../assets/Inicio/Tribunal_EFO2.jpg",
  "../assets/Inicio/Tribunal2.jpg",
  "../assets/Inicio/N1.jpg",
];
var pos = 0;
window.setInterval(function () {
   (document.getElementById("Titulo").style.backgroundImage =
    "url(" + imagenes[pos] + ")");
  pos = pos + 1;
  if (pos == 3) {
    pos = 0;
  }
}, 5000);

/*CARRUSEL  ESTE EVENTO TENDRA QUE ESTAR UNA VEZ Y JALAR TODO DE LA BASE DE DATOS*/
//!Este evento se tiene que llenar con la bd Dependiendo en la secicion que este

var img1 = [
  "../assets/Inicio/Carrusel de imagenes/TribunalInfantil_1.jpg",
  "../assets/Inicio/Carrusel de imagenes/TribunalInfantil_2.jpg",
  "../assets/Inicio/Carrusel de imagenes/TribunalInfantil_3.jpg",
  
];
var img2 = [
  "../assets/Inicio/Carrusel de imagenes/Observatorio1.jpg",
  "../assets/Inicio/Carrusel de imagenes/Observatorio2.jpg",
  "../assets/Inicio/Carrusel de imagenes/Observatorio4.jpg",
];
var img3 = [
  "../assets/Inicio/Carrusel de imagenes/PrimeraSesion_1.jpg",
  "../assets/Inicio/Carrusel de imagenes/PrimeraSesion_2.jpg",
  "../assets/Inicio/Carrusel de imagenes/PrimeraSesion_3.jpg",
];
// To use the function, you would call it like this:
updateImage(document.getElementById("i1"), img1);
updateImage(document.getElementById("i2"), img2);
updateImage(document.getElementById("i3"), img3);

function updateImage(imgElement, imgArray) {
  var pos = 0;
  window.setInterval(function () {
    imgElement.src = imgArray[pos];
    pos = pos + 1;
    if (pos == imgArray.length) {
      pos = 0;
    }
    if (pos == 0) lineas("num1",imgElement,imgArray);
    if (pos == 1) lineas("num2",imgElement,imgArray);
    if (pos == 2) lineas("num3",imgElement,imgArray);
  }, 2000);
}


function lineas(id,imgElement,imgArray) {
  switch (id) {
    case "num1":
      document.getElementById(id).style.backgroundColor = "white";
      document.getElementById("num2").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      document.getElementById("num3").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      imgElement.src = imgArray[0];

      break;
    case "num2":
      document.getElementById(id).style.backgroundColor = "white";
      document.getElementById("num1").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      document.getElementById("num3").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      imgElement.src = imgArray[1];

      break;
    case "num3":
      document.getElementById(id).style.backgroundColor = "white";
      document.getElementById("num2").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      document.getElementById("num1").style.backgroundColor =
        "rgba(196, 196, 196, 0.7)";
      imgElement.src = imgArray[2];
      break;
  }
}
(function () {
  const sliders = [...document.querySelectorAll(".slider_body")];
  const arrowNext = document.querySelector("#next");
  const arrowBefore = document.querySelector("#before");
  let value;

  arrowNext.addEventListener("click", () => changePosition(-1));
  arrowBefore.addEventListener("click", () => changePosition(1));

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

const nombre = document.querySelector("#intNombre");
const correo = document.querySelector("#intEmail");
const mensaje = document.querySelector("#intMen");
const btnCorreo = document.querySelector(".btnCorreo");

btnCorreo.addEventListener("click", async () => {
  if (nombre.value === "" || correo.value === "" || mensaje.value === "")
    return alert("Completar la informacion");
  data = { nombre:nombre.value, mensaje:mensaje.value };
  await fetch(`http://localhost:8080/api/email/${correo.value}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json();
    })
    .catch((err) => {
      console.log(erro);
    });
});
