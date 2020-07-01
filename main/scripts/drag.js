var dragSelecionado;
var b = true;
function handleDragStart(e) {
	console.log(this.oculta);
	console.log("moveu");
	
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

	if (dragSelecionado != this) {
    // Set the source cartaumn's HTML to the HTML of the cartaumnwe dropped on.
		dragSelecionado.style.top = "20px";
		dragSelecionado.style.left = "-1px";
	
		this.appendChild(dragSelecionado);
		if(dragSelecionado.pai != null)
		virar(dragSelecionado.pai);
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
var c = true;
function mouseup(e){
	c = true;
}

function virar(carta){
	carta.addEventListener('click', onClick, false);
	carta.addEventListener('mouseup', mouseup, false);
}
function onClick(e){
	//virar
	if(c){
		console.log("virou");
		c = false;
	}else
		return
	
	this.innerHTML = this.naipe+" "+this.numero;
	this.setAttribute("draggable","true");
	
	this.addEventListener('dragstart', handleDragStart, false);
	this.addEventListener('dragenter', handleDragEnter, false);
	this.addEventListener('dragover', handleDragOver, false);
	this.addEventListener('dragleave', handleDragLeave, false);
	this.addEventListener('drop', handleDrop, false);
	this.addEventListener('dragend', handleDragEnd, false);
}

var cartas = document.querySelectorAll('.carta');



[].forEach.call(cartas, function(carta) {
	// if(!carta.oculta){
		if(!carta.oculta){
			carta.addEventListener('dragstart', handleDragStart, false);
			carta.addEventListener('dragenter', handleDragEnter, false);
			carta.addEventListener('dragover', handleDragOver, false);
			
			carta.addEventListener('dragleave', handleDragLeave, false);
			carta.addEventListener('drop', handleDrop, false);
			
			carta.addEventListener('dragend', handleDragEnd, false);
			
			carta.addEventListener('click', onClick, false);
			carta.addEventListener('mouseup', mouseup, false);
			
		}
		
	// }
	
});