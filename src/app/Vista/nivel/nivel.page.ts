import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Database, ref, set } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.page.html',
  styleUrls: ['./nivel.page.scss'],
})
export class NivelPage implements OnInit {
  pagina: any;  // Variable para almacenar el parámetro 'encender'
  nivel: number = 0;
  link: string = ""; // Variables para las rutas de las imágenes
  link2: string = "";
  links: string[] = []; // Inicializar la propiedad links
  links2: string[] = []; // Inicializar la propiedad links2
  activeIndex: number = -1; // Variable para almacenar el índice activo
  isReturningToInicio: boolean = false; // Variable para evitar actualización inmediata
  // Vectores para las rutas de las imágenes
  notas: string[] = ["/N/Do.svg", "/N/Re.svg", "/N/Mi.svg", "/N/Fa.svg", "/N/Sol.svg", "/N/La.svg", "/N/Si.svg"];
  acordes: string[] = ["/Acordes/ADo.svg", "/Acordes/ARe.svg", "/Acordes/AMi.svg", "/Acordes/AFa.svg", "/Acordes/ASol.svg", "/Acordes/ALa.svg", 
                       "/Acordes/ASi.svg", "/Acordes/ADom.svg", "/Acordes/ARem.svg","/Acordes/AMim.svg", "/Acordes/AFam.svg", "/Acordes/ASolm.svg",
                       "/Acordes/ALam.svg", "/Acordes/ASim.svg"];
  niveles: any[] = [
    { nivel: 0, indice: 99 },
    { nivel: 1, indice: 26 },
    { nivel: 2, indice: 27 }
  ];

  constructor(private database: Database, private router: Router, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    // Suscribirse a los parámetros de la ruta para obtener 'encender'
    this.route.params.subscribe(params => {
      this.pagina = params['encender'];
      this.initializeLinks();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isReturningToInicio = true;
        this.actualizarNotas();
      }
    });
  }

  // Método para navegación de página
  async irPagina() {
    await this.actualizarNotas(); // Asegurarse de que la función se ejecute antes de la navegación
    this.router.navigate(['../inicio']);
  }

  // Método para lectura de slider
  onSlideChange(event: any) {
    if (this.isReturningToInicio) {
      this.isReturningToInicio = false;
      return;
    }

    const newIndex = event.detail.map((item: { activeIndex: any; }) => item.activeIndex)[0];
    if (newIndex !== this.activeIndex) {
      this.activeIndex = newIndex;
      try {
        if (this.pagina == 1) {
          this.link = this.notas[this.activeIndex];
          this.actualizarBaseDeDatos(this.calcularIndiceNotas(this.activeIndex));
        } else if (this.pagina == 2) {
          this.link2 = this.acordes[this.activeIndex];
          this.actualizarBaseDeDatos(this.activeIndex + 12);
        } else if (this.pagina == 3) {
          this.actualizarNivel(this.activeIndex);
        }
      } catch {
        this.actualizarBaseDeDatos(99);
      }
    }
  }

  // Inicializar los links basados en la página
  initializeLinks() {
    if (this.pagina == 1) {
      this.links = this.notas;
    } else if (this.pagina == 2) {
      this.links2 = this.acordes;
    }
  }

  // Función para actualizar la variable 'notas' en la base de datos
  async actualizarNotas() {
    this.activeIndex = 99;
    await this.actualizarBaseDeDatos(this.activeIndex);
  }

  // Función para actualizar la base de datos con el índice calculado
  async actualizarBaseDeDatos(indice: number) {
    await set(ref(this.database, 'Notas'), indice);
  }

  // Calcular el índice de las notas
  calcularIndiceNotas(activeIndex: number): number {
    const led = activeIndex * 2;
    return led <= 4 ? led : led - 1;
  }

  // Actualizar el nivel en la base de datos
  async actualizarNivel(activeIndex: number) {
    const nivelData = this.niveles.find(n => n.nivel === this.nivel);
    if (nivelData) {
      this.actualizarBaseDeDatos(activeIndex + nivelData.indice);
    } else {
      this.actualizarBaseDeDatos(99);
    }
  }
}