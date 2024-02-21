import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/Servicio/autenticacion.service';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
 
  errorRegistro: boolean = false; // Variable para controlar la visibilidad del mensaje de error

  constructor(public AutenticacionService: AutenticacionService, private router:Router,     private alertController: AlertController
    ) { }

  async iniciarSesion(formulario: NgForm) {
    try {
      await this.AutenticacionService.iniciarSesion(formulario.value.correo, formulario.value.clave);
      console.log("Usuario registrado");
      this.router.navigate(['../inicio']); // Ajusta la ruta según tu estructura
    } catch (error) {
      console.log("Error al iniciar sesion");
      this.mostrarAlerta("Error al iniciar sesion", "Registrate o ingresa el usuario o contraseña correcta.");
    }
  }

  async registrarUsuario(formulario: NgForm) {
    try {
      await this.AutenticacionService.registrarUsuario(formulario.value.correo, formulario.value.clave);
      console.log("Usuario registrado");
    } catch (error) {
      console.log("Error al registrar usuario");
      this.mostrarAlerta("Error al registrar usuario", "Ingrese un correo valido, o una contraseña con 6 o mas digitos.");
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
