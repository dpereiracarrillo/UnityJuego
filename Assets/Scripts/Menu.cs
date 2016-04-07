using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Menu : MonoBehaviour {
	public bool isStart;
	public bool isQuit;

	void OnMouseUp(){
		if (isStart) {
			Application.LoadLevel ("intento");
		}
		if (isQuit) {
			Application.Quit ();
		}
	}
	} 