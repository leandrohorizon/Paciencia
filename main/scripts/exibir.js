function exibir(carta){
	if(alternador){
	var config = "top: "+((contador)*20)+";";
	carta.setAttribute("style", config);
	}else{
	var config = "top: 20px; left:-1px";
	carta.setAttribute("style", config);
	}
	switch(casa){
		case 1:
			divCasa1.appendChild(carta);
			casa++;
			break;
		case 2:
			if(alternador){
				divCasa2.appendChild(carta);
				alternador = false;
				cartaAnterior = carta;
			}else{
				cartaAnterior.appendChild(carta);
				cartaAnterior = carta;
			}
			contador++;
			if(contador < 2){
				carta.oculta = true;
			}else if(contador == 2){
				contador = 0;
				casa++;
				alternador = true;
			}else{
				carta.oculta = false;
			}
			break;	
		case 3:
			if(alternador){
				divCasa3.appendChild(carta);
				alternador = false;
				cartaAnterior = carta;
			}else{
				cartaAnterior.appendChild(carta);
				cartaAnterior = carta;
			}
			contador++;
			if(contador < 3){
				carta.oculta = true;
			}else if(contador == 3){
				contador = 0;
				casa++;
				alternador = true;
			}else{
				carta.oculta = false;
			}
			break;
		case 4:
			if(alternador){
				divCasa4.appendChild(carta);
				alternador = false;
				cartaAnterior = carta;
			}else{
				cartaAnterior.appendChild(carta);
				cartaAnterior = carta;
			}
			contador++;
			if(contador < 4){
				carta.oculta = true;
			}else if(contador == 4){
				contador = 0;
				casa++;
				alternador = true;
			}else{
				carta.oculta = false;
			}
			break;
		case 5:
			if(alternador){
				divCasa5.appendChild(carta);
				alternador = false;
				cartaAnterior = carta;
			}else{
				cartaAnterior.appendChild(carta);
				cartaAnterior = carta;
			}
			contador++;
			if(contador < 5){
				carta.oculta = true;
			}else if(contador == 5){
				contador = 0;
				casa++;
				alternador = true;
			}else{
				carta.oculta = false;
			}
			break;
		case 6:
			if(alternador){
				divCasa6.appendChild(carta);
				alternador = false;
				cartaAnterior = carta;
			}else{
				cartaAnterior.appendChild(carta);
				cartaAnterior = carta;
			}
			contador++;
			carta.oculta = false;
			if(contador < 6){
				carta.oculta = true;
			}else if(contador == 6){
				contador = 0;
				casa++;
				alternador = true;
			}else{
				carta.oculta = false;
			}
			break;
		case 7:
			if(alternador){
				divCasa7.appendChild(carta);
				alternador = false;
				cartaAnterior = carta;
			}else{
				cartaAnterior.appendChild(carta);
				cartaAnterior = carta;
			}
			contador++;
			
			if(contador < 7){
				carta.oculta = true;
			}else if(contador == 7){
				carta.oculta = false;
				contador = 0;
				casa++;
				alternador = true;
			}else{
				carta.oculta = false;
			}
			break;
		case 8:
			carta.setAttribute("style", "top = 0");
			carta.oculta = true;
			divBaralho.appendChild(carta);
			break;
	}
	// divCasa7.appendChild(carta);
	// console.log(contador);
	if(carta.oculta){
		carta.innerHTML = "";
		// carta.setAttribute("draggable","false");
	}else{
		carta.setAttribute("draggable","true");
	}
}