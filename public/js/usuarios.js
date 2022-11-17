//*Referencias a PAQUETES
const socket = io();
//*Referencias a HTML
const btnGuardar = document.querySelector("#btnGuardar");
const nombres = document.querySelector("#inputNombre");
const apellidos = document.querySelector("#inputApellidos");
const puesto = document.querySelector("#inputPuesto");
const btnGenerar = document.querySelector("#btnGenerar");
const correo = document.querySelector("#inputCorreo");
const contra = document.querySelector("#inputContra");
const contraRep = document.querySelector("#inputContraRep");
const btnClose = document.querySelector("#btnClose");

//*parte para actualizar
const nombres2 = document.querySelector("#inputNombre2");
const apellidos2 = document.querySelector("#inputApellidos2");
const puesto2 = document.querySelector("#inputPuesto2");
const correo2 = document.querySelector("#inputCorreo2");
const contra2 = document.querySelector("#inputContra2");

//?para la tabla
const tBody = document.getElementById("tBody"); //

function ShowSelected(id) {
  let combo = document.querySelector(id);
  let selected = combo.options[combo.selectedIndex].value;
  return selected;
}
btnClose.addEventListener("click", (e) => {
  return window.open("usuarios.html", "_self");
})
btnGenerar.addEventListener("click", (e) => {
  const nombre = nombres.value.split(" ");
  const apellido = apellidos.value.split(" ");
  const email =
    nombre[0].substring(0, 2) +
    "" +
    nombre[1].substring(0, 2) +
    "" +
    apellido[0].substring(0, 2)+
    "" +
    apellido[1].substring(0, 2)+"@gmail.com"

    correo.value=email;
    
});
btnGuardar.addEventListener("click", (e) => {
  //*contraRep: contraRep.value,
  const rol = ShowSelected(".form-select");

  console.log(rol);
  if(!(contra.value===contraRep.value)){
    return alert("Contraseñas no concuerdan")
  }
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
          x.errors[0].msg
        );
      }
      return window.open("usuarios.html", "_self");
    })
    .catch((error) => {
      console.log("Esto es un error en USUARIOS", error);
    });
});

//*Funcion para actualizar a el usuario
const modalUpdate = async (correo) => {
  let select = document.querySelector(".form-select2");

  fetch(`http://localhost:8080/api/user/${correo}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      const res = await response.json();
      const { nombre, apellido, puesto, correo, rol } = res.user;

      nombres2.value = nombre;
      apellidos2.value = apellido;
      puesto2.value = puesto;
      correo2.value = correo;
      select.value = rol;
    })
    .catch((error) => {
      console.log("Ha resultado un error en la acutalizacion: ", error);
    });
};
const Update = async () => {
  const { id } = await fetch(
    `http://localhost:8080/api/user/${correo2.value}`
  ).then((res) => res.json());

  const rol = ShowSelected(".form-select2");

  data = {
    nombre: nombres2.value,
    apellido: apellidos2.value,
    puesto: puesto2.value,
    password: contra2.value,
    correo: correo2.value,
    rol,
  };

  //!COSAS PARA ACTUALIZAR
  fetch(`http://localhost:8080/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return window.open("usuarios.html", "_self");
    })
    .catch((err) => console.log(err));
};
const Delete = async (correo) => {
  const { id } = await fetch(`http://localhost:8080/api/user/${correo}`).then(
    (res) => res.json()
  );

  const mensaje = confirm(
    "Seguro de borrar el usuario con el correo: " + correo
  );
  if (mensaje) {
    fetch(`http://localhost:8080/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        alert("Eliminado");
        return window.open("usuarios.html", "_self");
      })
      .catch((error) => {
        console.log("Ha resultado un error al borrar: ", error);
      });
  }
};
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
      const { user, total ,email} = res;
      const x = res;
      console.log(res);
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
          `" class="fa-solid fa-pen-to-square fa-2x" onclick="modalUpdate(this.id);" data-bs-toggle="modal" data-bs-target="#exampleModal2"></i></td>
          <td><i id="` +
          user[i].correo +
          `" class="fa-solid fa-trash fa-2x" onclick="Delete(this.id);"></i></td>
        </tr>`;
      }
      return console.log("TODO BIEN",email);
    })
    .catch((error) => {
      console.log("Ha resultado un error: ", error);
    });
});

//
