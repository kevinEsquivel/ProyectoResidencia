
fetch(`http://localhost:8080/api/user/`, {
    method: "GET",
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
    
  })
  .catch((error)=>{console.log("ESTO ES UN ERROr",error);})

  //  
