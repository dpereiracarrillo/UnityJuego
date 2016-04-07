#pragma strict

var currentHealth : float = 100.0;
var maxHealth : int = 100;

var currentThirst : float = 100.0;
var maxThirst : int = 100;

var currentHunger : float = 100.0;
var maxHunger : int = 100;

private var barLength = 0.0;

function Start()
{
	barLength = Screen.width / 8;
}

function Update()
{
	if(currentHealth <= 0)
	{
		CharacterDeath();
	}
	
	
	if(currentThirst >= 0)
	{
		currentThirst -= Time.deltaTime / 2;
	}
	
	if(currentThirst <= 0)
	{
		currentThirst = 0;
	}
	
	if(currentThirst >= maxThirst)
	{
		currentThirst = maxThirst;
	}
	
	
		if(currentHunger >= 0)
	{
		currentHunger -= Time.deltaTime / 4;
	}
	
	if(currentHunger <= 0)
	{
		currentHunger = 0;
	}
	
	if(currentHunger >= maxHunger)
	{
		currentHunger = maxHunger;
	}
	
	
	if(currentHunger <= 0 && (currentThirst <= 0))
	{
		currentHealth -= Time.deltaTime / 2;
	}
	
	else
	{
		if(currentHunger <= 0 || currentThirst <= 0)
		{
			currentHealth -= Time.deltaTime / 4;
		}
	}
}

function CharacterDeath()
{
	Application.LoadLevel("muerto");
}

function OnGUI()
{
	
	GUI.Box(new Rect(5, 30, 100, 23), "Vida");
	GUI.Box(new Rect(5, 55, 100, 23), "Sed");
	GUI.Box(new Rect(5, 80, 100, 23), "Hambre");
	
	
	GUI.Box(new Rect(120, 30, barLength, 20), currentHealth.ToString("0") + "/" + maxHealth);
	GUI.Box(new Rect(120, 55, barLength, 20), currentThirst.ToString("0") + "/" + maxThirst);
	GUI.Box(new Rect(120, 80, barLength, 20), currentHunger.ToString("0") + "/" + maxHunger);
	
}