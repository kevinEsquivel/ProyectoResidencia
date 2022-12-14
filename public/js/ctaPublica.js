const ctaPublica = document.querySelector("#ctaPublica");
const btn2022 = document.querySelector(`#btn2022`);
const btn2021 = document.querySelector(`#btn2021`);
const btn2020 = document.querySelector(`#btn2020`);

btn2022.addEventListener("click", () => {
    
    desactivarBotones(btn2022);
    fetchs('año=2021')
  });
  
  btn2021.addEventListener("click", () => {
    
      desactivarBotones(btn2021);
      fetchs('año=2020')
  
    });
    btn2020.addEventListener("click", () => {
    
      desactivarBotones(btn2020);
      fetchs('año=2019') //*No se porque si funciona con la 
                        //*fecha anterior alomejor porque el es el primero de enero
    });
window.onload = async () => {
    fetchs('año=2020');
}

async function fetchs(url){
    ctaPublica.innerHTML='';
    await fetch(
        `http://localhost:8080/api/pdf/seccion/CTA-Publica?${url}`
      )
        .then(async (res) => {
          let x = await res.json();
          
          if(x.total === 0) list_group.innerHTML=`<h2 style="margin:20px;">No se encuentran los elementos seleccionados</h2>`
          for (let i = 0; i < x.total; i++) {
            cargarLinks(x.pdfs[i]);
          }
        })
        .catch((err) => console.log(err));
}
function desactivarBotones(boton) {
   /*  btn2017.classList.remove("active");
    btn2018.classList.remove("active");
    btn2019.classList.remove("active"); */
    btn2020.classList.remove("active");
    btn2021.classList.remove("active");
    btn2022.classList.remove("active");
  
    boton.classList.add("active");
  }
function cargarLinks(x) {
    
    let _listGroupItem = document.createElement("div");
    _listGroupItem.className = "row";
    ctaPublica.appendChild(_listGroupItem);
    let _nombre = document.createElement("div");
    _nombre.classList.add("col-8","col-sm-8");
    _nombre.textContent=x.nombre;
    _listGroupItem.appendChild(_nombre);
    let _descargar = document.createElement("div");
    _descargar.classList.add("col-8","col-sm-4");
    _listGroupItem.appendChild(_descargar);
    let _ref = document.createElement("a");
    _ref.textContent="Descargar";
    _ref.href = `/archivos/${x.seccion}/${x.nombre}`;
    _ref.target = "_blank";
     _descargar.appendChild(_ref);
  }
/* <div class="row">
    <div class="col-8 col-sm-8">Medios oficiales de difusión</div>
    <div class="col-8 col-sm-4"><a href="#">Descargar</a></div>
</div> */