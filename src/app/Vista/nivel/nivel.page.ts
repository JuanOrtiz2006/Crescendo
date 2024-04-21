import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.page.html',
  styleUrls: ['./nivel.page.scss'],
})
export class NivelPage implements OnInit {
  pagina: any;  // Variable para almacenar el parámetro 'encender'
  notas: string[] = ["../../../assets/Imagenes/N/Do.svg", "../../../assets/Imagenes/N/Re.svg", "../../../assets/Imagenes/N/Mi.svg",
                    "../../../assets/Imagenes/N/Fa.svg", "../../../assets/Imagenes/N/Sol.svg", "../../../assets/Imagenes/N/La.svg", 
                    "../../../assets/Imagenes/N/Si.svg"];
  acordes: string[] = ["../../../assets/Imagenes/Do.svg", "../../../assets/Imagenes/Re.svg", "../../../assets/Imagenes/Mi.svg", 
                      "../../../assets/Imagenes/Fa.svg", "../../../assets/Imagenes/Sol.svg", "../../../assets/Imagenes/La.svg", 
                      "../../../assets/Imagenes/Si.svg", "../../../assets/Imagenes/Dom.svg", "../../../assets/Imagenes/Rem.svg", 
                      "../../../assets/Imagenes/Mim.svg", "../../../assets/Imagenes/Fam.svg", "../../../assets/Imagenes/Solm.svg",
                      "../../../assets/Imagenes/Lam.svg", "../../../assets/Imagenes/Sim.svg"];
                    
  constructor(private db: Firestore, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Suscríbete a los parámetros de la ruta para obtener 'encender'
    this.route.params.subscribe(params => {
      this.pagina = params['encender'];  // Almacena el valor de 'encender' en la variable 'pagina'
    });
  }

  irPagina() {
    this.router.navigate(['../inicio']);
  }
}
