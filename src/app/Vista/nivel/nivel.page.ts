import { Component, OnInit } from '@angular/core';
import { Firestore,doc,setDoc } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.page.html',
  styleUrls: ['./nivel.page.scss'],
})
export class NivelPage implements OnInit 
{
  videos: string[] = ["../../../assets/Videos/NotaDo.gif","../../../assets/Videos/NotaRe.gif", "../../../assets/Videos/NotaMi.gif",
                      "../../../assets/Videos/NotaFa.gif","../../../assets/Videos/NotaSol.gif", "../../../assets/Videos/NotaLa.gif", "../../../assets/Videos/NotaSi.gif"];
  videoIndex: number = 0;
  inicio:boolean=false; ledstate:any;
  encendido:boolean=false; encendido2:boolean=false; encendido3:boolean=false; encendido4:boolean=false;
  encendido5:boolean=false; encendido6:boolean=false; encendido7:boolean=false;
  encender: string="";
  constructor(private db:Firestore, private router:Router, private route:ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.encender = params['1'];
      if (this.encender === "1") {
        // Realizar la acción necesaria para encender el led1
        this.videoIndex = 0;
        this.led1();
      }
    });
  }
  irPagina() {
    this.router.navigate(['../inicio']); 
    for (let i = 1; i <= 7; i++) 
      {
        const ledState = doc(this.db, 'ControlTeclado', `led${i}`);
        setDoc(ledState, { encender: false });
      };
  }
  cambiarVideoYEnviarNumero() {
    this.videoIndex = (this.videoIndex + 1) % this.videos.length;// Cambiar el video actual 
    const ledState = doc(this.db, 'ControlTeclado', 'led1'); setDoc(ledState, { encender: false}); 
    if (this.videoIndex === 1) {
    const ledState = doc(this.db, 'ControlTeclado', 'led2'); setDoc(ledState, { encender: true}); 
    }else{const ledState = doc(this.db, 'ControlTeclado', 'led2'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 2) {  
    const ledState = doc(this.db, 'ControlTeclado', 'led3'); setDoc(ledState, { encender: true});
    } else{const ledState = doc(this.db, 'ControlTeclado', 'led3'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 3) {
      const ledState = doc(this.db, 'ControlTeclado', 'led4'); setDoc(ledState, { encender: true});
    } else{const ledState = doc(this.db, 'ControlTeclado', 'led4'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 4) {
      const ledState = doc(this.db, 'ControlTeclado', 'led5'); setDoc(ledState, { encender: true});
    } else{const ledState = doc(this.db, 'ControlTeclado', 'led5'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 5) {
    const ledState = doc(this.db, 'ControlTeclado', 'led6'); setDoc(ledState, { encender: true});
    } else{const ledState = doc(this.db, 'ControlTeclado', 'led6'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 6) {
    const ledState = doc(this.db, 'ControlTeclado', 'led7'); setDoc(ledState, { encender: true});
    } else{
      const ledState = doc(this.db, 'ControlTeclado', 'led7'); setDoc(ledState, { encender: false});
    }
    // Reproducir el nuevo video
    const videoElement = document.getElementById("videoFondo") as HTMLVideoElement;
    videoElement.src = this.videos[this.videoIndex];
    videoElement.play();
  }
  regresar() {
    const ledState = doc(this.db, 'ControlTeclado', 'led1'); setDoc(ledState, { encender: false});
    // Cambiar el video actual
    this.videoIndex = (this.videoIndex - 1) % this.videos.length;
    const videoElement = document.getElementById("videoFondo") as HTMLVideoElement;
    videoElement.src = this.videos[this.videoIndex];
    videoElement.play();
    // Envía el número, en este caso el índice del video actual
    if (this.videoIndex === 0) {
      const ledState = doc(this.db, 'ControlTeclado', 'led1'); setDoc(ledState, { encender: true});
    }else{const ledState = doc(this.db, 'ControlTeclado', 'led1'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 1) {
    const ledState = doc(this.db, 'ControlTeclado', 'led2'); setDoc(ledState, { encender: true}); 
    }else{const ledState = doc(this.db, 'ControlTeclado', 'led2'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 2) {
    const ledState = doc(this.db, 'ControlTeclado', 'led3'); setDoc(ledState, { encender: true});
    } else{const ledState = doc(this.db, 'ControlTeclado', 'led3'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 3) {
      const ledState = doc(this.db, 'ControlTeclado', 'led4'); setDoc(ledState, { encender: true});
    } else{const ledState = doc(this.db, 'ControlTeclado', 'led4'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 4) {
    const ledState = doc(this.db, 'ControlTeclado', 'led5'); setDoc(ledState, { encender: true});
    } else{const ledState = doc(this.db, 'ControlTeclado', 'led5'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 5) {
    const ledState = doc(this.db, 'ControlTeclado', 'led6'); setDoc(ledState, { encender: true});
    } else{const ledState = doc(this.db, 'ControlTeclado', 'led6'); setDoc(ledState, { encender: false});
    }
    if (this.videoIndex === 6) {
    const ledState = doc(this.db, 'ControlTeclado', 'led7'); setDoc(ledState, { encender: true});
    } else{
      const ledState = doc(this.db, 'ControlTeclado', 'led7'); setDoc(ledState, { encender: false});
    } 
  }
  led1(){
    const ledState = doc(this.db, 'ControlTeclado', 'led1');
    setDoc(ledState, { encender: true });
  }
}

