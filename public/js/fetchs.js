 //*! FETCHS PARA TODO*/

 //*GENERAL
 
const fetchObtenerUsuario= async function(url,email,data){
    fetch(`${url}/${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
  .then(async (response)=>{
    const x = await response.json();
    console.log(x);
    if(x.errors){
      return window.alert("Favor de ingresar un correo y contraseña correctos");
    } 
    console.log("FIN");
    return window.open("../html/administracion/calendario.html", "_self");
    
  })
  .catch((error)=>{console.log("ESTO ES UN ERROr",error);})
}

module.exports ={
    fetchObtenerUsuario
}
