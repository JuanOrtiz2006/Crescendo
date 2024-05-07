import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';//Importacion de libreria para alertas
import { AutenticacionService } from 'src/app/Servicio/autenticacion.service';//Importacion del servicio
import { Router} from '@angular/router'; //Importacion de libreriar de enrutamiento
import { NgForm } from '@angular/forms'; //Importacion de libreriar de ngForm
import { Database, object, ref, set } from '@angular/fire/database';
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  errorRegistro: boolean = false; // Variable para controlar la visibilidad del mensaje de error
  rout:any; //variable para la ruta de lectura y excritura de la RTDB
  constructor(private database:Database, public AutenticacionService: AutenticacionService, private router:Router, private alertController: AlertController) {
  }
  ngOnInit() {}
  ruta(){
    this.router.navigate(['../inicio-sesion']); 
  }
  async registrarUsuario(formulario: NgForm) {
    try {
      const userCredential = await this.AutenticacionService.registrarUsuario(formulario.value.correo, formulario.value.clave);
      this.mostrarAlerta("Bienvenido!","Felicidades, te haz registrado correctamente, inicia sesion para empezar ");
      if (userCredential) {
        // Accede a la propiedad `user` del objeto `UserCredential`
        const user = userCredential.user;
        // Obtén el `uid` del usuario autenticado
        const uid = user.uid;
        // Muestra el `uid` en la consola
        console.log('UID del usuario autenticado:', uid);
        this.rout = set(ref(this.database, 'Usuarios/'+uid+'/nombre'), formulario.value.nombre);//Esvribe el indice en la RTDB
        this.rout = set(ref(this.database, 'Usuarios/'+uid+'/correo'), formulario.value.correo);//Esvribe el indice en la RTDB
      }   
    } catch (error) {
      this.manejarError(error, "registro");
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