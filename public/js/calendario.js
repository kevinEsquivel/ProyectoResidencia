const tareas = document.querySelector("#tareas");
const tareas_completadas = document.querySelector("#tareas_completadas");
const column = document.querySelector('.col');

//!ES PARA LA PRIMERA LISTA PENDIENTES
const listaTareas=Sortable.create(
  tareas,
  /*Opciones que quiero que tenga */
  {
    group:{
        name:"lista-tareas",//nombre de la lista
        pull:true,// TRUE si se puede sacar elementos de la lista si tiene clone entonces se copiaria el elemento
        put:true//TRUE para permitir poner elmentos dentro de la lista
    },//permite establecer el nombre del grupo
    animation:200, //tiempo de la animacion en ms
    easing:"cubic-bezier(0.37, 0, 0.63, 1)", //tipo de animacion que hara consultar Consulte https://easings.net/ para ver ejemplos.
    handle:".fa-solid",//el elemento que si se puede mover, es este caso es el icono
    filter:".titulo",//para filtrarlas y que no se puede mover
    /*ES UNA active CLASE DE BOOTSTRAP*/
    ghostClass:"active", //cuando se arrastra se aplica el active y se pone azul
    /* chosenClass:"active"//cuando se da click se aplica el active y se pone azul 
    dragClass:"active"//cuando se da agarra para moverlo se aplica el active y se pone azul */
    store:{
        set:function(sortable){
            //console.log("hola");
            //const orden = [1,2,3,4,5]; //?se puede guardar un arreglo y asi guardar el acomodo
            const orden = sortable.toArray();
            //console.log(orden);
            console.log("TAREAS: "+orden.join('|')+" ARRAY: "+typeof(orden));
            localStorage.setItem('lista-tareas',orden.join('|'));//para guardar el orden de la listaTareas
        },//se ejecuta cada que se cambia el orden, y es para enviar informacion al localStorage
        get:function(){
           const orden=localStorage.getItem('lista-tareas');
           return orden ? orden.split('|') : [];// SI orden EXITE  en localStorage regresas el split SINO entnoces un arrebglo vacio
        }
    }
}
);
//!LISTA DE TAREAS EN PROCESO
const tareasCompletadas=Sortable.create(
    tareas_completadas,
    /*Opciones que quiero que tenga */
    {
      group:{
          name:"lista-tareas",
          pull:true,
          put:true
      },
      animation:200, 
      easing:"cubic-bezier(0.37, 0, 0.63, 1)", 
      handle:".fa-solid",
      filter:".titulo",
      /*ES UNA active CLASE DE BOOTSTRAP*/
      ghostClass:"active",
      store:{
        set:function(sortable){
            //console.log("hola");
            const orden = sortable.toArray();
            //console.log(orden);
            console.log("Lista 1: "+orden.join('|'));
            localStorage.setItem('lista-tareas',orden.join('|'));//para guardar el orden de la listaTareas
        },//se ejecuta cada que se cambia el orden, y es para enviar informacion al localStorage
        get:function(){
           const orden=localStorage.getItem('lista-tareas');
           return orden ? orden.split('|') : [];// SI orden EXITE  en localStorage regresas el split SINO entnoces un arreglo vacio
        }
    } 
  }
  );

  //para bloquear la lita de TAREAS POR COMPLETAR
  /* const btntoggle= document.getElementById("toggle");

  btntoggle.addEventListener("click",() => {
    
    const estado = listaTareas.option('disabled');//!se guarda el estado de disabled--- estoy guardando las opciones de lista tareas
    listaTareas.option('disabled', !estado);
    if(estado){
        btntoggle.textContent="Bloquear";
    }else{
        btntoggle.textContent="Desbloquear";
    }
  }); */
const btnMiembros = document.getElementById('btn-miembros');
const ventana_popup=document.getElementById('ventana-popup');
let a = false;
btnMiembros.addEventListener("click", (e) => {
    console.log("click");
    ventana_popup.style.visibility='visible';
    a=true;
    
}); 
window.addEventListener("click", (e) => {
    if (document.getElementById('ventana-popup').contains(e.target)==false && a==false){
        ventana_popup.style.visibility='hidden';   
      } 
      a=false
});


const AgregarLista = document.getElementById('AgregarLista'); //agregar la lista a la bd y crear la seccion
const cerrar = document.getElementById('cerrarLista');
AgregarLista.addEventListener("click", (e) => {
    document.getElementById('NombrarLista').style.visibility='visible'; 
});

cerrar.addEventListener("click", (e) => {
    document.getElementById('NombrarLista').style.visibility='hidden'; 
 });

/*.................................................................... */
 const agregarTarea = document.querySelector('#agregarTarea');
 const cerrarTarea = document.querySelector('#cerrarTarea');
 agregarTarea.addEventListener("click", (e) => {
    document.getElementById('Nombrar_Tarea').style.visibility='visible'; 
});

cerrarTarea.addEventListener("click", (e) => {
    document.getElementById('Nombrar_Tarea').style.visibility='hidden'; 
 });
 const agregarTarea2 = document.querySelector('#agregarTarea2');
 const cerrarTarea2 = document.querySelector('#cerrarTarea2');
 agregarTarea2.addEventListener("click", (e) => {
    document.getElementById('Nombrar_Tarea2').style.visibility='visible'; 
});

cerrarTarea2.addEventListener("click", (e) => {
    document.getElementById('Nombrar_Tarea2').style.visibility='hidden'; 
 });



//!INSERTAR ELEMENTOS A UN HTMLElement
let tituloInsertar="TITULO INSERTADO"
let textoInsertar="ESTO ES UN TEXTO SACADO DE UNA VARIABLE";
const tareaNueva = document.createElement('div');
tareaNueva.innerHTML=` <h5><i class="fa-solid fa-grip-lines mr-3"></i>${tituloInsertar}</h5>
<p class="mb-0">
  ${textoInsertar}
</p>`;
tareaNueva.className = 'list-group-item';
tareaNueva.id="13";


 document.getElementById('añadirTarea').addEventListener("click", (e) => {
    console.log("click añadirTarea lista 2");
    tareas_completadas.appendChild(tareaNueva);
    console.log("LISTO");
 });