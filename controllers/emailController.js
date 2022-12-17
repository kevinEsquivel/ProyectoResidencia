import nodemailer from'nodemailer';
import { response, request } from"express";

export const enviarEmail = async (req=request,res=response) => {

    const {correo} = req.params;
    const {nombre,mensaje} = req.body;
    // Crea una cuenta de transporte de correo electrónico.
    /*//!
    Inicie sesión en su cuenta de Google Vaya a 
    Mi cuenta> Iniciar sesión y seguridad > 
    Contraseña de la aplicación (Inicie sesión nuevamente para confirmar que es usted) 
    Desplácese hacia abajo para Seleccionar aplicación (en el cuadro de método 
        Contraseña y inicio de sesión) y elija Otro (nombre personalizado ) 
        Dé un nombre a esta contraseña de aplicación, p. "nodemailer" 
        Elija Generar Copie la contraseña generada durante mucho tiempo 
        y péguela en su script Node.js en lugar de su contraseña real de Gmail.
     */
    try {
        let transporter = nodemailer.createTransport({
      service: 'gmail',
      port:process.env.PORT,
      secure:false,
      auth: {
        type:'login',
        user: 'chivatico2@gmail.com',
        pass: 'fgqoevauwgsqmohb' //!Contraseña para el correo conseguida contraseña de aplicacion de google
      }
    });
  
    // Define los detalles del mensaje.
    //!Se debe permitir el acceso a Permitir el acceso de aplicaciones menos seguras en la cuenta se google
    let mailOptions = {
      from: 'chivatico2@gmail.com', //!Correo desde el cual se mandara el correo
      to: 'kevinesauesquivelramirez@gmail.com', //!Correo de la institucion
      subject: 'Mensaje desde PAGINA WEB TRIBUNAL',
      text: `Nombre del solicitante: ${nombre} \n
             Correo de contacto: ${correo} \n 
             MENSAJE:${mensaje}`
    };
  
    // Envia el mensaje.
    let info = await transporter.sendMail(mailOptions);
  
    console.log('Mensaje enviado: %s', info.messageId);
    res.json({msg:`Todo bien:${info.messageId}`})
    }catch(err){console.log(err); res.json({errors:err})}
  }
