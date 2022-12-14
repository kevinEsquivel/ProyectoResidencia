const list_group1 = document.querySelector("#list-group-1");
const list_group2 = document.querySelector("#list-group-2");
const list_group3 = document.querySelector("#list-group-3");
const list_group4 = document.querySelector("#list-group-4");
const primerTrimestreLista = document.querySelector(" #primerTrimestre-tab");
const segundoTrimestreLista = document.querySelector("#segundoTrimestre-tab");
const tercerTrimestreLista = document.querySelector(" #tercerTrimestre-tab");
const cuartoTrimestreLista = document.querySelector(" #cuartoTrimestre-tab");

let url = "tipo=Primer Trimestre&año=2022";
window.onload = async () => {
  list_group1.innerHTML = "";
  await fetch(`http://localhost:8080/api/pdf/seccion/Financiero?${url}`)
    .then(async (res) => {
      let x = await res.json();
      //console.log(x);
      for (let i = 0; i < x.total; i++) {
        cargarLinks(x.pdfs[i], list_group1);
      }
    })
    .catch((err) => console.log(err));
};

const btn2022 = document.querySelector(`#btn2022`);
const btn2021 = document.querySelector(`#btn2021`);
const btn2020 = document.querySelector(`#btn2020`);
const btn2019 = document.querySelector(`#btn2019`);
const btn2018 = document.querySelector(`#btn2018`);
const btn2017 = document.querySelector(`#btn2017`);

btn2022.addEventListener("click", () => {
  desactivarBotones(btn2022);
});

btn2021.addEventListener("click", () => {
    desactivarBotones(btn2021);

  });
  btn2020.addEventListener("click", () => {
    desactivarBotones(btn2020);

  });
  btn2019.addEventListener("click", () => {
    desactivarBotones(btn2019);
  });
  btn2018.addEventListener("click", () => {
    desactivarBotones(btn2018);
  });
  btn2017.addEventListener("click", () => {
    desactivarBotones(btn2017);
  });
  
  
primerTrimestreLista.addEventListener("click", async () => {
  list_group1.innerHTML = "";
  if(btn2022.classList.contains("active")) url="tipo=Primer Trimestre&año=2022";
  if(btn2021.classList.contains("active")) url="tipo=Primer Trimestre&año=2021";
  if(btn2020.classList.contains("active")) url="tipo=Primer Trimestre&año=2020";
  if(btn2019.classList.contains("active")) url="tipo=Primer Trimestre&año=2019";
  if(btn2018.classList.contains("active")) url="tipo=Primer Trimestre&año=2018";
  if(btn2017.classList.contains("active")) url="tipo=Primer Trimestre&año=2017";
  fetchs(url,list_group1);
  
});
segundoTrimestreLista.addEventListener("click", async () => {
  list_group2.innerHTML = "";
  if(btn2022.classList.contains("active")) url="tipo=Segundo Trimestre&año=2022";
  if(btn2021.classList.contains("active")) url="tipo=Segundo Trimestre&año=2021";
  if(btn2020.classList.contains("active")) url="tipo=Segundo Trimestre&año=2020";
  if(btn2019.classList.contains("active")) url="tipo=Segundo Trimestre&año=2019";
  if(btn2018.classList.contains("active")) url="tipo=Segundo Trimestre&año=2018";
  if(btn2017.classList.contains("active")) url="tipo=Segundo Trimestre&año=2017";
  fetchs(url,list_group2);
  
});
tercerTrimestreLista.addEventListener("click", async () => {
  list_group3.innerHTML = "";
  if(btn2022.classList.contains("active")) url="tipo=Tercer Trimestre&año=2022";
  if(btn2021.classList.contains("active")) url="tipo=Tercer Trimestre&año=2021";
  if(btn2020.classList.contains("active")) url="tipo=Tercer Trimestre&año=2020";
  if(btn2019.classList.contains("active")) url="tipo=Tercer Trimestre&año=2019";
  if(btn2018.classList.contains("active")) url="tipo=Tercer Trimestre&año=2018";
  if(btn2017.classList.contains("active")) url="tipo=Tercer Trimestre&año=2017";
  fetchs(url,list_group3);
  
});
cuartoTrimestreLista.addEventListener("click", async () => {
  list_group4.innerHTML = "";
  if(btn2022.classList.contains("active")) url="tipo=Cuarto Trimestre&año=2022";
  if(btn2021.classList.contains("active")) url="tipo=Cuarto Trimestre&año=2021";
  if(btn2020.classList.contains("active")) url="tipo=Cuarto Trimestre&año=2020";
  if(btn2019.classList.contains("active")) url="tipo=Cuarto Trimestre&año=2019";
  if(btn2018.classList.contains("active")) url="tipo=Cuarto Trimestre&año=2018";
  if(btn2017.classList.contains("active")) url="tipo=Cuarto Trimestre&año=2017";
  fetchs(url,list_group4);
  
});
async function fetchs(url,list_group){
    console.log(url);
    await fetch(
        `http://localhost:8080/api/pdf/seccion/Financiero?${url}`
      )
        .then(async (res) => {
          let x = await res.json();
          
          if(x.total === 0) list_group.innerHTML=`<h2 style="margin:20px;">No se encuentran los elementos seleccionados</h2>`
          for (let i = 0; i < x.total; i++) {
            cargarLinks(x.pdfs[i], list_group);
          }
        })
        .catch((err) => console.log(err));
}
function cargarLinks(x, list_group) {
    
  let _listGroupItem = document.createElement("li");
  _listGroupItem.className = "list-group-item";
  list_group.appendChild(_listGroupItem);
  let _aRef = document.createElement("a");
  _aRef.href = `/archivos/${x.seccion}/${x.nombre}`;
  _aRef.target = "_blank";

  _aRef.textContent = x.nombre;

  _listGroupItem.appendChild(_aRef);
}
function desactivarBotones(boton) {
    btn2017.classList.remove("active");
    btn2018.classList.remove("active");
    btn2019.classList.remove("active");
    btn2020.classList.remove("active");
    btn2021.classList.remove("active");
    btn2022.classList.remove("active");
  
    boton.classList.add("active");
  }
  
