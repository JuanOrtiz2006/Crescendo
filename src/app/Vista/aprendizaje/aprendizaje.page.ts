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

  notas =['../../../assets/Imagenes/AcordeDom.jpg', 
          '../../../assets/Imagenes/AcordeRem.jpg', 
          '../../../assets/Imagenes/AcordeMim.jpg', 
          '../../../assets/Imagenes/AcordeFam.jpg', 
          '../../../assets/Imagenes/AcordeSolm.jpg', 
          '../../../assets/Imagenes/AcordeLam.jpg', 
          '../../../assets/Imagenes/AcordeSim.jpg'];

  acordes=['../../../assets/Imagenes/AcordeDom.jpg', 
          '../../../assets/Imagenes/AcordeRem.jpg', 
          '../../../assets/Imagenes/AcordeMim.jpg', 
          '../../../assets/Imagenes/AcordeFam.jpg', 
          '../../../assets/Imagenes/AcordeSolm.jpg', 
          '../../../assets/Imagenes/AcordeLam.jpg', 
          '../../../assets/Imagenes/AcordeSim.jpg'];

  acordesM=['../../../assets/Imagenes/AcordeDom.jpg', 
          '../../../assets/Imagenes/AcordeRem.jpg', 
          '../../../assets/Imagenes/AcordeMim.jpg', 
          '../../../assets/Imagenes/AcordeFam.jpg', 
          '../../../assets/Imagenes/AcordeSolm.jpg', 
          '../../../assets/Imagenes/AcordeLam.jpg', 
          '../../../assets/Imagenes/AcordeSim.jpg'];
  

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serie = params['serie'];
    });
  
  }
}
