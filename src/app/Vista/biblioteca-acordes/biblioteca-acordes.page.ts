import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-biblioteca-acordes',
  templateUrl: './biblioteca-acordes.page.html',
  styleUrls: ['./biblioteca-acordes.page.scss'],
})
export class BibliotecaAcordesPage implements OnInit {
  irPagina() {
    this.router.navigate(['../biblioteca']); 
  }

  serie: string="";

  irPagina2(serie: string) {
    this.router.navigate(['../aprendizaje', { serie: serie }]);
  }
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serie = params['serie'];
    });
  
  }

}
