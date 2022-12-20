const nombre = document.querySelector("#nombre");
const apellidoP = document.querySelector("#apellidoP");
const apellidoM = document.querySelector("#apellidoM");
const curp = document.querySelector("#curp");
const rfc = document.querySelector("#rfc");
const homoclave = document.querySelector("#homoclave");
const CInstitucional = document.querySelector("#CInstitucional");
const CPersonal = document.querySelector("#CPersonal");
const numCasa = document.querySelector("#numCasa");
const numPersonal = document.querySelector("#numPersonal");
const paisNacimiento = document.querySelector("#paisNacimiento");
const nacionalidad = document.querySelector("#nacionalidad");
const Obs1 = document.querySelector("#Obs1");

document.getElementById("btnGuardar").addEventListener("click", async () => {
  domicilio = {
    calle: document.querySelector("#calle").value,
    NumExt: document.querySelector("#numExt").value,
    NumInt: document.querySelector("#numInt").value,
    col: document.querySelector("#colonia").value,
    municipio: document.querySelector("#municipio").value,
    entFederativa: document.querySelector("#entFed").value,
    CP: document.querySelector("#CP").value,
    Observaciones: document.querySelector("#Obs2").value,
    extranjero: {
      calle: document.querySelector("#calleExtranj").value,
      NumExt: document.querySelector("#numExtExtranj").value,
      NumInt: document.querySelector("#numIntExtranj").value,
      col: document.querySelector("#coloniaExtranj").value,
      estado: document.querySelector("#municipioExtranj").value,
      pais: document.querySelector("#pais").value,
      CP: document.querySelector("#CPExtranj").value,
    },
  };

  escolaridad = {
    nivel: RadioButtonSeleccionado("EscNivel"),
    instEducativa: document.querySelector("#intitucionEdu").value,
    carrera: document.querySelector("#carreraC").value,
    estatus: RadioButtonSeleccionado("Status"),
    docObtenido: RadioButtonSeleccionado("DocObtenido"),
    fechaObtencion: document.querySelector("#fechaDoc").value,
    lugarInstitucion: RadioButtonSeleccionado("UbicaEducativa"),
    observaciones: document.querySelector("#Obs3").value,
  };

  data = {
    nombre: nombre.value,
    apellidoP: apellidoP.value,
    apellidoM: apellidoM.value,
    curp: curp.value,
    rfc: rfc.value,
    homoclave: homoclave.value,
    correoInst: CInstitucional.value,
    correoPer: CPersonal.value,
    TelCasa: numCasa.value,
    cel: numPersonal.value,
    estadoCivil: RadioButtonSeleccionado("SituPersonal"),
    regMatri:
      RadioButtonSeleccionado("regMatrimonial") === undefined
        ? document.querySelector("#otro").value
        : "Nose que esta pasando",
    paisNacimiento: paisNacimiento.value,
    nacionalidad: nacionalidad.value,
    Observaciones: Obs1.value,
    domicilio,
    escolaridad,
  };

  let id_user_login = "";
  let email = window.localStorage.getItem("E");
  const id = await fetch(`http://localhost:8080/api/user/${email}`)
    .then((res) => res.json())
    .catch((error) =>
      console.log("error en obtener el id con el email", error)
    );
  id_user_login = id.id;

  await fetch(`http://localhost:8080/api/personal/${id_user_login}`, {
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
        return window.alert(x.errors[0].msg);
      }
    })
    .catch((error) => {
      console.log("Esto es un error en Informacion Personal", error);
    });
});

function RadioButtonSeleccionado(name) {
  let rButtonSelect = document.querySelector(`input[name="${name}"]:checked`);
  if (rButtonSelect) {
    return rButtonSelect.value;
  } else {
    console.log("No ha selecionado  activo", rButtonSelect);
  }
}

/* 

escolaridad:,
 */
