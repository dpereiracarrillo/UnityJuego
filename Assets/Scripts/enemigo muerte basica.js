var choke : Transform;
function OnTriggerEnter(other : Collider){
if (other.tag == "bala"){
var clone : Transform;
clone = Instantiate(choke, transform.position, transform.rotation);
Destroy(gameObject);
	}
}