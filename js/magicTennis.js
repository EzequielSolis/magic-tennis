var opcionesJuego = {
	debug : Kiwi.DEBUG_ON, //Or Kiwi.DEBUG_OFF
	deviceTarget : Kiwi.TARGET_BROWSER, //Or Kiwi.TARGET_COCOON
	renderer: Kiwi.RENDERER_WEBGL, 
	scaleType : Kiwi.Stage.SCALE_NONE, //Also accepts "SCALE_STRETCH" or "SCALE_FIT"
	width: 1024,
	height: 768,
	plugins : [] // plugins : ['SaveGame', 'InAppPurchase'],
}
	

/*
Parametros de Kiwi.Game:
1) elemento canvas donde se inserta el juego (cadena vacia y se creará solo)
2) nombre del juego
3) estado inicial
4) opciones del juego
*/
var magicTennis = new Kiwi.Game('', 'Magic Tennis', null, opcionesJuego);






//---------Creación de Estados del juego--------------

var bolaEnJuego = new Kiwi.State("bolaEnJuego");
//var estadoCarga = new Kiwi.State("estadoCarga");


magicTennis.states.addState(bolaEnJuego);



magicTennis.states.switchState("bolaEnJuego"); //estado inicial

