//---------------------------------------------
class pacman {
  constructor(x, y) {
    this.d = 2;
    this.dNext = 2;

    this.x = x;
    this.y = y;

    this.xGrilla = x;
    this.yGrilla = y;

    this.xNext;
    this.yNext;

    this.incr = incr;

    this.disfraz = 2;
    this.cambio = false;
    this.ultimoCambio = 0;

    this.modo = "normal";
  }

  //------------------------------------------
  move() {
    switch (this.modo) {
      case "normal":
        var posAntesDeMove = this.x * 100 + this.y;

        var bDestino;
        var dy = 0;
        var dx = 0;
        switch (this.d) {
          case 0: // v = derecha ////////////////////////////////////////
            if (enGrilla(this.x, this.y)) {
              if (this.dNext == 1) dy = -1;
              if (this.dNext == 3) dy = 1;
              if (dy != 0) {
                bDestino = mapaChr(this.xGrilla, this.yGrilla + dy);
                if (bDestino != "#") {
                  this.x = this.xGrilla;
                  this.y = this.y + this.incr * dy;
                  this.d = this.dNext;
                  break;
                }
              }
            }

            //dir opuesta
            if (this.dNext == 2) {
              this.x -= this.incr;
              this.d = this.dNext;
              break;
            }
            //si no hay cambio de dir
            bDestino = mapaChr(floor(this.x + incr) + 1, this.yGrilla);
            if (bDestino != "#") {
              this.x += this.incr;
            } else {
              this.x = round(this.x);
            }
            break;

          case 2: // v = izquierda ////////////////////////////////////////
            if (enGrilla(this.x, this.y)) {
              if (this.dNext == 1) dy = -1;
              if (this.dNext == 3) dy = 1;
              if (dy != 0) {
                bDestino = mapaChr(this.xGrilla, this.yGrilla + dy);
                if (bDestino != "#") {
                  this.x = this.xGrilla;
                  this.y = this.y + this.incr * dy;
                  this.d = this.dNext;
                  break;
                }
              }
            }

            //dir opuesta
            if (this.dNext == 0) {
              this.x += this.incr;
              this.d = this.dNext;
              break;
            }

            //si no hay un cambio de dir
            bDestino = mapaChr(ceil(this.x - incr) - 1, this.yGrilla);
            if (bDestino != "#") {
              this.x -= this.incr;
            } else {
              this.x = round(this.x);
            }
            break;

          // v = arriba ////////////////////////////////////////
          case 1:
            if (enGrilla(this.x, this.y)) {
              if (this.dNext == 0) dx = 1;
              if (this.dNext == 2) dx = -1;
              if (dx != 0) {
                bDestino = mapaChr(this.xGrilla + dx, this.yGrilla);
                if (bDestino != "#") {
                  this.y = this.yGrilla;
                  this.x = this.x + this.incr * dx;
                  this.d = this.dNext;
                  break;
                }
              }
            }

            //dir opuesta
            if (this.dNext == 3) {
              this.y += this.incr;
              this.d = this.dNext;
              break;
            }

            //si no hay un cambio de dirección en espera
            bDestino = mapaChr(this.xGrilla, ceil(this.y - incr) - 1);
            if (bDestino != "#") {
              this.y -= this.incr;
            } else {
              this.y = round(this.y);
            }
            break;

          // v = abajo ////////////////////////////////////////
          case 3:
            if (enGrilla(this.x, this.y)) {
              if (this.dNext == 0) dx = 1;
              if (this.dNext == 2) dx = -1;
              if (dx != 0) {
                bDestino = mapaChr(this.xGrilla + dx, this.yGrilla);
                if (bDestino != "#") {
                  this.y = this.yGrilla;
                  this.x = this.x + this.incr * dx;
                  this.d = this.dNext;
                  break;
                }
              }
            }

            //dir opuesta
            if (this.dNext == 1) {
              this.y -= this.incr;
              this.d = this.dNext;
              break;
            }

            //si no hay un cambio de dirección en espera
            bDestino = mapaChr(this.xGrilla, floor(this.y + incr) + 1);
            if (bDestino != "#") {
              this.y += this.incr;
            } else {
              this.y = round(this.y);
            }
            break;
        }

        if (this.x * 100 + this.y != posAntesDeMove) {
          this.cambio = true;
          comePunto(this.x, this.y, this.xGrilla, this.yGrilla);
        } else {
          this.cambio = false;
        }
      case "puntaje":
      //
      //
    }
  }

  //------------------------------------------
  show() {
    switch (this.modo) {
      case "normal":
        var numDisfraces = 7;
        if (this.cambio) {
          var m = floor(millis() / 20);

          if (m != pacman.ultimoCambio) {
            this.disfraz++;
            this.disfraz = this.disfraz % (numDisfraces * 2 - 2);
            pacman.ultimoCambio = m;
          }
        }

        var n;
        if (this.disfraz < numDisfraces) {
          n = this.disfraz;
        } else {
          n = numDisfraces * 2 - 2 - this.disfraz;
        }

        if (win) n = 2;

        imageMode(CENTER);
        push();
        translate(round((this.x + 0.5) * tile), round((this.y + 0.5) * tile));
        switch (this.d) {
          case 1:
            rotate(270);
            break;
          case 2:
            scale(-1, 1);
            break;
          case 3:
            rotate(90);
            break;
        }
        image(pac, 0, 0, tile * 1.2, tile * 1.2, n * 31, 0 * 30, 30, 30);
        pop();
      case "puntaje":
      //
      //
    }
  }

  //------------------------------------------
  baldosaActual() {
    // evalua si está cruzando el tunel
    if (this.x > ancho - 2 * incr && this.d == 0) {
      this.x = -1 + 2 * incr;
    }

    if (this.x < -1 + 2 * incr && this.d == 2) {
      this.x = ancho - 2 * incr;
    }

    this.xGrilla = round(this.x);
    this.yGrilla = round(this.y);
  }
}

//---------------------------------------------
function comePunto(x, y, xg, yg) {
  let d1 = abs(x - xg); //verifica que esté cerca del punto
  let d2 = abs(y - yg);
  let d3 = d1 * d1 + d2 * d2;
  var char = mapaChr(xg, yg);

  //come punto
  if (char == "." && d3 < 0.2) {
    var pos = yg * ancho + xg;
    mapa = mapa.substr(0, pos) + " " + mapa.substr(pos + 1);

    puntos++;
  }

  //come pastilla
  if (char == "o" && d3 < 0.2) {
    var pos = yg * ancho + xg;
    mapa = mapa.substr(0, pos) + " " + mapa.substr(pos + 1);

    fantsComidos = 0;
    fantsPuntos = 100;
    tiempoInicPastilla = millis();
    tiempoDurPastilla = ((1 / (nivel / 4 + 1)) * 12 + 4) * 1000;

    fantasmas.forEach((f) => {
      switch (f.modo) {
        case "chase":
          f.modo = "frightened";
          break;
        case "casita":
          f.modo = "frightenedCasita";
          break;
      }
    });
    puntos += 10;
  }
}
