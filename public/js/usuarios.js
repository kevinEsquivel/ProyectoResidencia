//*Referencias a PAQUETES
const socket = io();
//*Referencias a HTML
const btnGuardar = document.querySelector("#btnGuardar");
const nombres = document.querySelector("#inputNombre");
const apellidos = document.querySelector("#inputApellidos");
const puesto = document.querySelector("#inputPuesto");
const correo = document.querySelector("#inputCorreo");
const contra = document.querySelector("#inputContra");
const contraRep = document.querySelector("#inputContraRep");

//?para la tabla
const tBody = document.getElementById("tBody"); //

function ShowSelected() {
  let combo = document.querySelector(".form-select");
  let selected = combo.options[combo.selectedIndex].value;
  return selected;
}

btnGuardar.addEventListener("click", (e) => {
  //*contraRep: contraRep.value,
  const rol = ShowSelected();

  console.log(rol);
  data = {
    nombre: nombres.value,
    apellido: apellidos.value,
    puesto: puesto.value,
    password: contra.value,
    correo: correo.value,
    rol,
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
socket.on("connect", () => {
  console.log("conectado");
  fetch(`http://localhost:8080/api/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      const { user, total } = await response.json();
      console.log(user[0]); //user[0]
      if (response.json().errors) {
        return window.alert("Error en la tabla, verificar codigo de usuarios");
      }

      let valores = [...Array(total).keys()];
      let datos = ["nombre", "apellido", "puesto", "correo"];

      for (let i = 0; i <total; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 5; j++) {
          let col = document.createElement("td");
          let textoCol = document.createTextNode(user[i].nombre);
          if (j === 0 && valores.includes(i)) {
            textoCol = document.createTextNode(i + 1);
          }
          col.appendChild(textoCol);
          row.appendChild(col);
        }
        //6 columnas
        tBody.appendChild(row);
      }
    })
    .catch((error) => {
      console.log("Ha resultado un error: ", error);
    });
});

//
