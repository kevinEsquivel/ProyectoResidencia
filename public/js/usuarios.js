const btnGuardar = document.querySelector("#btnGuardar");
const nombres = document.querySelector("#inputNombre");
const apellidos = document.querySelector("#inputApellidos");
const puesto = document.querySelector("#inputPuesto");
const correo = document.querySelector("#inputCorreo");
const contra = document.querySelector("#inputContra");
const contraRep = document.querySelector("#inputContraRep");


function ShowSelected() {
  let combo = document.querySelector(".form-select");
  let selected = combo.options[combo.selectedIndex].value;
  return selected;
}

btnGuardar.addEventListener("click", (e) => {
  //*contraRep: contraRep.value,
  const rol=ShowSelected();

console.log(rol);
  data = {
    nombre: nombres.value,
    apellido: apellidos.value,
    puesto: puesto.value,
    password: contra.value,
    correo: correo.value,
    rol
  };

  console.log(data);
  fetch(`http://localhost:8080/api/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const x = await response.json();
      console.log(x);
      if (x.errors) {
        return window.alert(
          "Favor de ingresar un correo y contraseña correctos"
        );
      }
      return window.open("usuarios.html", "_self");
    })
    .catch((error) => {
      console.log("Esto es un error en USUARIOS", error);
    });
});
//!Sockets
fetch(`http://localhost:8080/api/user/`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then(async (response) => {
    const x = await response.json();
    console.log(x);
    if (x.errors) {
      return window.alert("Se a generado un problema, revisar el código");
    }
  })
  .catch((error) => {
    console.log("Ha resultado un error: ", error);
  });

//
