const divBaralho = document.getElementById("baralho");
const divComprado = document.getElementById("comprado");

var casas = document.querySelectorAll(".casa");
var naipes = document.querySelectorAll(".naipe");

var cartas = [];
var valor = 1;
var naipe = 0;

var qtdCasa = 1;
var baralho = 52 * 1;

var iniciando = true;

criarBaralho();
cartas.sort(randOrd);
realocarCartas();

function randOrd() {
  return Math.round(Math.random()) - 0.5;
}

function criarBaralho() {
  for (i = 0; i < baralho; i++) {
    var carta = document.createElement("div" + i);
    carta.setAttribute("id", "carta" + i);
    carta.setAttribute("class", "carta");

    carta.virada = true;

    switch (valor) {
      case 1:
        carta.valor = "A";
        break;
      case 11:
        carta.valor = "J";
        break;
      case 12:
        carta.valor = "Q";
        break;
      case 13:
        carta.valor = "K";
        break;
      default:
        carta.valor = valor;
        break;
    }

    switch (naipe) {
      case 0:
        carta.classList.add("copas");
        carta.naipe = "♥";
        break;
      case 1:
        carta.classList.add("espadas");
        carta.naipe = "♠";
        break;
      case 2:
        carta.classList.add("ouros");
        carta.naipe = "♦";
        break;
      case 3:
        carta.classList.add("paus");
        carta.naipe = "♣";
        break;
    }

    cartas.push(carta);

    if (valor < 13) {
      valor++;
    } else {
      valor = 1;
      if (naipe < 3) naipe++;
      else naipe = 0;
    }
  }
}

function desvirar(carta) {
  carta.virada = false;
  carta.setAttribute("draggable", "true");
  carta.classList.remove("cartaVirada");

  carta.innerHTML =
    '<div class = "cabecario">' +
    carta.valor +
    "<br>" +
    carta.naipe +
    "</div>" +
    desenhos(carta.valor, carta.naipe) +
    '<div class = "rodape">' +
    carta.valor +
    "<br>" +
    carta.naipe +
    "</div>";

  carta.addEventListener("dragstart", handleDragStart, false);
  carta.addEventListener("dragover", handleDragOver, false);
  carta.addEventListener("drop", handleDrop, false);
  carta.addEventListener("dragend", handleDragEnd, false);

  carta.addEventListener("dblclick", duploClick, false);
  carta.addEventListener("click", selecionarCarta, false);

  carta.addEventListener("mouseover", detail);
  carta.addEventListener("mouseout", detailOver);

  isWin2();
}

function virar(carta) {
  carta.virada = true;
  carta.classList.add("cartaVirada");
  carta.setAttribute("draggable", "false");
  carta.innerHTML = "";

  carta.removeEventListener("dragstart", handleDragStart, false);
  carta.removeEventListener("dragover", handleDragOver, false);
  carta.removeEventListener("drop", handleDrop, false);
  carta.removeEventListener("dragend", handleDragEnd, false);

  carta.removeEventListener("dblclick", duploClick, false);
  carta.removeEventListener("click", selecionarCarta, false);

  carta.removeEventListener("mouseover", detail);
  carta.removeEventListener("mouseout", detailOver);
}

function realocarCartas() {
  var qtd = qtdCasa;
  var index2 = 0;
  var pai;
  for (index = 0; index < casas.length; index++) {
    pai = casas[index];
    for (; index2 < qtd; index2++) {
      pai.appendChild(cartas[index2]);

      if (pai.className != "casa")
        cartas[index2].setAttribute("style", "top: 20px;");

      pai = cartas[index2];
      if (index2 < qtd - 1) {
        virar(cartas[index2]);
      } else {
        desvirar(cartas[index2]);
      }
      cartas[index2].classList.add("sombra");
    }

    qtd = index2 + index + qtdCasa + 1;
  }

  for (i = index2; i < cartas.length; i++) {
    virar(cartas[i]);
    divBaralho.appendChild(cartas[i]);

    if (i == cartas.length - 1) cartas[i].classList.add("sombra");

    cartas[i].addEventListener("mouseup", comprar);
    iniciando = false;
  }
}

function comprar() {
  this.removeEventListener("mouseup", comprar);
  desvirar(this);
  if (divComprado.lastChild != null)
    divComprado.lastChild.classList.remove("sombra");
  divComprado.appendChild(this);

  if (divBaralho.lastChild != null)
    divBaralho.lastChild.classList.add("sombra");
}

divBaralho.addEventListener("mouseup", voltarCartas);

function voltarCartas(e) {
  if (divBaralho != e.target || divComprado.childElementCount == 0) return;

  while (divComprado.childElementCount != 0) {
    virar(divComprado.childNodes[divComprado.childElementCount - 1]);
    divComprado.childNodes[divComprado.childElementCount - 1].addEventListener(
      "mouseup",
      comprar
    );
    divBaralho.appendChild(
      divComprado.childNodes[divComprado.childElementCount - 1]
    );
  }

  divBaralho.firstChild.classList.remove("sombra");
  divBaralho.lastChild.classList.add("sombra");
}

var cartaArrastada;

function handleDragStart(e) {
  e.target.style.opacity = "0.8";
  cartaArrastada = e.target;
}

function handleDrop(e) {
  if (e.stopPropagation) {
  }
  var pai = cartaArrastada.parentNode;

  if (this == cartaArrastada) return;

  if (this.parentNode.classList[0] == "naipe") {
    if (this.naipe == cartaArrastada.naipe) {
      if (addNaipe(this, cartaArrastada)) {
      } else return;
    } else {
      return;
    }
  } else if (this.classList[0] == "carta") {
    if (!addApCarta(cartaArrastada, this)) return;
  } else if (this.classList[0] == "naipe" && cartaArrastada.valor == "A") {
    if (cartaArrastada.parentNode.classList[0] == "carta")
      desvirar(cartaArrastada.parentNode);
    this.appendChild(cartaArrastada);
    cartaArrastada.setAttribute("style", "top: 0px;");
  } else return;
}

function handleDragOver(e) {
  if (e.preventDefault) {
  }
}

function handleDragEnd(e) {
  cartaArrastada.style.opacity = "1.0";
}

function moverParaCasa(e) {
  if (cartaArrastada.valor != "K" || this.childElementCount > 0) return;
  if (e.stopPropagation) {
  }

  if (cartaArrastada.parentNode.classList[0] == "carta")
    desvirar(cartaArrastada.parentNode);

  cartaArrastada.setAttribute("style", "top: 0px;");

  this.append(cartaArrastada);
}

for (i = 0; i < casas.length; i++) {
  casas[i].addEventListener("dragover", handleDragOver, false);
  casas[i].addEventListener("drop", moverParaCasa, false);
  casas[i].addEventListener("dragend", handleDragEnd, false);

  casas[i].addEventListener("click", selecionarCarta, false);
}

for (i = 0; i < naipes.length; i++) {
  naipes[i].addEventListener("dragover", handleDragOver, false);
  naipes[i].addEventListener("drop", handleDrop, false);
  naipes[i].addEventListener("dragend", handleDragEnd, false);

  naipes[i].addEventListener("click", selecionarCarta, false);
}

function duploClick(e) {
  if (e.stopPropagation) {
  }

  for (i = 0; i < naipes.length; i++) {
    if (naipes[i].firstChild != null) {
      if (naipes[i].firstChild.naipe == this.naipe) {
        if (addNaipe(naipes[i].lastChild, this)) {
        }
      }
    } else if (this.valor == "A") {
      if (this.parentNode.classList[0] == "carta") {
        desvirar(this.parentNode);
      }

      this.setAttribute("style", "top: 0px;");
      naipes[i].appendChild(this);

      return;
    }
  }
}

function isWin() {
  var contador = 0;
  naipes.forEach(function (naipe) {
    if (naipe.childElementCount == 13) contador++;
    else return;
  });

  if (contador == 4) {
    alert("voce ganhou");
  }
}

function isWin2() {
  var b = true;
  casas.forEach(function (casa) {
    casa.childNodes.forEach(function (carta) {
      if (carta.virada) {
        return (b = false);
      }
    });
  });
  if (b && !iniciando) alert("você ganhou");
}

var cartaSelecionada;

function selecionarCarta(e) {
  if (e.stopPropagation) {
  }
  if (cartaSelecionada == null) {
    if (this.classList[0] != "carta") return;
    cartaSelecionada = this;
    cartaSelecionada.style.opacity = "0.8";
  } else {
    if (
      this.parentNode.classList[0] == "carta" ||
      this.parentNode.classList[0] == "casa"
    ) {
      if (addApCarta(cartaSelecionada, this)) {
      }
    } else if (this.parentNode.classList[0] == "naipe") {
      if (addNaipe(this, cartaSelecionada)) {
      }
    } else if (this.className == "casa" && cartaSelecionada.valor == "K") {
      cartaSelecionada.setAttribute("style", "top: 0px;");
      if (cartaSelecionada.parentNode.classList[0] == "carta")
        desvirar(cartaSelecionada.parentNode);
      this.appendChild(cartaSelecionada);
    } else if (this.className == "naipe" && cartaSelecionada.valor == "A") {
      cartaSelecionada.setAttribute("style", "top: 0px;");
      if (cartaSelecionada.parentNode.classList[0] == "carta")
        desvirar(cartaSelecionada.parentNode);
      this.appendChild(cartaSelecionada);
    }
    cartaSelecionada.style.opacity = "1.0";
    cartaSelecionada = null;
  }
}

function addNaipe(de, para) {
  switch (de.valor.toString() + para.valor.toString()) {
    case "A2":
    case "23":
    case "34":
    case "45":
    case "56":
    case "67":
    case "78":
    case "89":
    case "910":

    case "10J":
    case "JQ":
    case "QK":
    case "KA":
      para.setAttribute("style", "top: 0px;");
      if (para.parentNode.classList[0] == "carta") desvirar(para.parentNode);

      de.parentNode.lastChild.classList.remove("sombra");
      de.parentNode.appendChild(para);

      if (divComprado.lastChild != null)
        divComprado.lastChild.classList.add("sombra");

      isWin();
      return true;
    default:
      return false;
  }
}

function addApCarta(de, para) {
  if (para.childElementCount > 3) return false;

  switch (de.valor.toString() + para.valor.toString()) {
    case "A2":
    case "23":
    case "34":
    case "45":
    case "56":
    case "67":
    case "78":
    case "89":
    case "910":

    case "10J":
    case "JQ":
    case "QK":
      switch (para.naipe + de.naipe) {
        case "♦♠":
        case "♦♣":
        case "♥♠":
        case "♥♣":

        case "♠♥":
        case "♠♦":
        case "♣♥":
        case "♣♦":
          de.setAttribute("style", "top: 20px;");

          if (de.parentNode.classList[0] == "carta") {
            desvirar(de.parentNode);
          } else {
            var espoa =
              de.parentNode.childNodes[de.parentNode.childElementCount - 2];
            if (espoa != null) espoa.classList.add("sombra");
          }
          para.appendChild(de);

          if (divComprado.lastChild != null)
            divComprado.lastChild.classList.add("sombra");
          return true;

        default:
          return false;
      }
      break;

    default:
      return false;
  }
}

boolenDetail = true;

function detail(e) {
  if (boolenDetail) {
    boolenDetail = false;
  } else {
    return;
  }

  if (this.childElementCount > 3) {
    this.childNodes[3].style.top = "35px";
  }
}

function detailOver(e) {
  if (!boolenDetail) {
    boolenDetail = true;
  } else {
    return;
  }

  if (this.childElementCount > 3) {
    this.childNodes[3].style.top = "20px";
  }
}

function desenhos(valor, naipe) {
  var retorno = '<div class = "meio">';

  switch (valor.toString()) {
    case "2":
      retorno +=
        "&nbsp&nbsp " +
        naipe +
        " &nbsp&nbsp<br><br><br><br><br><br>" +
        "&nbsp&nbsp " +
        naipe +
        " &nbsp&nbsp";

      break;
    case "3":
      retorno +=
        "&nbsp&nbsp " +
        naipe +
        " &nbsp&nbsp<br><br><br>" +
        "&nbsp&nbsp " +
        naipe +
        " &nbsp&nbsp<br><br><br>" +
        "&nbsp&nbsp " +
        naipe +
        " &nbsp&nbsp";

      break;
    case "4":
      retorno +=
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br><br><br><br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "";

      break;
    case "5":
      retorno +=
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br><br>" +
        "&nbsp&nbsp " +
        naipe +
        " &nbsp&nbsp<br><br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe;

      break;
    case "6":
      retorno +=
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe;

      break;
    case "7":
      retorno +=
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br><br>" +
        naipe +
        " " +
        naipe +
        " " +
        naipe +
        "<br><br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe;

      break;
    case "8":
      retorno +=
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe;

      break;
    case "9":
      retorno +=
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br>" +
        "&nbsp&nbsp " +
        naipe +
        " &nbsp&nbsp<br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe;
      break;

    case "10":
      retorno +=
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br>" +
        "&nbsp&nbsp " +
        naipe +
        " &nbsp&nbsp<br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br><br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe +
        "<br>" +
        "&nbsp&nbsp " +
        naipe +
        " &nbsp&nbsp<br>" +
        naipe +
        " &nbsp&nbsp " +
        naipe;
      break;
    default:
      retorno = '<div class = "meio valorDiferent" >';
      retorno += naipe;
      break;
  }

  retorno += "</div>";
  return retorno;
}
