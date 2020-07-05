(function inciar() {

    const divBaralho = document.getElementById("baralho");
    const divComprado = document.getElementById("comprado");

    let casas = document.getElementsByClassName('casa');
    let naipes = document.getElementsByClassName('naipe');

    let cartas = [];

    let cartaSelecionada = null;

    function criarCarta(element) {
        return {
            naipe: null,
            numero: null,
            enfileirado: false,
            alocado: false,
            comprada: false,
            virada: false,
            isCarta: true,
            setVirada(virada) {
                if (virada) {
                    this.className = "virada";
                    this.innerText = "";
                } else {
                    this.onclick = this.selecionar;
                    this.classList.remove("virada");

                    let desenho = document.createElement("div");
                    let cabecario = document.createElement("div");
                    let meio = document.createElement("div");
                    let rodape = document.createElement("div");

                    // this.innerHTML = `${this.getNumero()}<br>${this.getNaipe()}`;
                    cabecario.classList.add("cabecario");
                    meio.classList.add("meio");
                    rodape.classList.add("rodape");

                    cabecario.innerHTML = `${this.getNumero()}<br>${this.getNaipe()}`;
                    meio.innerHTML = this.desenho();
                    rodape.innerHTML = `${this.getNumero()}<br>${this.getNaipe()}`;

                    desenho.appendChild(cabecario);
                    desenho.appendChild(meio);
                    desenho.appendChild(rodape);

                    this.appendChild(desenho);

                    switch (this.naipe) {
                        case 0:
                            this.classList.add("copas");
                            break;
                        case 1:
                            this.classList.add("espadas");
                            break;
                        case 2:
                            this.classList.add("ouros");
                            break;
                        case 3:
                            this.classList.add("paus");
                            break;
                    }

                    switch (this.numero) {
                        case 1:
                            this.classList.add("as");
                            break;
                        case 11:
                            this.classList.add("valete");
                            break;
                        case 12:
                            this.classList.add("rainha");
                            break;
                        case 13:
                            this.classList.add("rei");
                            break;
                    }
                }
                this.virada = virada;
            },
            getNaipe() {
                switch (this.naipe) {
                    case 0:
                        return "♥";
                    case 1:
                        return "♠";
                    case 2:
                        return "♦";
                    case 3:
                        return "♣";
                    default:
                        return this.numero;
                }
            },
            getNumero() {
                switch (this.numero) {
                    case 1:
                        return "A";
                    case 11:
                        return "J";
                    case 12:
                        return "Q";
                    case 13:
                        return "K";
                    default:
                        return this.numero;
                }
            },

            sobrepor(carta) {
                // console.log(this.parentNode.classList);
                if (!this.alocado) {
                    if (!this.comprada && !this.virada && !this.childNodes[1]) {
                        if (this.numero === carta.numero + 1) {
                            if (this.naipe % 2 ^ carta.naipe % 2) {
                                let cartaPai = carta.parentNode;
                                if (cartaPai.virada) {
                                    cartaPai.setVirada(false);
                                    cartaPai.enfileirado = false;
                                }
                                carta.comprada = false;
                                carta.alocado = false;
                                this.enfileirado = true;
                                this.appendChild(carta);
                            }
                        }
                    }
                } else {
                    if (this.naipe === carta.naipe && !carta.childNodes[1]) {
                        if (this.numero === carta.numero - 1) {
                            let cartaPai = carta.parentNode;
                            if (cartaPai.virada) cartaPai.setVirada(false);
                            carta.comprada = false;
                            carta.alocado = true;
                            this.parentNode.appendChild(carta);
                        }
                    }
                }
            },
            desenho() {
                switch (this.numero) {
                    case 2:
                        return "&nbsp&nbsp " + this.getNaipe() + " &nbsp&nbsp<br><br><br><br><br><br>" +
                            "&nbsp&nbsp " + this.getNaipe() + " &nbsp&nbsp";
                    case 3:
                        return "&nbsp&nbsp " + this.getNaipe() + " &nbsp&nbsp<br><br><br>" +
                            "&nbsp&nbsp " + this.getNaipe() + " &nbsp&nbsp<br><br><br>" +
                            "&nbsp&nbsp " + this.getNaipe() + " &nbsp&nbsp";
                    case 4:
                        return this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br><br><br><br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "";
                    case 5:
                        return this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br><br>" +
                            "&nbsp&nbsp " + this.getNaipe() + " &nbsp&nbsp<br><br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe();
                    case 6:
                        return this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe();
                    case 7:
                        return this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br><br>" +
                            this.getNaipe() + " " + this.getNaipe() + " " + this.getNaipe() + "<br><br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe();
                    case 8:
                        return this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe();
                    case 9:
                        return this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br>" +
                            "&nbsp&nbsp " + this.getNaipe() + " &nbsp&nbsp<br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe();

                    case 10:
                        return this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br>" +
                            "&nbsp&nbsp " + this.getNaipe() + " &nbsp&nbsp<br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br><br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe() + "<br>" +
                            "&nbsp&nbsp " + this.getNaipe() + " &nbsp&nbsp<br>" +
                            this.getNaipe() + " &nbsp&nbsp " + this.getNaipe();
                    default:
                        return this.getNaipe();
                }
            },
            selecionar(carta) {
                if (carta.stopPropagation) {
                    carta.stopPropagation();
                }

                console.log(`${this.getNumero()} ${this.getNaipe()} 
                virada:${this.virada}
                enfileirado: ${this.enfileirado}
                alocado: ${this.alocado}`);

                if (!this.virada) {
                    if (cartaSelecionada) {
                        // console.log(cartaSelecionada, this);
                        this.sobrepor(cartaSelecionada);
                        cartaSelecionada.classList.remove("selecionada");
                        cartaSelecionada = null;
                    } else {
                        cartaSelecionada = this;
                        cartaSelecionada.classList.add("selecionada");
                    }
                }
            },
            onmouseover: (e) => {
                e.stopPropagation();
                let carta = e.currentTarget;
                if (!carta.virada && carta.childNodes[1]) {
                    carta.childNodes[1].style.marginTop = "40px";
                }
            },
            onmouseout: (e) => {
                e.stopPropagation();
                let carta = e.currentTarget;
                if (carta.isCarta && carta.childNodes[1]);
                carta.childNodes[1].style.marginTop = "20px";
            }
        }
    }

    for (let numero = 1; numero < 14; numero++) {
        for (let naipe = 0; naipe < 4; naipe++) {
            let element = document.createElement("carta");
            // element.classList.add("carta");
            let carta = Object.assign(element, criarCarta(element));
            // let carta = criarCarta(element);
            carta.numero = numero;
            carta.naipe = naipe;

            cartas.push(carta);
        }
    }

    cartas.sort(() => {
        return (Math.round(Math.random()) - 0.5);
    });

    Array.from(casas).forEach((element, index) => {
        element.onclick = alocarCasa;
        let e = element.lastChild ? element.lastChild : element;
        for (let i = 0; i < index; i++) {
            e = e.lastChild ? e.lastChild : e;
            let carta = cartas.shift();
            carta.setVirada(true);
            e.appendChild(carta);
        }
        e = e.lastChild ? e.lastChild : e;
        let carta = cartas.shift();
        carta.setVirada(false);
        e.appendChild(carta);
    });

    cartas.forEach((carta, index) => {
        carta.setVirada(true);
        carta.onclick = comprar;
        divBaralho.appendChild(carta);
    });

    function comprar(e) {
        let carta = e.target;
        carta.setVirada(false);
        carta.comprada = true;
        divComprado.appendChild(carta);
    }

    divBaralho.onclick = (e) => {
        if (!e.target.hasChildNodes()) {
            let cartas = Array.from(divComprado.childNodes).slice();
            cartas.reverse().forEach(carta => {
                carta.setVirada(true);
                carta.onclick = comprar;

                divBaralho.appendChild(carta);
            });
        }
    }

    function alocarCasa(casa) {
        if (casa.stopPropagation) {
            casa.stopPropagation();
        }
        if (cartaSelecionada.numero === 13 && !casa.hasChildNodes) {
            let cartaPai = cartaSelecionada.parentNode;
            if (cartaPai.virada) cartaPai.setVirada(false);
            cartaSelecionada.comprada = false;
            casa.target.appendChild(cartaSelecionada);
            cartaSelecionada.classList.remove("selecionada");
            cartaSelecionada = null;
        }
    }

    Array.from(naipes).forEach((element) => {
        element.onclick = (e) => {
            if (cartaSelecionada) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (cartaSelecionada.numero === 1) {
                    let cartaPai = cartaSelecionada.parentNode;
                    if (cartaPai.virada) cartaPai.setVirada(false);
                    cartaSelecionada.alocado = true;
                    cartaSelecionada.comprada = false;
                    cartaSelecionada.enfileirado = false;
                    e.target.appendChild(cartaSelecionada);
                }
                cartaSelecionada.classList.remove("selecionada");
                cartaSelecionada = null;
            }
        };
    });
})();