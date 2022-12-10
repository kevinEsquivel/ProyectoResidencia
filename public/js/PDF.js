const drop = document.querySelector(".drop");
const btn = drop.querySelector("#button");
const btnGuardar = document.querySelector("#btnGuardar");
const ventanaArchivo = drop.querySelector("#input-file");
const dragText = drop.querySelector(".drag-text");

//*Referencias a Selects
const selectP = document.querySelector("#slctArchivo");
const Depende = document.querySelector("#Depende");
const selectT = document.querySelector("#selectT");
const selectM = document.querySelector("#magistrado");

const fecha = document.querySelector("#fecha");

let files = null;
btn.addEventListener("click", (e) => {
  /* abrir ventana para selecionar el archivo */

  ventanaArchivo.click();
});

//! SECCION PARA RECOLECTAR Y GUARDAR TODO EN MONGO DB
selectP.addEventListener("change", () => {
  let array;
  switch (selectP[selectP.selectedIndex].value) {
    case "privacidad":
      //!ESTO lo podria guardar en la bd
      limpiar();
      array = [
        "El marco normativo aplicable al sujeto obligado",
        "Su estructura orgánica completa",
        "Las facultades de cada Área",
        "Las metas y objetivos de las Áreas de conformidad con sus programas operativos",
        "Los indicadores relacionados con temas de interés público o trascendencia social",
      ];
      array.sort();
      addOptions(array);
      Depende.style.visibility = "visible";
      break;
    case "Sentencias":
      limpiar(); //Para limpiar el select y no se acumulen las opciones
      array = ["AP", "JIN", "JDCN", "MII", "PES", "RV"];
      array.sort();
      addOptions(array);
      Depende.style.visibility = "visible";
      break;
      case "Financiero":
        limpiar(); //Para limpiar el select y no se acumulen las opciones
        array = ["Primer Trimestre", "Segundo Trimestre", "Tercer Trimestre","Cuarto Trimestre"];
        array.sort();
        addOptions(array);
        Depende.style.visibility = "visible";
        break;  
    default:
      Depende.style.visibility = "hidden";
      break;
  }
});
const limpiar = () => {
  for (let i = selectT.options.length; i >= 0; i--) {
    selectT.remove(i);
  }
};
function addOptions(array) {
  for (value in array) {
    option = document.createElement("option");
    option.text = array[value];
    selectT.add(option);
  }
}
btnGuardar.addEventListener("click", async (e) => {
  //!esto se tendria que determinar automaticamente
  let id_user = "";
  let email = window.localStorage.getItem("E");
  const id = await fetch(`http://localhost:8080/api/user/${email}`).then(
    (res) => res.json()
  ).catch(error => console.log("error en obtener el id con el email"))
  id_user = id.id;
  //console.log(id_user,email);
  let tipo =
    selectT.selectedIndex !== -1 ? selectT[selectT.selectedIndex].value : "";
  if (files !== null) {
    if (!fecha.value) return alert("Seleccionar una fecha");
    else {
      for (const file of files) {
        const uploadPath = await uploadFile(file);

        //nombre, ruta, magistrado, seccion, tipo

        data = {
          nombre: file.name,
          ruta: uploadPath,
          fecha: fecha.value,
          magistrado: selectM[selectM.selectedIndex].value,
          seccion: selectP[selectP.selectedIndex].value,
          tipo,
          id_user,
        };
        
        await fetch(`http://localhost:8080/api/pdf/upload/${id_user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).catch((error) => {
          console.log("Esto es un error en al guardar PDFs", error);
        });
      }
      alert("Documento Guardado");
      return window.open("PDF.html", "_self");
    }
  } else {
    alert("Agregar Documentos");
  }

  //||
});
/* cada que cambien el valor se hara algo */
ventanaArchivo.addEventListener("change", (e) => {
  files = Array.from(event.target.files);
  showFiles(files);
});

/* PARA CUANDO SE ARRASTRA EL ARCHIVO */
drop.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragText.textContent = "Suelta archivos a cualquier";
});

/* PARA CUANDO SE ARRASTRA EL ARCHIVO  pero no dentro de drop*/
drop.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dragText.textContent = "Arrastra archivos a cualquier ";
});

/* PARA CUANDO SE sueltan EL ARCHIVO  dentro de DROP*/
drop.addEventListener("drop", (e) => {
  e.preventDefault();
  files = Array.from(e.dataTransfer.files);
  showFiles(files);
  console.log(files);
  dragText.textContent = "Arrastra o agrega los archivos a cualquier ";
});
/* Para verificar si hay archivos y procesarlos */

function showFiles(files) {
  if (files.length === undefined) {
    processFile(files);
  } else {
    let num = Number(files.length);

    for (const file of files) {
      processFile(file, num - 1);

      num = num - 1;
    }
  }
}

function processFile(file, num) {
  const docType = file.type;
  const validationExtensions = "application/pdf";

  if (validationExtensions.includes(docType)) {
    //archivo valido
    /* Permite leer propiedades del archivo ejemplo nombre,url,etc. */
    const fileReader = new FileReader();
    /* Uso el id para hacer referencia a los archivos */
    //const id = `file-${Math.random().toString(32).substring(7)}`;

    fileReader.addEventListener("load", (e) => {
      //const fileUrl = FileReader.result;

      const pdf = `
        <div id="file-container${num}" class="file ">
            <span id="${num}">${file.name}</span>
            <span class="status-text">Loading...</span>
            <button
                      type="button"
                      class="btn-close"
                      onClick="onClick(${num})"
                      style="width: 25px; height: 25px"
            >X</button>
        </div>
        `;

      const html = document.querySelector("#preview").innerHTML;
      document.querySelector("#preview").innerHTML = pdf + html;
    });

    fileReader.readAsDataURL(file);
  } else {
    //archivo no valido
    alert("Archivos permitidos: PDF");
  }
}
/*PARA SUBIR LOS ARCHIVOS AL SERVIDOR 
https://www.youtube.com/watch?v=qWFwYLUGWrc&ab_channel=VidaMRR-Diseñoydesarrolloweb
*/
const uploadFile = async (file) => {
  var formData = new FormData();
  
  console.log(file);
  formData.append("file", file);
  let seccion = selectP[selectP.selectedIndex].value;
  
  let x;
  await fetch(`http://localhost:8080/api/pdf/uploadF/${seccion}/${file.name}`, {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      x = await res.json();
    })
    .catch((error) => {
      console.log("Esto es un error en Subir PDFs", error);
    });
  //console.log(x.uploadPath);
  return x.uploadPath;
  //document.querySelector(`#${id}`).innerHTML=`<span class = "success">Archivo subido correctamente</span>`;
};

/*QUITAR  ARCHIVO CUANDO SE PRESIONA LA X */
function onClick(id) {
  //const doc = document.getElementById(id);
  //const newFiles = files.filter((file) => file.name !== doc.textContent)
  //Para borrar un Elemento por su ID
  document.querySelector("#file-container" + id).remove();
}

//!======================= PARA LA TABLA DE PDFS Y MOSTRARLOS ========================!//
const btnMostar = document.querySelector("#mostrarPdf-tab");
//* Cargar la tabla para los pdf y se puedan eliminar
btnMostar.addEventListener("click", () => {
  console.log("cargando");
  fetch(`http://localhost:8080/api/pdf/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      const res = await response.json();
      const { pdfs, total } = res;
      const x = res;
      //console.log(res);
      if (x.errors) {
        return window.alert("Error en la tabla, verificar codigo de usuarios");
      }

      for (let i = 0; i < total; i++) {
        console.log(pdfs);

        const num = await fetch(`http://localhost:8080/api/user/id/${pdfs[i].id_user}`)
        .then((res) => res.json());
        //console.log(num.nombre, typeof(num));
        tBody.innerHTML +=
          `<tr>
          <td>` +
          (i + 1) +
          `</td>
          <td>` +
          pdfs[i].nombre +
          `</td>
          <td>` +
          pdfs[i].fecha +
          `</td>
          <td>` +
          pdfs[i].seccion +
          `</td>
          <td>` +
          pdfs[i].tipo +
          `</td>
          <td>` +
          pdfs[i].magistrado +
          `</td>
          <td>` +
          num.nombre+
          `</td>
          <td><i id="` +
          pdfs[i].uid +
          `" class="fa-solid fa-trash fa-2x" onclick="Delete(this.id);"></i></td>
        </tr>`;
      }
      return console.log("TODO BIEN");
    })
    .catch((error) => {
      console.log("Ha resultado un error: ", error);
    });
});

function Delete(id){
  const mensaje = confirm("Seguro de borrar el PDF");
  
  if (mensaje) {
     fetch(`http://localhost:8080/api/pdf/upload/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=> {
      alert("Archivo Pdf borrado")
      return window.open("PDF.html", "_self");
    });
    
  }
}