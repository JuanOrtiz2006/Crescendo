import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/Servicio/autenticacion.service';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Database, object, ref, set } from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';
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
    await this.storage.create();
  }
  async iniciarSesion(formulario: NgForm) {
    try {
      const userCredential = await this.AutenticacionService.iniciarSesion(formulario.value.correo, formulario.value.clave);
      // Verifica si la autenticación fue exitosa
      if (userCredential) {
          // Accede a la propiedad `user` del objeto `UserCredential`
          const user = userCredential.user;
          // Obtén el `uid` del usuario autenticado
          const uid = user.uid;
          //Guarda el uid en el local storage
          this.storage.set("id", uid);
          this.router.navigate(['..//inicio']);
      }          
    } catch (error) {
      this.manejarError(error, "inicio");
    }
  }
  async manejarError(error: any, tipo: string) {
    let mensaje = "";
    switch (error.code) {
      case 'auth/email-already-in-use':
        mensaje = "El correo electrónico ya está en uso. Por favor, intenta con otro correo.";
        break;
      case 'auth/invalid-email':
        mensaje = "El correo electrónico ingresado no es válido.";
        break;
        case 'auth/invalid-credential':
          mensaje = "La contrseña ingresado no es válida.";
          break;
      case 'auth/weak-password':
        mensaje = "La contraseña es demasiado débil. Intenta con una contraseña más segura.";
        break;
      case 'auth/user-not-found':
        mensaje = "No se encontró una cuenta con el correo electrónico proporcionado.";
        break;
      case 'auth/wrong-password':
        mensaje = "La contraseña es incorrecta. Por favor, verifica tu contraseña.";
        break;
      default:
        mensaje = "Se produjo un error durante el proceso de " + error.code + ".";
        break;
    }
    await this.mostrarAlerta("Error de " + tipo, mensaje);
  } 
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}