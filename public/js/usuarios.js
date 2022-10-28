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

//*Funcion para actualizar a el usuario
const Update = async (correo) => {
  const id = await fetch(`http://localhost:8080/api/user/${correo}`).then((res) => res.json());
  
  //!COSAS PARA ACTUALIZAR
  fetch(`http://localhost:8080/api/user/${id.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
const Delete= async (correo) => {
  const id = await fetch(`http://localhost:8080/api/user/${correo}`).then((res) => res.json());

  const mensaje = confirm("Seguro de borrar el usuario con el correo: "+correo);
  if(mensaje){
    alert("esta todo bien"+id)
  }


  
}
//const Delete =
//

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
      const res = await response.json();
      const { user, total } = res;
      const x = res;
      if (x.errors) {
        return window.alert("Error en la tabla, verificar codigo de usuarios");
      }

      for (let i = 0; i < total; i++) {
        tBody.innerHTML +=
          `<tr>
          <td>` +
          (i + 1) +
          `</td>
          <td>` +
          user[i].nombre +
          `</td>
          <td>` +
          user[i].apellido +
          `</td>
          <td>` +
          user[i].puesto +
          `</td>
          <td>` +
          user[i].correo +
          `</td>
          <td><i id="` +
          user[i].correo +
          `" class="fa-solid fa-pen-to-square fa-2x" onclick="Update(this.id);"></i></td>
          <td><i id="` +
          user[i].correo +
          `" class="fa-solid fa-trash fa-2x" onclick="Delete(this.id);"></i></td>
        </tr>`;
      }
      return console.log("TODO BIEN");
    })
    .catch((error) => {
      console.log("Ha resultado un error: ", error);
    });
});

//
