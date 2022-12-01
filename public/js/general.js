/*Cambiar de pagina a html aqui deberia ir la verificacion */
let modal = document.querySelector(".modal-footer");
let btnLogin = modal.querySelector(".btn");
let email = document.querySelector("#exampleFormControlInput1");
let password = document.querySelector("#inputPassword");

btnLogin.addEventListener("click", (e) => {
 let data={ email: email.value, password: password.value }
 
 if(!data.email || !data.password) {
  return window.alert("Favor de ingresar un correo y contraseña correctos");
}

   fetch(`http://localhost:8080/api/user/${email.value}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
  .then(async (response)=>{
    const x = await response.json();
    
    if(x.errors){
      return window.alert("Favor de ingresar un correo y contraseña correctos");
    } 

    window.localStorage.setItem("E", data.email);
  
    
    
    return window.open("../html/administracion/calendario.html", "_self");
    
  })
  .catch((error)=>{ return console.log("Esto es un error en GENERAL",error);})

  //  
});
function logOut(){localStorage.removeItem('E');}
