var opcionesJuego = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 1024,
	height: 800
}

var magicTennis = new Kiwi.Game('', 'Magic Tennis', null, opcionesJuego);
var estadoPrueba = new Kiwi.State("estadoPrueba");
//var estadoCarga = new Kiwi.State("estadoCarga");

estadoPrueba.preload = function(){
	Kiwi.State.prototype.preload.call(this);
	//añadir graficos
	this.addImage("cesped", "graficos/cesped.png");
	this.addImage("bola", "graficos/bola.jpg");
}

estadoPrueba.create = function() {
	Kiwi.State.prototype.create.call(this);
	//se colocan los graficos y los keybindings
	this.fondo = new Kiwi.GameObjects.StaticImage (this, this.textures.cesped, 0, 0);
	this.bola = new Kiwi.GameObjects.StaticImage (this, this.textures.bola, 400, 140);

	this.addChild(this.fondo);
	this.addChild(this.campo);
	this.addChild(this.bola);
}

estadoPrueba.update = function() {
	Kiwi.State.prototype.update.call(this);
	//lo que se hace en cada frame
}


magicTennis.states.addState(estadoPrueba);

magicTennis.states.switchState("estadoPrueba"); //estado inicial