
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
  let id_user = "634b470f4c0af45eb9ca6344";

  const id = await fetch(`http://localhost:8080/api/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res=> res.json())
    console.log(id);


  let tipo =selectT.selectedIndex !== -1 ? selectT[selectT.selectedIndex].value : "";
  if (files !== null) {
    for (const file of files) {
      
      const uploadPath = await uploadFile(file);

      //nombre, ruta, magistrado, seccion, tipo
      if (!fecha.value) alert("Seleccionar una fecha");
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
      })
        .then((res) => {
          alert("Documento Guardado");
          return window.open("PDF.html", "_self");
        })
        .catch((error) => {
          console.log("Esto es un error en al guardar PDFs", error);
        });
      console.log(data);
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
  formData.append("file", file);

  let x;
  await fetch("http://localhost:8080/api/pdf/upload", {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      x = await res.json();
    })
    .catch((error) => {
      console.log("Esto es un error en Subir PDFs", error);
    });
  console.log(x.uploadPath);
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
