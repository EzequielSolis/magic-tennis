var desplazamientoCampo = {
//cantidad de pixeles que se mueve el campo hacia la derecha, se usara en matematicas.js
	x : 319,
	y : 0
}
var centroCamara = {
	//valores en los que la cámara está en el centro.
	x: -200,
	y: -283
}
/*var centroCamara = {
	//valores en los que la cámara está en el centro.
	x: -200,
	y: -500
}*/
	posx = 0;//280;
	posy = 0;//405;
bolaEnJuego.preload = function(){
	//Kiwi.State.prototype.preload.call(this);
	//añadir graficos
	this.addImage("cesped", "graficos/cesped2.png");
	this.addImage("campo", "graficos/campo6.png");
	this.addImage("bola", "graficos/bola.jpg");
}

bolaEnJuego.create = function() {
	//Kiwi.State.prototype.create.call(this);
	//se colocan los graficos y los keybindings
	this.fondo = new Kiwi.GameObjects.StaticImage (this, this.textures.cesped, 0, 0);
	this.campo = new Kiwi.GameObjects.StaticImage (this, this.textures.campo, desplazamientoCampo.x, desplazamientoCampo.y);

	var posicion = mates.rectToTrap(posx,posy);
	this.bola = new Kiwi.GameObjects.StaticImage (this, this.textures.bola, posicion.x, posicion.y);
	this.bola.x = posicion.x - this.bola.width/2;
	this.bola.y = posicion.y - this.bola.height/2;

	//HUD
	//var puntuacion1 = "Jugador A: 15";
	//var puntuacion2 = "Jugador B: 30";
	bote = lugarBote(posx, posy);
	var puntuacion1 = "campo: " + bote.campo;
	var puntuacion2 = "saque: " + bote.saque;
	this.marcador1 = new Kiwi.HUD.Widget.TextField(this.game, puntuacion1, 20, 60 );
	this.marcador1.style.fontFamily = "helvetica";
	this.marcador1.style.fontWeight = "bold";
	this.marcador2 = new Kiwi.HUD.Widget.TextField(this.game, puntuacion2, 20, 90 );
	this.marcador2.style.fontFamily = "helvetica";
	this.marcador2.style.fontWeight = "bold";


    //barras  (game  current  max  x  y  [width=120]  [height=20]  [color='#000'] )
	this.mana1 = new Kiwi.HUD.Widget.Bar(this.game, 100, 100, 20, 533, 15, 200, "blue" );
	this.mana2 = new Kiwi.HUD.Widget.Bar(this.game, 100, 100, 984, 533, 15, 200, "blue" );

	//numeros que uso para el movimiento aleatorio luego
	this.num = 1;
	this.num2 = 1;

	this.addChild(this.fondo);
	this.addChild(this.campo);
	this.addChild(this.bola);

	this.game.huds.defaultHUD.addWidget( this.marcador1 );
	this.game.huds.defaultHUD.addWidget( this.marcador2 );
	this.game.huds.defaultHUD.addWidget( this.mana1 );
	this.game.huds.defaultHUD.addWidget( this.mana2 );

	//valores iniciales de la camara para que esté en el centro
	this.game.cameras.defaultCamera.transform.x = centroCamara.x;
	this.game.cameras.defaultCamera.transform.y = centroCamara.y;
}

bolaEnJuego.update = function() {
	//Kiwi.State.prototype.update.call(this);
	//lo que se hace en cada frame

	//movimiento aleatorio, se cambia de dirección y velocidad cada 220 frames
	/*if (magicTennis.frame % 30 == 0){
		
		this.num = Math.floor(Math.random()*4) + 1; //numero entre 1 y 5
		this.num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // positivo o negativo
		this.num2 = Math.floor(Math.random()*4) + 1; 
		this.num2 *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 

	}*/
	this.num = 3;
	this.num2 = 3;
	posx += this.num;
	posy += this.num2;
	var posicion = mates.rectToTrap(posx,posy);
	//dibujamos la bola mas arriba a la izquierda para que el centro este donde nos ha devuelto la función
	this.bola.x = posicion.x - this.bola.width/2;
	this.bola.y = posicion.y - this.bola.height/2;
	if (this.bola.x <= 0)
		this.bola.x =0;
	
	if (this.bola.x > opcionesJuego.width +100)
		this.bola.x = opcionesJuego.width +100;
	

	if (this.bola.y <= 160)
		this.bola.y = 160;

	if (this.bola.y > 1333)
		this.bola.y = 1333;
	bote = lugarBote(posx, posy);
	var puntuacion1 = "campo: " + bote.campo;
	var puntuacion2 = "saque: " + bote.saque;
	this.marcador1.text = puntuacion1;
	this.marcador2.text = puntuacion2;
	moverCamara(this.bola.x, this.bola.y);


}
console.log(bolaEnJuego.stage);
//recibe las coordenadas en las que está la bola actualmente (coordenadas trapezoidales)
function moverCamara(x,y){
	//bolaEnJuego.game.cameras.defaultCamera.transform.x = -1*(Math.abs((centroCamara.x - x/2)));
	//bolaEnJuego.game.cameras.defaultCamera.transform.y = -1*(Math.abs((centroCamara.y - y/2)));
	//bolaEnJuego.game.cameras.defaultCamera.transform.x = (-1 * x) - centroCamara.x + desplazamientoCampo.x;
	//bolaEnJuego.game.cameras.defaultCamera.transform.y = (-1 * y) - centroCamara.y;

	bolaEnJuego.game.cameras.defaultCamera.transform.x = -1 * (x - opcionesJuego.width/2) //+ Math.abs(Math.abs(centroCamara.x) - (x - opcionesJuego.width/2)) ;
	bolaEnJuego.game.cameras.defaultCamera.transform.y = -1 * (y - opcionesJuego.height/2) //+ Math.abs(Math.abs(centroCamara.y) - (y - opcionesJuego.height/2));
	if (bolaEnJuego.game.cameras.defaultCamera.transform.x < -250){ //limite derecha
		bolaEnJuego.game.cameras.defaultCamera.transform.x = -250;
	}
	if (bolaEnJuego.game.cameras.defaultCamera.transform.x > -220){ //limite izquierda
		bolaEnJuego.game.cameras.defaultCamera.transform.x = -220;
	}
	if (bolaEnJuego.game.cameras.defaultCamera.transform.y < -500){ //limite de abajo
		bolaEnJuego.game.cameras.defaultCamera.transform.y = -500;
	}
	if (bolaEnJuego.game.cameras.defaultCamera.transform.y > -200){ //limite de arriba
		bolaEnJuego.game.cameras.defaultCamera.transform.y = -200;
	}
}