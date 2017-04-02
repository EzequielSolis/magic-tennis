var mates = {}


inicializarMates();

function inicializarMates(){
	//mates.g = 100; // Factor para hacerlo todo m�s grande, sin m�s.
	//mates.a = mates.g*10.97; // Anchura del rect�ngulo que es el campo de juego
	//mates.b = mates.g*23.77; // Altura del rect�ngulo que es el campo de juego
	//mates.c = mates.g*9.5;   // Anchura del lado de arriba del trapecio (extremo lejano del campo en perspectiva)
	mates.a = 469.2;
	mates.b = 799.8;
	mates.c = 406.33;
	mates.v = 3/4;  // Fracci�n de altura del campo en perspectiva. Por ejemplo si b=100 y v=1/2, entonces el trapecio tendr� una altura de 50.
	mates.u = 1/3; // Fracci�n de la altura de la red en perspectiva. Por ejemplo si b=100 y u=1/4, entonces la red est�ra en y= 25
	mates.f = 2/3; // Un factor que define las dimensiones del rect�ngulo total, contando el �rea de "fuera". Por ejemplo, si f=0
	// entonces no hay �rea de fuera. Si f=1, entonces el �rea de fuera ser�a
	// igual a las dimensiones del campo,etc.
	mates.A = (1+mates.f)*mates.a; // Anchura total del rect�ngulo, condando el �rea de "fuera" (que ser�a de (A-a)/4 por cada lado del campo)
	mates.B = (1+mates.f)*mates.b; // Altura total del rect�ngulo, condando el �rea de "fuera" (que ser�a de (B-b)/4 por cada lado del campo)	
	mates.C = (1+mates.f)*mates.c;
	mates.xc = (mates.A-mates.a)/2; // Coordenada x donde empieza el campo. Este par�metro no es necesario para las f�rmulas, pero ser� �til m�s adelante
	mates.yc = (mates.B-mates.b)/2; // Coordenada y donde empieza el campo. Este par�metro no es necesario para las f�rmulas, pero ser� �til m�s adelante
	mates.xp = function (x,y){
		// La funci�n coge un punto (x,y) en coordenadas cartesianas y devuelve la
		// coordenada aparente xp que tendr�a dicho punto en un trapecio (rect�ngulo
		// visto en perspectiva).
		// La funci�n tiene como argumentos el punto (x,y) que se quiere
		// transformar, la anchura a del rect�ngulo, la altura b del rect�ngulo, y
		// la anchura c del extremo lejano del campo en perspectiva
		//xp=round( (A-C).*(1-y./B)+x/A.*(-A+2*C+y./B*(2*A-2*C)  ));
		return Math.round((mates.A-mates.C)*(1-y/mates.B)+x/mates.A*(-mates.A+2*mates.C+y/mates.B*(2*mates.A-2*mates.C)));
	}

	mates.yp = function(x,y){
		// La funci�n coge un punto (x,y) en coordenadas cartesianas y devuelve la
		// coordenada aparente yp que tendr�a dicho punto en un trapecio (rect�ngulo
		// visto en perspectiva).
		// La funci�n tiene como argumentos el punto (x,y) que se quiere
		// transformar, la anchura a del rect�ngulo, la altura b del rect�ngulo, y
		// la anchura c del extremo lejano del campo en perspectiva
		alpha=4*mates.u-mates.v;
		beta=(2*mates.v-4*mates.u)/mates.B;
		return Math.round( 1/2*mates.B-mates.u*mates.B+(alpha + beta*y)*y);
	}

	mates.rectToTrap = function (xr, yr){

		x = mates.xp(xr,yr);
		y = mates.yp(xr,yr);
		//desplazamos las coordenadas tanto como desplacemos el campo

		if (desplazamientoCampo.x != undefined)
			x += desplazamientoCampo.x;
		if (desplazamientoCampo.y != undefined)
			y += desplazamientoCampo.y;
		return {x : x, y: y};
	}

}

//dadas unas coordenadas x,y (del rectangulo) 
//devuelve un objeto {campo, saque} con la ubicacion de la bola en relacion al campo
//actualmente interpreta los pasillos de dobles como fuera
function lugarBote(x, y){
	var campo; //arriba, abajo o fuera
	var saque; //arrIzqd, arrDrch, abjIzqd, abjDrch o fuera

	//fuera del rectangulo de juego
	if (x < 217.5 || x > 782 - 217.5 || y < 266.5 || y > 1333 - 266.5){
		campo = "fuera";
		saque = "fuera";
	}
	else{
		if (y > 667.5){
			campo = "abajo";
			if(y > 1333-449.5)
				saque = "fuera";
			else if (x <393.5)
				saque = "abjIzqd";
			else
				saque = "abjDrch";
		} else{
			campo = "arriba";
			if (y < 449.5)
				saque = "fuera";
			else if (x <393.5)
				saque = "arrIzqd";
			else
				saque = "arrDrch";
		}
	}
	return {campo: campo, saque : saque};
}































