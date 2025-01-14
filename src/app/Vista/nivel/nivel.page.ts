import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Database, object, ref, set } from '@angular/fire/database';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.page.html',
  styleUrls: ['./nivel.page.scss'],
})
export class NivelPage implements OnInit {
  pagina: any;  // Variable para almacenar el parámetro 'encender'
  led: any; //Variables para leer el vector de los niveles
  nivel:number=0;
  led2: any;
  ejercicio:number=0;
  led3:any;
  db:any;
  nota:any;//Guardar en base de datos
  nota2:any;
  rout:any; //variable para la ruta de lectura y excritura de la RTDB
  link:string="";//Variables para las rutas de las imagenes
  link2:string="";
  //Vectores para las rutas de las imagenes
  notas: any[] = ["/N/Do.svg", "/N/Re.svg", "/N/Mi.svg", "/N/Fa.svg", "/N/Sol.svg", "/N/La.svg", "/N/Si.svg"];
  acordes: any[] = ["/Acordes/ADo.svg", "/Acordes/ARe.svg", "/Acordes/AMi.svg", "/Acordes/AFa.svg", "/Acordes/ASol.svg", "/Acordes/ALa.svg", 
                    "/Acordes/ASi.svg", "/Acordes/ADom.svg", "/Acordes/ARem.svg","/Acordes/AMim.svg", "/Acordes/AFam.svg", "/Acordes/ASolm.svg",
                    "/Acordes/ALam.svg", "/Acordes/ASim.svg"];
  constructor(private database:Database, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/inicio') {
          this.rout = set(ref(this.database, 'Notas'), 99);
        }
      }
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {// Suscríbete a los parámetros de la ruta para obtener 'encender'
    this.pagina = params['encender'];  // Almacena el valor de 'encender' en la variable 'pagina'
    });
  }
  irPagina(n:number) {//Metodo para navegacion de pagina
    this.router.navigate(['../inicio']); // Pasar '1' como parámetro
  }
  onSlideChange(event: any) {//Metodo para lectura de slider
    const activeIndex = event.detail.map((item: { activeIndex: any; }) => item.activeIndex)[0];//Obtiene el inice del slider
    try{
      if(this.pagina==1)//Si la pagina es 1
      { 
        this.led = activeIndex; //Le el indice del vector
        this.led = this.led+this.led;
        this.link = this.notas[activeIndex];//Coloca la ruta de la imagen
        if(this.led<=4)
          {
            this.rout = set(ref(this.database, 'Notas'), this.led);//Esvribe el indice en la RTDB
          }
          if(this.led>4)
            {
            this.rout = set(ref(this.database, 'Notas'), this.led-1);//Esvribe el indice en la RTDB
          }
      }
    if(this.pagina==2)
      {
        this.led2=activeIndex;
        this.link2 = this.acordes[activeIndex];
        this.rout = set(ref(this.database, 'Notas'), this.led2+12);    
    } else{}
    if(this.pagina==3){
      if (this.nivel == 0) {
        this.rout = set(ref(this.database, 'Notas'), 99); // Enviar 99 a la base de datos si el nivel es 0
      }
      if(this.nivel==1){
        this.led3=activeIndex;
      this.rout = set(ref(this.database, 'Notas'), this.led3+26);
      }
      if(this.nivel==2){
        this.led3=activeIndex;
      this.rout = set(ref(this.database, 'Notas'), this.led3+27);
      }
    } 
    } catch
    {
      this.rout = set(ref(this.database, 'Notas'), 99);    
    }
  }
  
}