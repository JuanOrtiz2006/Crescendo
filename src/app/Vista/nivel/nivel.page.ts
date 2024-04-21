import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Database, object, ref, set } from '@angular/fire/database';
@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.page.html',
  styleUrls: ['./nivel.page.scss'],
})
export class NivelPage implements OnInit {
  pagina: any;  // Variable para almacenar el parámetro 'encender'
  led: any;
  rout:any;

  notas: any[] = ["../../../assets/Imagenes/N/Do.svg", "../../../assets/Imagenes/N/Re.svg", "../../../assets/Imagenes/N/Mi.svg",
                    "../../../assets/Imagenes/N/Fa.svg", "../../../assets/Imagenes/N/Sol.svg", "../../../assets/Imagenes/N/La.svg", 
                    "../../../assets/Imagenes/N/Si.svg"];
  acordes: any[] = ["../../../assets/Imagenes/Do.svg", "../../../assets/Imagenes/Re.svg", "../../../assets/Imagenes/Mi.svg", 
                      "../../../assets/Imagenes/Fa.svg", "../../../assets/Imagenes/Sol.svg", "../../../assets/Imagenes/La.svg", 
                      "../../../assets/Imagenes/Si.svg", "../../../assets/Imagenes/Dom.svg", "../../../assets/Imagenes/Rem.svg", 
                      "../../../assets/Imagenes/Mim.svg", "../../../assets/Imagenes/Fam.svg", "../../../assets/Imagenes/Solm.svg",
                      "../../../assets/Imagenes/Lam.svg", "../../../assets/Imagenes/Sim.svg"];
                    
  constructor(private database:Database, private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    const route = ref(this.database, 'Notas' );
      object(route).subscribe(attributes => {
        const dato = attributes.snapshot.val();

      });
    // Suscríbete a los parámetros de la ruta para obtener 'encender'
    this.route.params.subscribe(params => {
      this.pagina = params['encender'];  // Almacena el valor de 'encender' en la variable 'pagina'
    });
  }
  irPagina() {
    this.router.navigate(['../inicio']);
  }

  onSlideChange(event: any) {
    const activeIndex = event.detail.map((item: { activeIndex: any; }) => item.activeIndex)[0];
    this.led= activeIndex;
    console.log('Índice del slide activo:', this.led);
    this.rout = set(ref(this.database,'Notas') , this.led);
    
  }
  
}
