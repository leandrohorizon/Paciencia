const divBaralho = document.getElementById("baralho");
const divComprado = document.getElementById("comprado");

const divCasa1 = document.getElementById("casa1");
const divCasa2 = document.getElementById("casa2");
const divCasa3 = document.getElementById("casa3");
const divCasa4 = document.getElementById("casa4");
const divCasa5 = document.getElementById("casa5");
const divCasa6 = document.getElementById("casa6");
const divCasa7 = document.getElementById("casa7");

var cartas = [];
function processar(indice, subtraidor){
	switch(indice - subtraidor){
		case 0:
			return "A";
		case 10:
			return "J";
		case 11:
			return "Q";
		case 12:
			return "K";
		default:
			return (indice+1)-subtraidor;
	}
}

for(i = 0; i < 52; i++){
	var carta = document.createElement("div"+i);
	carta.oculta = false;
	carta.casaNaipe = true;
	
	carta.setAttribute("id","carta"+i);
	carta.setAttribute("class","carta");
	
	if(i < 13){
		carta.classList.add('copas');
		
		// carta.innerHTML = "♥ "+processar(i, 0);
		
		carta.naipe = "♥";
		carta.numero = processar(i, 0);
		
		carta.innerHTML = 
		"<div class = \"cabecario\">"+carta.numero+"<br>"+carta.naipe+"</div><div class = \"meio\">"+carta.naipe+"</div><div class = \"rodape\">"+carta.numero+"<br>"+carta.naipe+"</div>";
		
	}else if(i < 26){
		carta.classList.add('espadas');
		
		carta.naipe = "♠";
		carta.numero = processar(i, 13);
		
		carta.innerHTML = 
		"<div class = \"cabecario\">"+carta.numero+"<br>"+carta.naipe+"</div><div class = \"meio\">"+carta.naipe+"</div><div class = \"rodape\">"+carta.numero+"<br>"+carta.naipe+"</div>";
	}else if(i < 39){
		carta.classList.add('ouros');
		
		carta.naipe = "♦";
		carta.numero = processar(i, 26);
		carta.innerHTML = 
		"<div class = \"cabecario\">"+carta.numero+"<br>"+carta.naipe+"</div><div class = \"meio\">"+carta.naipe+"</div><div class = \"rodape\">"+carta.numero+"<br>"+carta.naipe+"</div>";
	}else if(i < 52){
		carta.classList.add('paus');
		
		carta.naipe = "♣";
		carta.numero = processar(i, 39);
		carta.innerHTML = 
		"<div class = \"cabecario\">"+carta.numero+"<br>"+carta.naipe+"</div><div class = \"meio\">"+carta.naipe+"</div><div class = \"rodape\">"+carta.numero+"<br>"+carta.naipe+"</div>";
	}
	carta.oculto = false;
	
	
	cartas.push(carta);
	
}

var casa = 1;
var contador = 0;
var cartaAnterior;

alternador = true;

var cc = 2;
var casas = document.querySelectorAll('.casa');
	
divCasa1.append(cartas[0]);
function exibir2(carta){
	if(casa == 8){
		carta.setAttribute("style", "top = 0");
		carta.oculta = true;
		
		carta.innerHTML = "";
		carta.classList.add('cartaVirada');
		
		carta.addEventListener('click', comprar, false);
		
		divBaralho.appendChild(carta);
		return;
	}
	
	if(alternador){
		var config = "top: "+((contador)*20)+";";
		carta.setAttribute("style", config);
	}else{
		var config = "top: 20px; left:0px";
		carta.setAttribute("style", config);
	}
	
	if(casa == 1){
		divCasa1.append(carta);
		carta.setAttribute("draggable","true");
		carta.oculta = false;
		casa++;
		return
	}
	
	if(alternador){
		casas[casa-1].appendChild(carta);
		alternador = false;
		cartaAnterior = carta;
	}else{
		cartaAnterior.appendChild(carta);
		carta.pai = cartaAnterior;
		cartaAnterior = carta;
		
	}
	contador++;
	
	if(contador < cc){
		carta.oculta = true;
	}else if(contador == cc){
		contador = 0;
		casa++;
		cc++;
		alternador = true;
	}else{
		carta.oculta = false;
	}
	
	if(carta.oculta){
		carta.innerHTML = "";
		carta.classList.add('cartaVirada');
	}else{
		carta.setAttribute("draggable","true");
	}
}
function randOrd() {
    return (Math.round(Math.random())-0.5);
}

cartas.sort(randOrd);
cartas.forEach(exibir2);

///////////////////////////comprar



function comprar(e){
	divComprado.appendChild(this);
	virar(this);
	permitir = false;
	this.removeEventListener('click', comprar, false);
}

divBaralho.addEventListener('click', voltarCartas, false);
var permitir = false;
function voltarCartas(e){
	if(!permitir){
		permitir = true;
		return;
	}
	if(divBaralho.childNodes.length != 0)
		return;
	
	while(divComprado.childNodes.length != 0){
		carta = divComprado.childNodes[divComprado.childNodes.length-1];
		divBaralho.appendChild(carta);
		desvirar(carta);
		carta.addEventListener('click', comprar, false);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function primeiroPai(carta){
	while(carta.pai != null){
		carta = carta.pai;
	}
	return carta;
}

var dragSelecionado;
var b = true;
function handleDragStart(e) {
	
	if(b){
		b = false;
		dragSelecionado = this;
	}
}

function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
	}

	e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

	return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
	this.classList.add('over');
}

function handleDragLeave(e) {
	this.classList.remove('over');  // this / e.target is previous target element.
}

// retirar o over

function handleDrop(e) {
  // this / e.target is current target element.
	
	if (e.stopPropagation) {
		e.stopPropagation(); // stops the browser from redirecting.
	}
	
	for(i = 0; i < naipes.length; i++){
		if(this == naipes[i] || this.parentNode == naipes[i]){
			if(naipes[i].firstChild != null){
				if(naipes[i].firstChild.naipe == dragSelecionado.naipe){
					
					switch(naipes[i].lastChild.numero.toString() + dragSelecionado.numero.toString()){
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
							virar(dragSelecionado.parentNode);
							dragSelecionado.style.top = "0px";
							dragSelecionado.style.left = naipes[i].style.left;
							naipes[i].appendChild(dragSelecionado);
							isWin();
							break;
						default:
							return;
					}
				}
			}else{
				if(dragSelecionado.numero != "A")
					return;
				virar(dragSelecionado.parentNode);
				dragSelecionado.style.top = "0px";
				dragSelecionado.style.left = naipes[i].style.left;
				naipes[i].appendChild(dragSelecionado);
			}
			
			// if(naipes[i].firstChild.naipe == dragSelecionado.naipe){
				// naipes[i].appendChild(dragSelecionado);
			// }
			
			return;
		}
		isWin();
	}
	for(i = 0; i < casas.length; i++){
		if(this == casas[i]){
			if(dragSelecionado.numero != "K")
				return;
			dragSelecionado.style.top = "0px";
			dragSelecionado.style.left = casas[i].style.left;
			virar(dragSelecionado.parentNode);
			casas[i].appendChild(dragSelecionado);
			
			
			return;
		}
	}
	// if(this.className == "casa" && dragSelecionado.naipe != "K"){
		// dragSelecionado.style.left = this.style.left;
		
		// this.appendChild(dragSelecionado);
		// return;
	// }
	
	if (dragSelecionado != this && this.parentNode.className != "baralho") {
		if(dragSelecionado.className.includes("carta")){
			
			switch(this.naipe+dragSelecionado.naipe){
				case "♦♠":
				case "♦♣":
				case "♥♠":
				case "♥♣":
				
				case "♠♥":
				case "♠♦":
				case "♣♥":
				case "♣♦":
					break;
					
				default:
					alert(this.naipe+dragSelecionado.naipe);
					return;
				
			}
			
			switch(dragSelecionado.numero.toString() + this.numero.toString()){
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
					break;
					
				default:
					alert(dragSelecionado.numero.toString() + this.numero.toString());
					return;
			}
		
			virar(dragSelecionado.parentNode);
			
			dragSelecionado.style.top = "20px";
			dragSelecionado.style.left = "0px";
			
			this.appendChild(dragSelecionado);
		}
	}
	return false;
}

function handleDragEnd(e) {
	b = true;
  // this/e.target is the source node.
	this.style.opacity = '1.0';
	[].forEach.call(cartas, function (carta) {
		carta.classList.remove('over');
	});
}



function desvirar(carta){
	carta.innerHTML = "";
	carta.classList.add('cartaVirada');
	
	carta.setAttribute("draggable","true");
	
	carta.removeEventListener('dragstart', handleDragStart, false);
	carta.removeEventListener('dragenter', handleDragEnter, false);
	carta.removeEventListener('dragover', handleDragOver, false);
		
	carta.removeEventListener('dragleave', handleDragLeave, false);
	carta.removeEventListener('drop', handleDrop, false);
		
	carta.removeEventListener('dragend', handleDragEnd, false);
	
	
	carta.removeEventListener("dblclick", duploClick, false);
	carta.removeEventListener("mouseup", mouseup, false);
}

function virar(carta){
	if(!carta.className.includes("carta"))
		return;
	
	carta.innerHTML = 
		"<div class = \"cabecario\">"+carta.numero+"<br>"+carta.naipe+"</div><div class = \"meio\">"+carta.naipe+"</div><div class = \"rodape\">"+carta.numero+"<br>"+carta.naipe+"</div>";
	carta.classList.remove('cartaVirada');
	carta.setAttribute("draggable","true");
	
	carta.addEventListener('dragstart', handleDragStart, false);
	carta.addEventListener('dragenter', handleDragEnter, false);
	carta.addEventListener('dragover', handleDragOver, false);
		
	carta.addEventListener('dragleave', handleDragLeave, false);
	carta.addEventListener('drop', handleDrop, false);
		
	carta.addEventListener('dragend', handleDragEnd, false);
	
	carta.addEventListener("dblclick", duploClick, false);
	carta.addEventListener("mouseup", mouseup, false);
}

var cartas = document.querySelectorAll('.carta');
var naipes = document.querySelectorAll('.naipe'); 
var casas = document.querySelectorAll('.casa'); 

naipes.forEach(selecionavel);
casas.forEach(selecionavel);
var c = true
function duploClick(e){
	if(!this.className.includes("carta")){
		return;
	}else if(c)
		c = false
	if(this.childNodes.length > 3)
		return;
	for(i = 0; i < naipes.length; i++){
		if(naipes[i].firstChild != null){
			if(naipes[i].firstChild.naipe == this.naipe){
				
				switch(naipes[i].lastChild.numero.toString() + this.numero.toString()){
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
						virar(this.parentNode);
						this.style.top = "0px";
						this.style.left = naipes[i].style.left;
						naipes[i].appendChild(this);
						isWin();
						break;
					default:
						return;
				}
			}
		}else if(this.numero == "A"){
			virar(this.parentNode);
			this.style.top = "0px";
			this.style.left = naipes[i].style.left;
			naipes[i].appendChild(this);
			isWin();
			return;
		}
	}
}
function isWin(){
	var contador = 0;
	naipes.forEach(function(naipe){
		if(naipe.childElementCount == 13)
			contador++;
	});
	
	if(contador == 4){
		alert("voce ganhou");
	}
	
}
function mouseup(e){
	c = true;
}

boolenDetail = true;
function detail(e){
	if(this.className.includes("cartaVirada"))
		return;
	if(boolenDetail){
		boolenDetail = false;
	}else{
		return;
	}
	
	// this.childNodes[0].style.background = "#FFFFFF";
	if(this.childElementCount > 3){
		this.childNodes[3].style.top = "35px";
	}
}

function detailOver(e){
	if(!boolenDetail){
		boolenDetail = true;
	}else{
		return;
	}
	
	if(this.childElementCount > 3){
		this.childNodes[3].style.top = "20px";
	}
}

[].forEach.call(cartas, function(carta) {
	carta.addEventListener('mouseover', detail);
	carta.addEventListener('mouseout', detailOver);
	
	if(!carta.oculta){
		carta.addEventListener('dragstart', handleDragStart, false);
		carta.addEventListener('dragenter', handleDragEnter, false);
		carta.addEventListener('dragover', handleDragOver, false);
		
		carta.addEventListener('dragleave', handleDragLeave, false);
		carta.addEventListener('drop', handleDrop, false);
		
		carta.addEventListener('dragend', handleDragEnd, false);
		carta.addEventListener('dblclick', duploClick, false);
		carta.addEventListener('mouseup', mouseup, false);
	}
});
function selecionavel(casa){
	casa.addEventListener('dragenter', handleDragEnter, false);
	casa.addEventListener('dragover', handleDragOver, false);
		
	casa.addEventListener('dragleave', handleDragLeave, false);
	casa.addEventListener('drop', handleDrop, false);
		
	casa.addEventListener('dragend', handleDragEnd, false);
}