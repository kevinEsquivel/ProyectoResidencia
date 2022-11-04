const drop = document.querySelector(".drop");
const btn = drop.querySelector("#button");
const btnGuardar = document.querySelector("btnGuardar")
const ventanaArchivo = drop.querySelector("#input-file");
const dragText = drop.querySelector(".drag-text");

btn.addEventListener("click", (e) => {
  /* abrir ventana para selecionar el archivo */

  ventanaArchivo.click();
});
btnGuardar.addEventListener("click", (e) => {
  alert("El archivo se guardo");
});
/* cada que cambien el valor se hara algo */
ventanaArchivo.addEventListener("change", (e) => {
  const files = Array.from(event.target.files);
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
    const id = `file-${Math.random().toString(32).substring(7)}`;

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
  const formData = new FormData();
  formData.append("file", file);

  await fetch("http://localhost:8080/api/pdf/upload", {
    method: "POST",
    body: formData,
  }).catch((error) => {
    console.log("Esto es un error en PDFs", error);
  });

  //document.querySelector(`#${id}`).innerHTML=`<span class = "success">Archivo subido correctamente</span>`;
};

/*QUITAR  ARCHIVO CUANDO SE PRESIONA LA X */
function onClick(id) {
  //const doc = document.getElementById(id);
  //const newFiles = files.filter((file) => file.name !== doc.textContent)
  //Para borrar un Elemento por su ID
  document.querySelector("#file-container" + id).remove();
}
