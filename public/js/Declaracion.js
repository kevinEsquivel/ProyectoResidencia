const nombre = document.querySelector("#nombre");
const apellidoP = document.querySelector("#apellidoP");
const apellidoM = document.querySelector("#apellidoM");
const curp = document.querySelector("#curp");
const rfc = document.querySelector("#rfc");
const homoclave = document.querySelector("#homoclave");
const correoInst = document.querySelector("#CInstitucional");
const correoPer = document.querySelector("#CPersonal");
const TelCasa = document.querySelector("#numCasa");
const cel = document.querySelector("#numPersonal");
const paisNacimiento = document.querySelector("#paisNacimiento");
const nacionalidad = document.querySelector("#nacionalidad");
const Obs1 = document.querySelector("#Obs1");

document.addEventListener("DOMContentLoaded", async function () {
  let id_user_login = "";
  id_user_login = await ObtenerId();

  await fetch(`http://localhost:8080/api/personal/${id_user_login}`)
    .then(async (response) => {
      let x = await response.json();
      let data = x.persona;
      nombre.value = data.nombre;
      apellidoP.value = data.apellidoP;
      apellidoM.value = data.apellidoM;
      curp.value = data.curp;
      rfc.value = data.rfc;
      homoclave.value = data.homoclave;
      correoInst.value = data.correoInst;
      correoPer.value = data.correoPer;
      TelCasa.value = data.TelCasa;
      cel.value = data.cel;
      paisNacimiento.value = data.paisNacimiento;
      nacionalidad.value = data.nacionalidad;
      Obs1.value = data.Observaciones;
      SeleccionarUnRadio("SituPersonal", data.estadoCivil);
      data.regMatri === "Separacion de Bienes" ||
      data.regMatri === "Sociedad Conyugal"
        ? SeleccionarUnRadio("regMatrimonial", data.regMatri)
        : (document.getElementById("otro").value = data.regMatri);

      //*Agregar lo de Domicilio
      document.querySelector("#calle").value = data.domicilio.calle;
      document.querySelector("#numExt").value = data.domicilio.NumExt;
      document.querySelector("#numInt").value = data.domicilio.NumInt;
      document.querySelector("#colonia").value = data.domicilio.col;
      document.querySelector("#municipio").value = data.domicilio.municipio;
      document.querySelector("#entFed").value = data.domicilio.entFederativa;
      document.querySelector("#CP").value = data.domicilio.CP;
      document.querySelector("#Obs2").value = data.domicilio.Observaciones;
      //**============DOMICIOL EXTRANJERO */
      document.querySelector("#calleExtranj").value =
        data.domicilio.extranjero.calle;
      document.querySelector("#numExtExtranj").value =
        data.domicilio.extranjero.NumExt;
      document.querySelector("#numIntExtranj").value =
        data.domicilio.extranjero.NumInt;
      document.querySelector("#coloniaExtranj").value =
        data.domicilio.extranjero.col;
      document.querySelector("#municipioExtranj").value =
        data.domicilio.extranjero.estado;
      document.querySelector("#pais").value = data.domicilio.extranjero.pais;
      document.querySelector("#CPExtranj").value = data.domicilio.extranjero.CP;
      //*AGRGANDO ESCOLARIDAD

      SeleccionarUnRadio("EscNivel", data.escolaridad.nivel);
      document.querySelector("#intitucionEdu").value =
        data.escolaridad.instEducativa;
      document.querySelector("#carreraC").value = data.escolaridad.carrera;
      SeleccionarUnRadio("Status", data.escolaridad.estatus);
      SeleccionarUnRadio("DocObtenido", data.escolaridad.docObtenido);
      document.querySelector("#fechaDoc").value =
        data.escolaridad.fechaObtencion;
      SeleccionarUnRadio("UbicaEducativa", data.escolaridad.lugarInstitucion);
      document.querySelector("#Obs3").value = data.escolaridad.observaciones;
    })
    .catch((error) => {
      console.log("Error en Generear la informacion", error);
    });
});

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
    correoInst: correoInst.value,
    correoPer: correoPer.value,
    TelCasa: TelCasa.value,
    cel: cel.value,
    estadoCivil: RadioButtonSeleccionado("SituPersonal"),
    regMatri:RadioButtonSeleccionado("regMatrimonial"),
    paisNacimiento: paisNacimiento.value,
    nacionalidad: nacionalidad.value,
    Observaciones: Obs1.value,
    domicilio,
    escolaridad,
  };

  let id_user_login = "";
  id_user_login = await ObtenerId();
  
  await fetch(`http://localhost:8080/api/personal/${id_user_login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const x = await response.json();
      
      if (x.errors) {
        return window.alert(x.errors[0].msg);
      }
      alert("imprimir informacion")
      // Crea una nueva instancia de jsPDF
  window.print();
    })
    .catch((error) => {
      console.log("Esto es un error en Informacion Personal", error);
    });
});

function RadioButtonSeleccionado(name) {
  let rButtonSelect = document.querySelector(`input[name="${name}"]:checked`);
  if (rButtonSelect) {
    
    if(name==='regMatrimonial' && document.getElementById("otro").value) 
      return document.getElementById("otro").value;
    else return rButtonSelect.value;
} else {
    console.log("No ha selecionado  activo", rButtonSelect);
  }
}
function SeleccionarUnRadio(name, value) {
  let rButtonSelect = document.getElementsByName(name);
  rButtonSelect.forEach((radio) => {
    if (radio.value === value) radio.checked = true;
  });
}
async function ObtenerId() {
  let email = window.localStorage.getItem("E");
  const id = await fetch(`http://localhost:8080/api/user/${email}`)
    .then((res) => res.json())
    .catch((error) =>
      console.log("error en obtener el id con el email", error)
    );
  return id.id;
}
/* 

escolaridad:,
 */
