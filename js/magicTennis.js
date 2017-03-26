var magicTennis = new Kiwi.Game();
var estadoPrueba = new Kiwi.State("estadoPrueba");
//var estadoCarga = new Kiwi.State("estadoCarga");

estadoPrueba.preload = function(){
	Kiwi.State.prototype.preload.call(this);
	//añadir graficos
}

estadoPrueba.create = function() {
	Kiwi.State.prototype.create.call(this);
	//se colocan los graficos y los keybindings
}

estadoPrueba.update = function() {
	Kiwi.State.prototype.update.call(this);
	//lo que se hace en cada frame
}


magicTennis.states.addState(estadoPrueba);

magicTennis.states.switchState("estadoPrueba"); //estado inicial