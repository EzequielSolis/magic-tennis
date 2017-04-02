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
	this.campo = new Kiwi.GameObjects.StaticImage (this, this.textures.campo, 100, 0);
	this.bola = new Kiwi.GameObjects.StaticImage (this, this.textures.bola, 500, 700);

	this.campo.scaleX = 1;
	this.campo.scaleY = 1; 

	//HUD
	var puntuacion1 = "Jugador A: 15";
	var puntuacion2 = "Jugador B: 30";
	this.marcador1 = new Kiwi.HUD.Widget.TextField(this.game, puntuacion1, 20, 60 );
	this.marcador1.style.fontFamily = "helvetica";
	this.marcador1.style.fontWeight = "bold";
	this.marcador2 = new Kiwi.HUD.Widget.TextField(this.game, puntuacion2, 20, 90 );
	this.marcador2.style.fontFamily = "helvetica";
	this.marcador2.style.fontWeight = "bold";


    //barras  (game  current  max  x  y  [width=120]  [height=20]  [color='#000'] )
	this.mana1 = new Kiwi.HUD.Widget.Bar(this.game, 100, 100, 20, 533, 15, 200, "blue" );
	this.mana2 = new Kiwi.HUD.Widget.Bar(this.game, 100, 100, 984, 533, 15, 200, "blue" );


	this.addChild(this.fondo);
	this.addChild(this.campo);
	this.addChild(this.bola);

	this.game.huds.defaultHUD.addWidget( this.marcador1 );
	this.game.huds.defaultHUD.addWidget( this.marcador2 );
	this.game.huds.defaultHUD.addWidget( this.mana1 );
	this.game.huds.defaultHUD.addWidget( this.mana2 );


	this.game.cameras.defaultCamera.transform.x = 0;
	this.game.cameras.defaultCamera.transform.y = -315;
}

bolaEnJuego.update = function() {
	//Kiwi.State.prototype.update.call(this);
	//lo que se hace en cada frame
}

