import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';//Importacion de librerias para alertas
import { AutenticacionService } from 'src/app/Servicio/autenticacion.service';//Importacion del servicio
import { Router} from '@angular/router';//Importacion de la libreria de enrutamiento
import { NgForm } from '@angular/forms';//Importacion de la librerias de ngForm
import { Database, object, ref, set } from '@angular/fire/database';//Importacion de librerias de Firebase
import { Storage } from '@ionic/storage-angular';//Importacion de las librerias del localStorsge
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  errorRegistro: boolean = false; // Variable para controlar la visibilidad del mensaje de error
  rout:any; //variable para la ruta de lectura y excritura de la RTDB
  constructor(private database:Database, public AutenticacionService: AutenticacionService, private router:Router, private alertController: AlertController, private storage:Storage) { }
  async ngOnInit() {
  }
  regreso(){
    this.router.navigate(['../registro-usuario']);
  }
  async iniciarSesion(formulario: NgForm) {
    try {
      const userCredential = await this.AutenticacionService.iniciarSesion(formulario.value.correo, formulario.value.clave);//Identifica el usuario en la RTDB
      if (userCredential) {// Verifica si la autenticación fue exitosa
          const user = userCredential.user;// Accede a la propiedad `user` del objeto `UserCredential`
          const uid = user.uid;// Obtén el `uid` del usuario autenticado
          const dato=this.storage.set("id", uid);//Guarda el uid en el local storage
          console.log(dato);
          this.router.navigate(['..//inicio']);//Navega hacia la pagina inicio
      }          
    } catch (error) {
      this.manejarError(error, "inicio");
    }
  }
  async manejarError(error: any, tipo: string) {//Metodo para determinar errores
    let mensaje = "";
    switch (error.code) {
      case 'auth/email-already-in-use'://Si el correo ya esta registrado
        mensaje = "El correo electrónico ya está en uso. Por favor, intenta con otro correo.";
        break;
      case 'auth/invalid-email'://Si el correo no es valido
        mensaje = "El correo electrónico ingresado no es válido.";
        break;
        case 'auth/invalid-credential'://Si la contraseña no es valida
          mensaje = "La contrseña ingresado no es válida.";
          break;
      case 'auth/weak-password'://Si es debil
        mensaje = "La contraseña es demasiado débil. Intenta con una contraseña más segura.";
        break;
      case 'auth/user-not-found'://Si no se encuentra la cuenta
        mensaje = "No se encontró una cuenta con el correo electrónico proporcionado.";
        break;
      case 'auth/wrong-password'://Si la contraseña es incorrecta
        mensaje = "La contraseña es incorrecta. Por favor, verifica tu contraseña.";
        break;
      default:
        mensaje = "Se produjo un error durante el proceso de " + error.code + ".";
        console.log(error);
        break;
    }
    await this.mostrarAlerta("Error de " + tipo, mensaje);//Envia mensaje al metodo de Alerta
  } 
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({//Crea una alerta
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}