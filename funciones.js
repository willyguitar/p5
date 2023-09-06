//------------------------------------------------
function youWin() {
  frameRate(0.4);
  background(0, 150);

  imageMode(CENTER);
  push();
  translate(width / 2 + tile / 8, tile * yCasita);
  scale(tile / 30);
  image(youWinBmp, 0, 0);
  pop();

  nivel++;

  inicio = true;
  sigue = false;
  jugar = false;
  win = false;
  loose = false;
  gameover = false;
}

//------------------------------------------------
function youLoose() {
  jugar = false;

  if (cont > 0) {
    var a = (60 - cont) * 3;
    var x = pacman.x,
      y = pacman.y;

    dibujaMapa(ancho, alto);
    stroke(255, 204, 0);

    for (var i = a; i <= 360 - a; i++) {
      push();
      translate((x + 0.5) * tile, (y + 0.5) * tile);
      rotate(i + 180);
      line(0, 0, 0, tile * 0.6);
      pop();
    }

    cont--;
  } else {
    dibujaMapa(ancho, alto);
    inicio = false;
    sigue = true;
    win = false;
    loose = false;

    vidas--;
    if (vidas == 0) gameover = true;
    frameRate(2);
  }
}

//---------------------------------------------
function escribePuntos() {
  var n = 2;
  var y = tile * (alto + 1);
  for (var i = 0; i < vidas - 1; i++) {
    var x = tile * (0.8 + i * 1.4);
    image(pac, x, y, tile * 1.2, tile * 1.2, n * 31, 0, 30, 30);
  }

  fill(255);
  noStroke();
  textSize((40 * tile) / 40);
  textStyle(BOLD);

  textAlign(CENTER);
  textSize((40 * tile) / 40);
  text(puntos, (ancho / 2) * tile, (alto + 1.5) * tile);

  textAlign(RIGHT);
  textSize((30 * tile) / 40);
  text(nivel, (ancho - 0.3) * tile, (alto + 1.6) * tile);
}

//----------------------------------------------
function textoListo() {
  imageMode(CENTER);
  push();
  translate(width / 2 + tile / 8, tile * (yCasita + 3));
  scale(tile / 30);
  image(readyBmp, 0, 0);
  pop();
}

//----------------------------------------------
function gameOver() {
  background(0, 150);

  imageMode(CENTER);
  push();
  translate(width / 2, tile * yCasita);
  scale(tile / 30);
  image(gameOverBmp, 0, 0);
  pop();

  cont = 0;

  menu = true;
  inicio = false;
  sigue = false;
  jugar = false;
  win = false;
  loose = false;
  gameover = false;
  frameRate(0.5);
}

//----------------------------------------------
function muestraMenu() {
  nivel = nivelInicial;
  vidas = 5;
  frameRate(60);
  background(0);

  var y = height * 0.4;
  var amp = width + 8 * tile;
  var c1 = cont % (amp * 2);
  var c2 = amp * 2 - c1;
  var n2 = ceil(cont / (amp * 2)) % 4;
  imageMode(CENTER);

  push();
  if (c1 < amp) {
    translate(c1 - 4 * tile, y);
    image(fants2, tile * 4, 0, tile * 2, tile * 2, 0 * 31, 0 * 30, 30, 30);
  } else {
    translate(c2 - 8 * tile, y);
    scale(-1, 1);
    image(fants, -tile * 4, 0, tile * 2, tile * 2, 0 * 31, n2 * 31, 30, 30);
  }

  var n = -abs((floor(millis() / 20) % 13) - 6) + 6;
  image(pac, 0, 0, tile * 2, tile * 2, n * 31, 0 * 30, 30, 30);

  cont = cont + 4;
  pop();

  imageMode(CENTER);
  push();
  translate(width / 2, tile * 15);
  scale(tile / 30);
  image(clickBmp, 0, 0);
  pop();
}

//----------------------------------------------
function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      pacman.dNext = 0;
      break;
    case UP_ARROW:
      pacman.dNext = 1;
      break;
    case LEFT_ARROW:
      pacman.dNext = 2;
      break;
    case DOWN_ARROW:
      pacman.dNext = 3;
      break;
  }
}

//--------------------------------
function mapaChr(x, y) {
  var chrRta;
  if (x < 0 || x > ancho - 1) {
    chrRta = " ";
  } else {
    chrRta = mapa.substr(y * ancho + x, 1);
  }
  return chrRta;
}

//---------------------------------------------
function enGrilla(x, y) {
  var deltax = abs(x - round(x)) < tol;
  var deltay = abs(y - round(y)) < tol;
  return deltax && deltay;
}

//---------------------------------------------
function dibujaMapa(w, h) {
  var dibPastilla = ceil(millis() / 500) % 2;
  noStroke();
  background(colorPared);
  var p = 0;

  (xTunel1 = -1), (yTunel1 = -1), (xTunel2 = -1), (yTunel2 = -1);
  (xTunel3 = -1), (yTunel3 = -1), (xTunel4 = -1), (yTunel4 = -1);

  for (var j = 0; j < h; j++) {
    for (var i = 0; i < w; i++) {
      let baldosa = mapaChr(i, j);

      switch (baldosa) {
        case ".":
          fill(0);
          rect((i - 0.2) * tile, (j - 0.2) * tile, tile * 1.4, tile * 1.4);

          fill(255, 255, 0);
          rectMode(CENTER);
          rect((i + 0.5) * tile, (j + 0.5) * tile, tile / 5);
          rectMode(CORNER);
          p++;
          break;

        case "o":
          fill(0);
          rect((i - 0.2) * tile, (j - 0.2) * tile, tile * 1.4, tile * 1.4);

          if (dibPastilla) {
            fill(255, 255, 0);
            circle((i + 0.5) * tile, (j + 0.5) * tile, tile / 1.65);
          }
          p++;
          break;

        case "@":
          fill(0);
          rect((i - 0.2) * tile, (j - 0.2) * tile, tile * 1.4, tile * 1.4);
          xCasita = i;
          yCasita = j;
          break;

        case "P":
          fill(0);
          rect((i - 0.2) * tile, (j - 0.2) * tile, tile * 1.4, tile * 1.4);
          xPac = i;
          yPac = j;
          break;

        case "1":
          fill(0);
          rect((i - 0.2) * tile, (j - 0.2) * tile, tile * 1.4, tile * 1.4);
          xTunel1 = i;
          yTunel1 = j;
          break;

        case "2":
          fill(0);
          rect((i - 0.2) * tile, (j - 0.2) * tile, tile * 1.4, tile * 1.4);
          xTunel2 = i;
          yTunel2 = j;
          break;

        case "3":
          fill(0);
          rect((i - 0.2) * tile, (j - 0.2) * tile, tile * 1.4, tile * 1.4);
          xTunel3 = i;
          yTunel3 = j;
          break;

        case "4":
          fill(0);
          rect((i - 0.2) * tile, (j - 0.2) * tile, tile * 1.4, tile * 1.4);
          xTunel4 = i;
          yTunel4 = j;
          break;

        case " ":
          fill(0);
          rect((i - 0.2) * tile, (j - 0.2) * tile, tile * 1.4, tile * 1.4);
          break;
      }
    }
  }
  fill(0); //casitad de fantasmas
  rect(tile * (xCasita - 1.5), tile * (yCasita - 0.5), tile * 4, tile * 2);
  fill(255);
  rect(tile * (xCasita - 0.3), tile * (yCasita - 0.8), tile * 1.6, tile * 0.3);

  fill(0); //sector inferior del puntaje
  rect(0, alto * tile, ancho * tile, 100);

  xPuerta = xCasita;
  yPuerta = yCasita - 2;

  if (p == 0) {
    win = true;
  }
}

//---------------------------------------------
function defineMapa(m) {
  mapa = "";
  switch (m) {
    case 0:
      mapa += "###################";
      mapa += "#........#........#";
      mapa += "#o##.###.#.###.##o#";
      mapa += "#.##.###.#.###.##.#";
      mapa += "#.................#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#....#...#...#....#";
      mapa += "####.### # ###.####";
      mapa += "   #.#       #.#   ";
      mapa += "####.# ##### #.####";
      mapa += "   1.  # @ #  .2   ";
      mapa += "####.# ##### #.####";
      mapa += "   #.#       #.#   ";
      mapa += "####.# ##### #.####";
      mapa += "#........#........#";
      mapa += "#.##.###.#.###.##.#";
      mapa += "#o.#.....P.....#.o#";
      mapa += "##.#.#.#####.#.#.##";
      mapa += "#....#...#...#....#";
      mapa += "#.######.#.######.#";
      mapa += "#.................#";
      mapa += "###################";
      colorPared = color(100, 100, 200);
      break;

    case 1:
      mapa += "###################";
      mapa += "#.................#";
      mapa += "#o##.#.#####.#.##o#";
      mapa += "#....#...#...#....#";
      mapa += "#.######.#.######.#";
      mapa += "#.................#";
      mapa += "#.#### ##### ####.#";
      mapa += "#..  #       #  ..#";
      mapa += "##.# # ##### # #.##";
      mapa += " #.#   # @ #   #.# ";
      mapa += "##.### ##### ###.##";
      mapa += " 1.             .2 ";
      mapa += "##.##### # #####.##";
      mapa += " #.##### # #####.# ";
      mapa += " #.....  #  .....# ";
      mapa += "##.###.#####.###.##";
      mapa += "#........P........#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#o#..#...#...#..#o#";
      mapa += "#.#.####.#.####.#.#";
      mapa += "#........#........#";
      mapa += "###################";
      colorPared = color(0, 140, 120);
      break;

    case 2:
      mapa += "###################";
      mapa += "#....#.......#....#";
      mapa += "#o##.#.#####.#.##o#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#.................#";
      mapa += "##.#.###.#.###.#.##";
      mapa += " #.#.....#.....#.# ";
      mapa += "##.### ##### ###.##";
      mapa += " 1.             .2 ";
      mapa += "##.### ##### ###.##";
      mapa += " #.#   # @ #   #.# ";
      mapa += " #.# # ##### # #.# ";
      mapa += " #.  #       #  .# ";
      mapa += "##.##### # #####.##";
      mapa += " 3.....  #  .....4 ";
      mapa += "##.###.#####.###.##";
      mapa += "#........P........#";
      mapa += "#.##.###.#.###.##.#";
      mapa += "#o##.#...#...#.##o#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#.................#";
      mapa += "###################";
      colorPared = color(180, 40, 125);
      break;

    case 3:
      mapa += "###################";
      mapa += "#........#........#";
      mapa += "#o#.##.#.#.#.##.#o#";
      mapa += "#.#.##.#.#.#.##.#.#";
      mapa += "#.#....#...#....#.#";
      mapa += "#.###.##.#.##.###.#";
      mapa += "1........#........2";
      mapa += "#.#### ##### ####.#";
      mapa += "#.#             #.#";
      mapa += "#.# ## ##### ## #.#";
      mapa += "#.# ## # @ # ## #.#";
      mapa += "#.# ## ##### ## #.#";
      mapa += "3...           ...4";
      mapa += "#.#.#### # ####.#.#";
      mapa += "#.#....  #  ....#.#";
      mapa += "#.####.#####.####.#";
      mapa += "#........P........#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#.##.#...#...#.##.#";
      mapa += "#o##.#.#.#.#.#.##o#";
      mapa += "#......#...#......#";
      mapa += "###################";
      colorPared = color(130, 115, 170);
      break;

    case 4:
      mapa += "#####         #####";
      mapa += "#...###########...#";
      mapa += "#.#.............#o#";
      mapa += "#o####.#####.####.#";
      mapa += "#.................#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#....#...#...#....#";
      mapa += "#.##.### # ###.##.#";
      mapa += "1..#.#       #.#..2";
      mapa += "##.#.# ##### #.#.##";
      mapa += " #...  # @ #  ...# ";
      mapa += "##.#.# ##### #.#.##";
      mapa += "3..#.#       #.#..4";
      mapa += "#.##.### # ###.##.#";
      mapa += "#....###.#.###....#";
      mapa += "#.##.#...#...#.##.#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#........P........#";
      mapa += "#o####.#####.####o#";
      mapa += "#.#.............#.#";
      mapa += "#...###########...#";
      mapa += "#####         #####";
      colorPared = color(130, 115, 170);
      break;

    case 5:
      mapa += "###################";
      mapa += "#....#.......#....#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#o.#.#.#####.#.#.o#";
      mapa += "##.#...........#.##";
      mapa += " #...#.#####.#...# ";
      mapa += " #.# #...#...# #.# ";
      mapa += " #.# ### # ### #.# ";
      mapa += " #.#           #.# ";
      mapa += " #.### ##### ###.# ";
      mapa += " #...  # @ #  ...# ";
      mapa += "## #.# ##### #.# ##";
      mapa += " 1 #.#       #.#  2";
      mapa += "####.# ##### #.####";
      mapa += " 3 #.    #    .#  4";
      mapa += "## #.### # ###.# ##";
      mapa += " #...#...P...#...# ";
      mapa += "##.#.#.#####.#.#.##";
      mapa += "#o.#.....#.....#.o#";
      mapa += "#.####.#.#.#.####.#";
      mapa += "#......#...#......#";
      mapa += "###################";
      colorPared = color(130, 115, 170);
      break;

    case 6:
      mapa += "###################";
      mapa += "#.................#";
      mapa += "#o#.####.#.####.#o#";
      mapa += "#.#..#...#...#..#.#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#.................#";
      mapa += "###.## ##### ##.###";
      mapa += "###.## ##### ##.###";
      mapa += "#....         ....#";
      mapa += "#.##.# ##### #.##.#";
      mapa += "#..#.# # @ # #.#..#";
      mapa += "##.#.# ##### #.#.##";
      mapa += " 1...#       #...2 ";
      mapa += "##.#.### # ###.#.##";
      mapa += "#..#.....#.....#..#";
      mapa += "#.####.#####.####.#";
      mapa += "#........P........#";
      mapa += "#.#.##.#####.##.#.#";
      mapa += "#.#..#.#...#.#..#.#";
      mapa += "#o##.#.#.#.#.#.##o#";
      mapa += "#........#........#";
      mapa += "###################";
      colorPared = color(23, 224, 235);
      // console.log(mapa)
      break;
    //laberinto 4

    case 7:
      mapa += "###################";
      mapa += "#....#.......#....#";
      mapa += "#o##.#.#####.#.##o#";
      mapa += "#.##.#.#####.#.##.#";
      mapa += "#.................#";
      mapa += "##.###.#####.###.##";
      mapa += "1........#........2";
      mapa += "#.##.### # ###.##.#";
      mapa += "#.##.         .##.#";
      mapa += "#.##.# ##### #.##.#";
      mapa += "#....# # @ # #....#";
      mapa += "#.#### ##### ####.#";
      mapa += "#.....       .....#";
      mapa += "#.###.## # ##.###.#";
      mapa += "#...#.#..#..#.#...#";
      mapa += "###.#.#.###.#.#.###";
      mapa += "  3...#..P..#...4  ";
      mapa += "###.#.#.###.#.#.###";
      mapa += "#...#....#....#...#";
      mapa += "#o###.##.#.######o#";
      mapa += "#.................#";
      mapa += "###################";
      colorPared = color(255, 187, 0);
      // console.log(mapa)
      break;
    //laberinto 3
  }
}

//-----------------------------------------------
function mousePressed() {
  if (menu) {
    menu = false;
    inicio = true;
  }
}
