//---------------------------------------------
class fantasma {
  constructor(n, x, y, d, modo, cont) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.n = n;

    this.xGrilla = x;
    this.yGrilla = y;

    this.ultNodoCode = 0;

    this.modo = modo; //o "chase", "frightened",...

    this.cont = cont;
    // this.tiempoFrightened;
    this.nroFantComido = 0;

    this.incr = incr * 0.95;
    this.dirs = [];

    switch (n) {
      case 0:
        this.clr = color(200, 0, 0);
        break;
      case 1:
        this.clr = color(0, 100, 200);
        break;
      case 2:
        this.clr = color(230, 120, 0);
        break;
    }
  }

  //-------------------------------------------------
  update() {
    switch (this.modo) {
      case "chase":
        if (enGrilla(this.x, this.y)) {
          this.xGrilla = round(this.x);
          this.yGrilla = round(this.y);
          var nodoCode = 100 * this.xGrilla + this.yGrilla;

          if (this.ultNodoCode == nodoCode) {
            return; //reincide en la misma baldosa
          }

          //listo para cambiar de dirección
          this.ultNodoCode = nodoCode;

          //si justo está saliendo de la casita
          if (this.x == xCasita && abs(this.y - yCasita) < 1) {
            this.d = 1;
          } else {
            //si no, busca una dire disponible
            this.dirs = direccionesPosibles(this.xGrilla, this.yGrilla, this.d);
            var d = algoritmoDireccion(this.n, this.dirs, this.x, this.y);
            if (d != this.d) {
              this.d = d;
              this.x = this.xGrilla; //acomoda fantasma a la grilla
              this.y = this.yGrilla;
            }
          }
        } else return; //no está en un nodo
        break;

      case "frightened":
        // termina efecto pastilla?
        var t = millis() - tiempoInicPastilla;
        if (t > tiempoDurPastilla) {
          this.modo = "chase";
        }

        if (enGrilla(this.x, this.y)) {
          this.xGrilla = round(this.x);
          this.yGrilla = round(this.y);
          var nodoCode = 100 * this.xGrilla + this.yGrilla;
          if (this.ultNodoCode == nodoCode) {
            return; //reincide en la misma baldosa
          }
          this.ultNodoCode = nodoCode;

          //si justo está saliendo de la casita
          if (this.x == xCasita && abs(this.y - yCasita) < 1) {
            this.d = 1;
          } else {
            //si no, busca una dire disponible
            this.dirs = direccionesPosibles(this.xGrilla, this.yGrilla, this.d);
            var d = floor(random(this.dirs.length));
            var d2 = this.dirs[d];
            if (d2 != this.d) {
              this.d = d2;
              this.x = this.xGrilla; //acomoda fantasma a la grilla
              this.y = this.yGrilla;
            }
          }
        }
        break;

      case "casita":
        //cambia de dirección al chocar pared
        if (this.x < xCasita - 1 || this.x > xCasita + 1) {
          this.d = dirOp(this.d);
          this.cont--;
        }

        //sale de la casita
        if (abs(this.x - xCasita) < tol && this.cont < 0) {
          this.modo = "chase";
          this.x = xCasita;
          this.y = yCasita - incr;
          this.d = 1;
        }
        break;

      case "frightenedCasita":
        // termina efecto pastilla?
        var t = millis() - tiempoInicPastilla;
        if (t > tiempoDurPastilla) {
          this.modo = "casita";
          this.d = 0;
        }

        //cambia de dirección al chocar pared
        if (
          (this.x < xCasita - 1 && this.d == 2) ||
          (this.x > xCasita + 1 && this.d == 0)
        ) {
          this.d = dirOp(this.d);
          this.cont--;
        }

        //sale de la casita
        if (abs(this.x - xCasita) < tol && this.cont < 0) {
          this.modo = "frightened";
          this.x = xCasita;
          this.y = yCasita - incr;
          this.d = 1;
        }
        break;

      case "puntaje":
        if (tiempoInicPuntaje == 0) {
          tiempoInicPuntaje = millis();
          fantsComidos++;
          this.nroFantComido = fantsComidos;
          fantsPuntos *= 2;
          puntos += fantsPuntos;
        } else {
          var t = millis() - tiempoInicPuntaje;
          if (t > tiempoDurPuntaje) {
            tiempoInicPuntaje = 0;
            this.modo = "ojitos";
            pacman.modo = "normal";
          }
        }
        break;

      case "ojitos":
        if (enGrilla(this.x, this.y)) {
          this.xGrilla = round(this.x);
          this.yGrilla = round(this.y);
          var nodoCode = 100 * this.xGrilla + this.yGrilla;
          if (this.ultNodoCode == nodoCode) {
            return; //reincide en la misma baldosa
          }
          this.ultNodoCode = nodoCode;

          //si llegó a destino
          if (abs(this.x - xPuerta) < tol && abs(this.y - yPuerta) < tol) {
            this.modo = "ojitos2";
          }

          this.dirs = direccionesPosibles(this.xGrilla, this.yGrilla, this.d);
          var d = algoritmoDireccion(5, this.dirs, this.x, this.y);

          if (d != this.d) {
            this.d = d;
            this.x = this.xGrilla; //acomoda fantasma a la grilla
            this.y = this.yGrilla;
          }
        } else return; //no está en un nodo
        break;

      case "ojitos2":
        this.x = xPuerta;
        this.d = 3;
        if (abs(this.y - yCasita) < incr) {
          this.y = yCasita;
          this.modo = "casita";
          this.d = 0;
          this.cont = -1;
        }
        break;
    }
  }

  //-------------------------------------------------
  move() {
    if (this.modo == "puntaje") return;

    var incr2 = this.incr;

    switch (this.modo) {
      case "frightened":
      case "frightenedCasita":
        incr2 /= 2;
        break;

      case "ojitos":
      case "ojitos2":
        incr2 *= 1.5;
        break;

      case "chase": //si está saliendo de la casita
        if (this.x == xCasita && this.y < yCasita && this.y > yCasita - 2) {
          incr2 = incr2 / 4;
        }
        break;
    }

    if (enTunel(this.x, this.y)) {
      //si está dentro de algún tunel
      if (this.modo == "chase") incr2 = incr2 / 2; // dism incr en tunel

      //si está en el final del tunel hace warp
      if (this.x > ancho - 2 * incr && this.d == 0) {
        this.x = -1 + 2 * incr;
      }
      if (this.x < -1 + 2 * incr && this.d == 2) {
        this.x = ancho - incr;
      }
    }

    switch (this.d) {
      case 0:
        this.x += incr2;
        break;
      case 2:
        this.x -= incr2;
        break;
      case 1:
        this.y -= incr2;
        break;
      case 3:
        this.y += incr2;
        break;
    }
  }

  //-------------------------------------------------
  show() {
    imageMode(CENTER);
    push();
    translate(round((this.x + 0.5) * tile), round((this.y + 0.5) * tile));
    var w = tile * 1.2;

    switch (this.modo) {
      case "casita":
      case "chase":
        image(fants, 0, 0, w, w, this.d * 31, this.n * 31, 30, 30);
        break;

      case "frightened":
        if (pacman.modo == "puntaje") {
          var t = tiempoInicPuntaje + tiempoDurPuntaje - tiempoInicPastilla;
        } else {
          var t = millis() - tiempoInicPastilla;
        }

        if (t > tiempoDurPastilla - 4000) {
          //si tiene que empezar a titilar
          var t2 = (t - tiempoDurPastilla + 4000) / 1000;
          var t3 = floor(t2 * 2) % 2;
          if (t3 == 1) {
            image(fants2, 0, 0, w, w, 1 * 31, 0, 31, 30);
          } else {
            image(fants2, 0, 0, w, w, 0 * 31, 0, 31, 30);
          }
        } else {
          image(fants2, 0, 0, w, w, 0 * 31, 0, 31, 30);
        }
        break;

      case "puntaje":
        image(pntsImg, 0, 0, w, w, (this.nroFantComido - 1) * 31, 0, 31, 30);
        break;

      case "ojitos":
      case "ojitos2":
        image(fants, 0, 0, w, w, this.d * 31, 4 * 31, 30, 30);
        break;
    }

    pop();
  }

  //-------------------------------------------------
  choque() {
    var dist =
      (this.x - pacman.x) * (this.x - pacman.x) +
      (this.y - pacman.y) * (this.y - pacman.y);

    if (dist < distChoque) {
      switch (this.modo) {
        case "chase":
          loose = true;
          cont = 60;
          break;
        case "frightened":
          this.modo = "puntaje";
          pacman.modo = "puntaje";
          tiempoDurPastilla += tiempoDurPuntaje;
          // tiempoInicPastilla -= tiempoDurPuntaje;
          break;
      }
    }
  }
}

//-------------------------------------------------
function direccionesPosibles(x, y, d) {
  var dirs = [];

  if (mapaChr(x + 1, y) != "#" && d != dirOp(0)) {
    dirs.push(0);
    // rect((x + 1) * tile, y * tile, tile, tile);
  }

  if (mapaChr(x - 1, y) != "#" && d != dirOp(2)) {
    dirs.push(2);
    // rect((x - 1) * tile, y * tile, tile, tile);
  }

  if (mapaChr(x, y - 1) != "#" && d != dirOp(1)) {
    dirs.push(1);
    // rect(x * tile, (y - 1) * tile, tile, tile);
  }

  if (mapaChr(x, y + 1) != "#" && d != dirOp(3)) {
    dirs.push(3);
    // rect(x * tile, (y + 1) * tile, tile, tile);
  }

  return dirs;
}

//-------------------------------------------------
function dirOp(d) {
  //calcula la dirección opuesta
  d2 = (d + 2) % 4;
  return d2;
}

//--------------------------------------------------------
function algoritmoDireccion(n, dirs, x, y) {
  if (dirs.length == 1) {
    // si hay una sola posibilidad
    return dirs[0];
  }
  var dir;
  switch (n) {
    case 0:
      dir = algoritmoRojo(dirs, x, y);
      break;
    case 1:
      dir = algoritmoAzul(dirs, x, y);
      break;
    case 2:
      dir = algoritmoNaranja(dirs, x, y);
      break;
    case 3:
      dir = algoritmoRosa(dirs, x, y);
      break;

    case 5: //si está en modo ojitos
      dir = algoritmoOjitos(dirs, x, y);
      break;
  }

  //si el algoritmo no consigue una dir elige una random
  if (dir == -1) {
    var dirRandom = floor(random(dirs.length));
    dir = dirs[dirRandom];
  }

  return dir;
}

//-----------------------------
function enTunel(x, y) {
  var t1 = y == yTunel1 && x <= xTunel1 + 1;
  var t2 = y == yTunel2 && x >= xTunel2;
  var t3 = y == yTunel3 && x <= xTunel3 + 1;
  var t4 = y == yTunel4 && x >= xTunel4;
  return t1 || t2 || t3 || t4;
}
