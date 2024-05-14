#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Serveresp32";
const char* password = "serverEsp32";
const char* esp32Server = "http://192.168.4.1/placa1"; // Modificar para el dispositivo deseado

/*---------------------------------------------------------------------*/
            /* 0    1     2   3    4    5   6    7    8    9   10   11   12   13   14   15    */
            /* Sol,Sol#, La, La#, Si / Do, Do#, Re,  Re#,  Mi,  Fa, Fa#, Sol, Sol#, La,  La#, Si, */
int pines[] = { 15, 2,   0,   4,  16,  17,  5,  18,  19,  21, 22, 23, 13, 12, 14, 27,  26, 25}; // Pines disponibles en ESP32

//RX2 pin 16
//TX2 pin 17
void setup() {
  for (int i = 0; i < sizeof(pines) / sizeof(pines[0]); i++) {
    pinMode(pines[i], OUTPUT); // Configura el pin como salida
  }

  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Conectando");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Conectado a la red con IP:");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void loop() {
  int leer = respuesta(esp32Server); // Obtener el valor de 'leer' del servidor
  acordes(leer);
  delay(1000); // Esperar un segundo antes de la próxima solicitud al servidor
}

int respuesta(const char* serverName) {
  HTTPClient http;
  http.begin(serverName);
  int httpResponseCode = http.GET();
  int payload = -1; // Valor predeterminado en caso de error
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    payload = response.toInt(); // Convertir la respuesta a entero
  } else {
    Serial.print("Error al conectarse al servidor. Código de respuesta HTTP: ");
    Serial.println(httpResponseCode);
  }
  http.end();
  return payload;
}

void acordes(int n){
  for (int i = 0; i < sizeof(pines) / sizeof(pines[0]); i++) {  // Apagar todos los pines antes de encender los necesarios
    digitalWrite(pines[i], LOW);
  }
  if(n>=0 && n<=11)//Si pertence a las notas
  {
    digitalWrite(pines[n], HIGH);//Enciende el LED correspondiente
  }
  switch (n){//Si pertenece a los acordes
    case 12://Do
      digitalWrite(pines[0], HIGH), digitalWrite(pines[4], HIGH), digitalWrite(pines[7], HIGH);
    break;
    case 13://Re
      digitalWrite(pines[2], HIGH), digitalWrite(pines[6], HIGH), digitalWrite(pines[9], HIGH);
    break;
    case 14://Mi
      digitalWrite(pines[4], HIGH), digitalWrite(pines[8], HIGH), digitalWrite(pines[11], HIGH);
    break;  
    case 15://Fa
      digitalWrite(pines[5], HIGH), digitalWrite(pines[9], HIGH), digitalWrite(pines[12], HIGH);
    break;
    case 16://Sol
      digitalWrite(pines[7], HIGH), digitalWrite(pines[11], HIGH), digitalWrite(pines[14], HIGH);
    break; 
    case 17://La
      digitalWrite(pines[9], HIGH), digitalWrite(pines[13], HIGH), digitalWrite(pines[16], HIGH);
    break; 
    case 18://Si
      digitalWrite(pines[11], HIGH), digitalWrite(pines[15], HIGH), digitalWrite(pines[18], HIGH);
    break;
    case 19://Dom
      digitalWrite(pines[0], HIGH), digitalWrite(pines[3], HIGH), digitalWrite(pines[7], HIGH);
    break;
    case 20://Rem
      digitalWrite(pines[2], HIGH), digitalWrite(pines[5], HIGH), digitalWrite(pines[9], HIGH);
    break;
    case 21://Mim
      digitalWrite(pines[4], HIGH), digitalWrite(pines[7], HIGH), digitalWrite(pines[11], HIGH);
    break;  
    case 22://Fam
      digitalWrite(pines[5], HIGH), digitalWrite(pines[8], HIGH), digitalWrite(pines[12], HIGH);
    break;
    case 23://Solm
      digitalWrite(pines[7], HIGH), digitalWrite(pines[10], HIGH), digitalWrite(pines[14], HIGH);
    break; 
    case 24://Lam
      digitalWrite(pines[9], HIGH), digitalWrite(pines[12], HIGH), digitalWrite(pines[16], HIGH);
    break; 
    case 25://Sim
      digitalWrite(pines[11], HIGH), digitalWrite(pines[14], HIGH), digitalWrite(pines[17], HIGH);
    break;   
  }
}
