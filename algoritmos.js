//-------------------------------------------------
function algoritmoRojo(dirs, x, y) {
  return algoritmoBusqueda(dirs, x, y, pacman.x, pacman.y);
}

//-------------------------------------------------
function algoritmoAzul(dirs, x, y) {
  var xTarget = pacman.x;
  var yTarget = pacman.y;

  var dist2 = (x - pacman.x) * (x - pacman.x) + (y - pacman.y) * (y - pacman.y);

  if (dist2 > 25) {
    switch (pacman.d) {
      case 0:
        xTarget = pacman.x + 5;
        break;
      case 2:
        xTarget = pacman.x - 5;
        break;
      case 1:
        yTarget = pacman.y - 5;
        break;
      case 3:
        yTarget = pacman.y + 5;
        break;
    }
  }

  return algoritmoBusqueda(dirs, x, y, xTarget, yTarget);
}

//-------------------------------------------------
function algoritmoRosa(dirs, x, y) {
  let dx = pacman.x - fantasmas[0].x;
  let dy = pacman.y - fantasmas[0].y;

  let xTarget = pacman.x + dx;
  let yTarget = pacman.y + dy;

  return algoritmoBusqueda(dirs, x, y, xTarget, yTarget);
}

//-------------------------------------------------
function algoritmoNaranja(dirs, x, y) {
  var r = floor(random(dirs.length));
  return dirs[r];
}

//-------------------------------------------------
function algoritmoOjitos(dirs, x, y) {
  return algoritmoBusqueda(dirs, x, y, xPuerta, yPuerta);
}

//-------------------------------------------------
function algoritmoBusqueda(dirs, x, y, xTarget, yTarget) {
  var distx = abs(x - xTarget);
  var disty = abs(y - yTarget);

  //prioriza buscar en x
  if (distx > disty) {
    if (x < xTarget && dirs.includes(0)) return 0;
    if (x > xTarget && dirs.includes(2)) return 2;
    if (y < yTarget && dirs.includes(3)) return 3;
    if (y > yTarget && dirs.includes(1)) return 1;
  } else {
    //prioriza buscar en y
    if (y < yTarget && dirs.includes(3)) return 3;
    if (y > yTarget && dirs.includes(1)) return 1;
    if (x < xTarget && dirs.includes(0)) return 0;
    if (x > xTarget && dirs.includes(2)) return 2;
  }
  return -1
}