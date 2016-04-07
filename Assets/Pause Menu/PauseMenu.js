

var pauseMenuFont : Font;
private var pauseEnabled = false;			

function Start(){
	pauseEnabled = false;
	Time.timeScale = 1;
	AudioListener.volume = 1;
	Cursor.visible = false;
}

function Update(){

	//check if pause button (escape key) is pressed
	if(Input.GetKeyDown("p")){
	
		//check if game is already paused		
		if(pauseEnabled == true){
			//unpause the game
			pauseEnabled = false;
			Time.timeScale = 1;
			AudioListener.volume = 1;
			Cursor.visible = false;			
		}
		
		//else if game isn't paused, then pause it
		else if(pauseEnabled == false){
			pauseEnabled = true;
			AudioListener.volume = 0;
			Time.timeScale = 0;
			Cursor.visible = true;
		}
	}
}

private var showGraphicsDropDown = false;

function OnGUI(){

GUI.skin.box.font = pauseMenuFont;
GUI.skin.button.font = pauseMenuFont;

	if(pauseEnabled == true){
		
		//Make a background box
		GUI.Box(Rect(Screen.width /2 - 100,Screen.height /2 - 100,250,200), "Menú de pausa");
		
		//Make Main Menu button
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,50), "Menú Principal")){
			Application.LoadLevel("menu");
		}
		
		//Make Change Graphics Quality button
			if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 ,250,50), "Calidad gráfica")){
			
			if(showGraphicsDropDown == false){
				showGraphicsDropDown = true;
			}
			else{
				showGraphicsDropDown = false;
			}
		}
		
		//Create the Graphics settings buttons, these won't show automatically, they will be called when
		//the user clicks on the "Change Graphics Quality" Button, and then dissapear when they click
		//on it again....
		if(showGraphicsDropDown == true){
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 ,250,50), "Muy bajos")){
				QualitySettings.currentLevel = QualityLevel.Fastest;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 50,250,50), "Bajos")){
				QualitySettings.currentLevel = QualityLevel.Fast;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 100,250,50), "Normal")){
				QualitySettings.currentLevel = QualityLevel.Simple;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 150,250,50), "Buenos")){
				QualitySettings.currentLevel = QualityLevel.Good;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 200,250,50), "Muy buenos")){
				QualitySettings.currentLevel = QualityLevel.Beautiful;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 250,250,50), "Desmadre")){
				QualitySettings.currentLevel = QualityLevel.Fantastic;
			}
			
			if(Input.GetKeyDown("o")){
				showGraphicsDropDown = false;
			}
		}
		
		//Make quit game button
		if (GUI.Button (Rect (Screen.width /2 - 100,Screen.height /2 + 50,250,50), "Salir del juego")){
			Application.Quit();
		}
	}
}