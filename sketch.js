function preload() {
  pac = loadImage("graficos/pacman.png");
  fants = loadImage("graficos/fantasmas.png");
  fants2 = loadImage("graficos/fantasmas2.png");
  pntsImg = loadImage("graficos/puntos.png");
  gameOverBmp = loadImage("graficos/game over.png");
  youWinBmp = loadImage("graficos/you win.png");
  readyBmp = loadImage("graficos/ready.png");
  clickBmp = loadImage("graficos/click.png");
}

var nivel;
var nivelInicial = 8;
var cantLaberintos = 8;
var mapa = "";
var ancho = 19;
var alto = 22;
var tile = 30;
var colorPared;

var xPac;
var yPac;
var incr = 0.08;
var distChoque = 0.8 * 0.8;

var fantasmas = [];

var vidas;
var inicio = false;
var jugar = false;
var sigue = false;
var win = false;
var loose = false;
var gameover = false;
var menu = true;

var juegoComenzado = false;

var puntos = 0;
var tiempoDurPastilla = 0;
var tiempoInicPastilla = 0;
var tiempoInicPuntaje = 0;
var tiempoDurPuntaje = 500;
var fantsComidos = 0;
var fantsPuntos = 100;

var xCasita;
var yCasita;
var xPuerta;
var yPuerta;
var xTunel1;
var yTunel1;
var xTunel2;
var yTunel2;
var xTunel3;
var yTunel3;
var xTunel4;
var yTunel4;

var cont = 0;

//---------------------------------------------
function setup() {
  puntos = 0;
  angleMode(DEGREES);
  tol = 0.8 * incr;
  createCanvas(ancho * tile, (alto + 2) * tile);
}

//---------------------------------------------
function draw() {
  if (menu) muestraMenu();
  if (jugar) loopJuego();
  if (inicio) inicioNivel();
  if (sigue) sigueNivel();

  if (win) youWin();
  if (loose) youLoose();
  if (gameover) gameOver();

  if (!menu) escribePuntos();
}

//------------------------------------------------
function inicioNivel() {
  frameRate(1);
  defineMapa((nivel - 1) % cantLaberintos);
  dibujaMapa(ancho, alto);

  if (!juegoComenzado) pacman = new pacman(xPac, yPac);
  juegoComenzado = true;

  iniciaPersonajes();

  inicio = false;
  sigue = false;
  jugar = true;
  win = false;
  loose = false;
  gameover = false;
}

//------------------------------------------------
function loopJuego() {
  frameRate(60);
  background(0);

  dibujaMapa(ancho, alto);

  pacman.move();
  pacman.baldosaActual();
  pacman.show();

  fantasmas.forEach((f) => {
    f.update();
    if (pacman.modo != "puntaje") f.move();
    f.show();
    f.choque();
  });
}

//------------------------------------------------
function sigueNivel() {
  dibujaMapa(ancho, alto);
  textoListo();

  iniciaPersonajes();

  inicio = false;
  sigue = false;
  jugar = true;
  win = false;
  loose = false;
  gameover = false;
}

//----------------------------------------------
function iniciaPersonajes() {
  textoListo();

  pacman.x = xPac;
  pacman.y = yPac;
  pacman.d = 2;
  pacman.dNext = 2;
  pacman.disfraz = 2;
  pacman.show();

  fantasmas[0] = new fantasma(0, 10, 1, 2, "ojitos", 0);
  fantasmas[0] = new fantasma(0, xCasita, yCasita - 2, 0, "chase", 0);
  fantasmas[1] = new fantasma(1, xCasita - 1, yCasita, 0, "casita", -1);
  fantasmas[2] = new fantasma(2, xCasita, yCasita, 0, "casita", 6);
  fantasmas[3] = new fantasma(3, xCasita + 1, yCasita, 0, "casita", 10);

  fantasmas[0].show();
  fantasmas[1].show();
  fantasmas[2].show();
  fantasmas[3].show();
}
