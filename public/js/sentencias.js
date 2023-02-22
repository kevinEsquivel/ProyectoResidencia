const magistrados = document.querySelector("#magistrados");
const tipo = document.querySelector("#tipo");
const año = document.querySelector("#año");
const mes = document.querySelector("#mes");
const btnBuscar = document.querySelector("#Button");


const contenedor = document.querySelector("#cont_pdf");

window.onload = async () => {
    await fetch(`http://localhost:8080/api/pdf/seccion/Sentencias`)
        .then( async res => {
                let x = await res.json();
                
                for (let i = 0; i < x.total; i++) {
                  llenarTarjetas(x.pdfs[i]);
                }
        })
        .catch((err) => console.log(err))

}

btnBuscar.addEventListener("click", () => {
  //console.log("YA");
  contenedor.innerHTML='';//limpiando div para llenar con los datos correspondientes,
  let s='';
  if(tipo[tipo.selectedIndex].value !== '0') 
    s+= `tipo=${tipo[tipo.selectedIndex].value}`

  if(magistrados[magistrados.selectedIndex].value !== '0')
    s===''?s+= `magistrado=${magistrados[magistrados.selectedIndex].value}`:s+= `&magistrado=${magistrados[magistrados.selectedIndex].value}`

  if(año[año.selectedIndex].value !== '0') 
    s===''?s+= `año=${año[año.selectedIndex].value}`:s+= `&año=${año[año.selectedIndex].value}`

  if(mes[mes.selectedIndex].value !== '0') 
    s===''?s+= `mes=${mes[mes.selectedIndex].value}`:s+= `&mes=${mes[mes.selectedIndex].value}`
//!si S esta vacio que recarge la pagina mas fácil
  if(s==='') return window.location.reload();
  //*tipo=JIN&magistrado=Lic. Rubén Flores Portillo&año=2019&mes=9
   fetch(`http://localhost:8080/api/pdf/seccion/Sentencias?${s}`)
    .then(async res => {
      let x = await res.json();

      if(x.total === 0) contenedor.innerHTML = '<h2>No se encuentra el pdf</h2>'

      for (let i = 0; i < x.total; i++) {
        llenarTarjetas(x.pdfs[i]);
      }
})
    .catch((error) => console.log("error en Sentencias pdfs")); 
});

//*======================FUNCIONES DE USO PUBLICO ================================== */
function llenarTarjetas(x) {
  contenedor.style.overflowY="scroll";

    let divCol = document.createElement("a");
    divCol.classList.add("col","card-col");
    divCol.href=`/archivos/${x.seccion}/${x.nombre}`;
    divCol.target='_blank';
    /* divCol.addEventListener("click", () => {
      console.log("Click");
      OpenPdf(x)
    }); */
    contenedor.append(divCol)

    let _Card = document.createElement("div");
    _Card.classList.add("card");
    _Card.style.width="261px";
    _Card.style.height="260px";
    divCol.appendChild(_Card)

    let divImage = document.createElement("div");
    divImage.classList.add("img");
    _Card.appendChild(divImage)

    let img = document.createElement("img");
    img.src="../assets/imagen_2022-04-25_225224571-removebg-preview.png"
    img.classList.add("card-img-top");
    img.style.width  = "200px";
    img.style.height = "65px";
    divImage.appendChild(img)

    let _card_body = document.createElement("div");
    _card_body.classList.add("card-body");
    _card_body.style.width  = "260px";
    _card_body.style.height = "75px";
    _Card.appendChild(_card_body);


    let _card_title = document.createElement("h5");
    _card_title.classList.add("card-title");
    _card_title.innerText=`${x.nombre}`;
    _card_body.appendChild(_card_title)

    let _card_text = document.createElement("p");
    _card_text.classList.add("card-text");
    _card_text.innerText=`${x.magistrado}`;
    _card_body.appendChild(_card_text)
    
}

function OpenPdf(x){
  console.log(`../archivos/${x.seccion}/${x.nombre}`);
  window.open(`/public/archivos/${x.seccion}/${x.nombre}`, "_blank");
  //window.open("usuarios.html", "_self");

}

//export {llenarTarjetas}