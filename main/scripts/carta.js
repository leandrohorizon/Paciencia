function desenhos(valor, naipe){
	switch(naipe.toString()){
		case "A": 
			return naipe;
		case "2":
			return 	"&nbsp&nbsp ♥ &nbsp&nbsp<br><br><br><br>" +
					"&nbsp&nbsp ♥ &nbsp&nbsp<br>";
		case "3":
			return 	"&nbsp&nbsp ♥ &nbsp&nbsp<br>" +
					"&nbsp&nbsp ♥ &nbsp&nbsp<br>" +
					"&nbsp&nbsp ♥ &nbsp&nbsp<br>";
		case "4":
			return 	"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br>";
		case "5":
			return	"♥ &nbsp&nbsp ♥<br>" +
					"&nbsp&nbsp ♥ &nbsp&nbsp<br>" +
					"♥ &nbsp&nbsp ♥<br>";
		case "6":
			return 	"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br>";
		case "7":
			return 	"♥ &nbsp&nbsp ♥<br>" +
					"&nbsp&nbsp ♥ &nbsp&nbsp<br>" +
					"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br>";
		case "8":
			return 	"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br>";
		case "9":
			return 	"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br>" +
					"&nbsp&nbsp ♥ &nbsp&nbsp<br>" +
					"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br>";
		
		case "10":
			return 	"♥ &nbsp&nbsp ♥<br>" +
					"&nbsp&nbsp ♥ &nbsp&nbsp<br>" +
					"♥ &nbsp&nbsp ♥<br><br>" +
					"♥ &nbsp&nbsp ♥<br>" +
					"&nbsp&nbsp ♥ &nbsp&nbsp<br>" +
					"♥ &nbsp&nbsp ♥<br>";
		default:
			return naipe;
	}
}
// desenhos[10] =
// ♥ &nbsp&nbsp ♥<br>" +
// &nbsp&nbsp ♥ &nbsp&nbsp<br>" +
// ♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br>" +
// &nbsp&nbsp ♥ &nbsp&nbsp<br>" +
// ♥ &nbsp&nbsp ♥<br>;

// 9
// desenhos[9] =
// "♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br>" +
// &nbsp&nbsp ♥ &nbsp&nbsp<br>" +
// ♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br>;

// 8
// desenhos[8] =
// ♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br>;

// 7
// desenhos[7] =
// ♥ &nbsp&nbsp ♥<br>" +
// &nbsp&nbsp ♥ &nbsp&nbsp<br>" +
// ♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br>;

// 6
// desenhos[6] =
// ♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br>;

// 5
// desenhos[5] =
// ♥ &nbsp&nbsp ♥<br>" +
// &nbsp&nbsp ♥ &nbsp&nbsp<br>" +
// ♥ &nbsp&nbsp ♥<br>;

// 4
// desenhos[4] =
// ♥ &nbsp&nbsp ♥<br><br>" +
// ♥ &nbsp&nbsp ♥<br>;

// 3
// desenhos[3] =
// &nbsp&nbsp ♥ &nbsp&nbsp<br>" +
// &nbsp&nbsp ♥ &nbsp&nbsp<br>" +
// &nbsp&nbsp ♥ &nbsp&nbsp<br>;

// 2
// desenhos[2] =
// &nbsp&nbsp ♥ &nbsp&nbsp<br><br><br><br>" +
// &nbsp&nbsp ♥ &nbsp&nbsp<br>;

// A
// desenhos[1] = "♥";