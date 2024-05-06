import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { InicioPage } from '../Vista/inicio/inicio.page';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  usuarioConectado =false;
  rootPage= InicioPage;
  constructor(private auth: Auth) { }
  registrarUsuario(email: string, contraseña: string) {
    return createUserWithEmailAndPassword(this.auth, email, contraseña);
  }
  iniciarSesion(email: string, contraseña: string){
    return signInWithEmailAndPassword(this.auth,email, contraseña )
  }
}