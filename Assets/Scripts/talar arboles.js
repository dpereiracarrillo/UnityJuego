//p'*"[-+:;P =-++

var Spawns : Transform[]; //Donde se spawneara la madera u objetos

var Prefabs : GameObject[]; //Objetos a spawnear

var Hardness : float = 100.0; //Dureza del Objeto

var Distance : float = 21; //Esto calculara si estas cerca del objeto y puedes interactuar con el, recomendado dejar este valor

var Player : Transform; //El Jugador

var ObjectToCut : GameObject;

var FallTime : int = 3;

private var hasFall : boolean = false;

private var hasPlayedSFX : boolean = false;

private var isInRange : boolean = false;

var WoodCuttingSFX : AudioClip;

var WCSFXDuration : float = 1.0;

var SpawnSFX : AudioClip;

function Start () {
/*
	if(Player == null) {
		Player = GameObject.Find("First Person Controller").Transform;
	}
*/
}


function Update () {

/*
	var fwd : Vector3 = Player.forward.normalized;
	
	var other : Vector3 = (transform.position - Player.position).normalized;

	var theProduct : float = Vector3.Dot( fwd, other );
*/
	CheckDistance();
	//esto va reduciendo la dureza y va haciendola 0 
	if( Input.GetButton("Fire1") && isInRange ) {
		
		PlaySFX();
		Hardness -= 1;
		//Debug.Log(Hardness);
	}
	
	//esto calcula que si el arbol u objeto no tiene dureza este se transformara en los prefabs.
	if(Hardness <= 0) {
	
		Hardness = 0;
		Fall();
		
	}
	if( isInRange )
		Debug.Log("You are near to the instance");
}

function Fall () {

	if(!hasFall) {

		hasFall = true;
		var obj = Prefabs[Random.Range(0,Prefabs.length)];
		

		//var pos = Spawns[Random.Range(0,Spawns.length)];

			ObjectToCut.AddComponent(Rigidbody); //tiene gravedad.
			yield WaitForSeconds(FallTime);
			GetComponent.<AudioSource>().PlayClipAtPoint( SpawnSFX, Player.position ); 
			hasFall = true;
			for(var i : int = 0; i < Spawns.length; i++) {
				Instantiate(obj, Spawns[i].position, Spawns[i].rotation);
			}
			Destroy(ObjectToCut);
			Destroy(this);
	}
}

function PlaySFX () {

	if(!hasPlayedSFX && !hasFall ) {
		hasPlayedSFX = true;
		GetComponent.<AudioSource>().PlayClipAtPoint ( WoodCuttingSFX, Player.position );
		yield WaitForSeconds(WCSFXDuration);
		hasPlayedSFX = false;
	}
}

function CheckDistance() 
{
	var sqrDist : float = ( transform.position - Player.position).sqrMagnitude;
	
	if ( sqrDist < Distance )
	{
		isInRange = true;
	}
	else
	{
		isInRange = false;
	}	
}
