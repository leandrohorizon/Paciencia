console.log("lal menn '-'");

const divpai = document.getElementById("paiTodos");
// const filhos = document.createElement("div");

// filhos.setAttribute("id","fundo");
// filhos.setAttribute("style", "display:block;width:100px;height:100px; border: solid 1px;");

var filhos = [];

// divpai.appendChild(filhos);

for(i = 0; i < 52; i++){
	var filho = document.createElement("div"+i);
	filho.setAttribute("id","fundo");
	// var config = "left: "+(i*110)+";";
	// filho.setAttribute("style", "position: absolute; "+config+" width:100px; height:100px; border: solid 1px; background: orange;");
	filho.setAttribute("style", "display: inline-block; width:100px; height:100px; border: solid 1px; background: orange; margin: 2px;");
	filhos.push(filho);
}



function exibir(filho){
	divpai.appendChild(filho);
}

filhos.forEach(exibir);