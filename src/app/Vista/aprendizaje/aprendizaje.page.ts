import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-aprendizaje',
  templateUrl: './aprendizaje.page.html',
  styleUrls: ['./aprendizaje.page.scss'],
})
export class AprendizajePage implements OnInit {
  serie: string = '';

  irPagina(serie:string) {
    this.router.navigate(['../biblioteca-acordes',{ serie: serie }]); 
  }

  irPagina2() {
    this.router.navigate(['../biblioteca']); 
  }

  notas =['../../../assets/Imagenes/Do Mayor.svg', 
          '../../../assets/Imagenes/Re Mayor.svg', 
          '../../../assets/Imagenes/Mi Mayor.svg', 
          '../../../assets/Imagenes/Fa Mayor.svg', 
          '../../../assets/Imagenes/Sol Mayor.svg', 
          '../../../assets/Imagenes/La Mayor.svg', 
          '../../../assets/Imagenes/Si Mayor.svg'];

  acordes=['../../../assets/Imagenes/Do Mayor.svg', 
          '../../../assets/Imagenes/Re Mayor.svg', 
          '../../../assets/Imagenes/Mi Mayor.svg', 
          '../../../assets/Imagenes/Fa Mayor.svg', 
          '../../../assets/Imagenes/Sol Mayor.svg', 
          '../../../assets/Imagenes/La Mayor.svg', 
          '../../../assets/Imagenes/Si Mayor.svg'];

  acordesM=['../../../assets/Imagenes/Do menor.svg', 
            '../../../assets/Imagenes/Re Menor.svg', 
            '../../../assets/Imagenes/Mi Menor.svg', 
            '../../../assets/Imagenes/Fa Menor.svg', 
            '../../../assets/Imagenes/Sol Menor.svg', 
            '../../../assets/Imagenes/La Menor.svg', 
            '../../../assets/Imagenes/Si Menor.svg'];
  

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serie = params['serie'];
    });
  
  }
}
