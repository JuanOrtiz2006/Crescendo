#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
/* ---------------------------------------------------------------------*/
const char* ssid = "Serveresp32";
const char* password = "serverEsp32";
const char* WIFI_SSID = "Fer_Martinez";
const char* WIFI_PASSWORD= "Fer1112%";
const char* API_KEY = "AIzaSyCj7UaCji5C2a7pz-WNuifIcpirKDLs9gE";
const char* DATABASE_URL = "https://crescendo-7fa4e-default-rtdb.firebaseio.com";
const char* USER_EMAIL = "esp32@gmail.com";
const char* USER_PASSWORD = "1034596";
/* ---------------------------------------------------------------------*/
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
unsigned long sendDataPrevMillis = 0;
unsigned long count = 0;
/* ---------------------------------------------------------------------*/
WebServer server(80);
/*---------------------------------------------------------------------*/
             /*  0  1  2  3    4   5   6   7   8   9  10  11  12  13  14  15   16  17  18 */ 
              /*Do,Do#,Re,Re#, Mi, Fa, Fa#,Sol,Sol#, La, La#,Si,/Do, Do#,Re, Re#, Mi, Fa, */
int pines[] = { 15,2,  0,  4,  16, 17, 5,  18,  19,  21, 22, 23, 13, 12, 14, 27,  26, 25}; // Pines disponibles en ESP32
int leer = 0;
String device = "";
/*---------------------------------------------------------------------*/
void setup_WIFI() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}
/*---------------------------------------------------------------------*/
void setupFirebase() {
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback;
  config.signer.tokens.legacy_token = "<database secret>";
  Firebase.reconnectNetwork(true);
  fbdo.setBSSLBufferSize(4096, 1024);
  fbdo.setResponseSize(2048);
  Firebase.begin(&config, &auth);
  Firebase.setDoubleDigits(5);
  config.timeout.serverResponse = 10 * 1000;
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
}
/*---------------------------------------------------------------------*/
void setup() {
  Serial.begin(115200);
  delay(50);
  for(int i = 0; i < sizeof(pines) / sizeof(pines[0]); i++) {
    pinMode(pines[i], OUTPUT); // Configura el pin como salida
  }

  Serial.begin(115200);
  setup_WIFI();
  setupFirebase();

  WiFi.softAP(ssid, password);
  IPAddress ip = WiFi.softAPIP();
  Serial.println("Red:");
  Serial.println(ssid);
  Serial.println("IP:");
  Serial.println(ip);

  server.on("/", handleConnectionRoot);
  server.on("/placa1", handleDevice1);
  server.on("/placa2", handleDevice2);
  server.on("/placa3", handleDevice3);
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println("Servidor HTTP iniciado");
  Serial.println("\nDispositivos Conectados:");
}
/* ---------------------------------------------------------------------*/
void loop() {
  // Verificar si el botón está presionado
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    leerDato("/Notas");
    delay(1500);
  }
  server.handleClient();
}
/* ---------------------------------------------------------------------*/
void leerDato(String nombre) {
  if (Firebase.RTDB.getInt(&fbdo, F(nombre.c_str()), &leer)) {
    Serial.print(leer);
    acordes(leer);
  } else {
    Serial.print("Error al leer datos: ");
    Serial.println(fbdo.errorReason().c_str());
  }
} 

void acordes(int n){
  for (int i = 0; i < sizeof(pines) / sizeof(pines[0]); i++) {  // Apagar todos los pines antes de encender los necesarios
    digitalWrite(pines[i], LOW);
  }
  if(n>=0 && n<=11)//Si pertence a las notas
  {
    digitalWrite(pines[n],1);//Ensiendeel led correspondiente
  }
  switch (n){//Si pertenece a los acordes
    case 12://Do
      digitalWrite(pines[0],1), digitalWrite(pines[4],1), digitalWrite(pines[7],1);
    break;
    case 13://Re
      digitalWrite(pines[2],1), digitalWrite(pines[6],1), digitalWrite(pines[9],1);
    break;
    case 14://Mi
      digitalWrite(pines[4],1), digitalWrite(pines[8],1), digitalWrite(pines[11],1);
    break;  
    case 15://Fa
      digitalWrite(pines[5],1), digitalWrite(pines[9],1), digitalWrite(pines[12],1);
    break;
    case 16://Sol
      digitalWrite(pines[7],1), digitalWrite(pines[11],1), digitalWrite(pines[14],1);
    break; 
    case 17://La
      digitalWrite(pines[9],1), digitalWrite(pines[13],1), digitalWrite(pines[16],1);
    break; 
    case 18://Si
      digitalWrite(pines[11],1), digitalWrite(pines[15],1), digitalWrite(pines[18],1);
    break;
    case 19://Dom
      digitalWrite(pines[0],1), digitalWrite(pines[3],1), digitalWrite(pines[7],1);
    break;
    case 20://Rem
      digitalWrite(pines[2],1), digitalWrite(pines[5],1), digitalWrite(pines[9],1);
    break;
    case 21://Mim
      digitalWrite(pines[4],1), digitalWrite(pines[7],1), digitalWrite(pines[11],1);
    break;  
    case 22://Fam
      digitalWrite(pines[5],1), digitalWrite(pines[8],1), digitalWrite(pines[12],1);
    break;
    case 23://Solm
      digitalWrite(pines[7],1), digitalWrite(pines[10],1), digitalWrite(pines[14],1);
    break; 
    case 24://Lam
      digitalWrite(pines[9],1), digitalWrite(pines[12],1), digitalWrite(pines[16],1);
    break; 
    case 25://Sim
      digitalWrite(pines[11],1), digitalWrite(pines[14],1), digitalWrite(pines[17],1);
    break;   
  }
}
/* ---------------------------------------------------------------------*/
void handleConnectionRoot() {
  server.send(200, "text/plain", "Dispositivo conectado");
}
/* ---------------------------------------------------------------------*/
void handleDevice1() {
  device = "ESP32_1";
  Serial.println(device);
  server.send(200, "text/plain", String(leer));
}
void handleDevice2() {
  device = "ESP32_2";
  Serial.println(device);
  server.send(200, "text/plain", String(leer));
}
void handleDevice3() {
  device = "ESP32_3";
  Serial.println(device);
  server.send(200, "text/plain", String(leer));
}
void handleNotFound() {
  server.send(404, "text/plain", "No encontrado");
}
/* ---------------------------------------------------------------------*/
