var Estado : int = 0;
var Target: GameObject; //El objetivo
private var RotInic : Quaternion;
var RotSpeed : float;
var VelMov : float;
var gravity : float = 9.8;
private var DistanciaCont : float;
var DistEnem : float = 0.5;
private var contador = 0.0;
//Animaciones
var IdleAnim : AnimationClip;
var RunAnim : AnimationClip;
var GuardAnim : AnimationClip;
var AttackAnim : AnimationClip;
var MuerteAnim : AnimationClip;
function Start ()
{
//wrapMode puede ser: Once, Loop, PingPong, Default o ClampForever
GetComponent.<Animation>()[IdleAnim.name].speed = 1;
GetComponent.<Animation>()[IdleAnim.name].wrapMode = WrapMode.Loop;
GetComponent.<Animation>()[RunAnim.name].speed = 1;
GetComponent.<Animation>()[RunAnim.name].wrapMode = WrapMode.Loop;
GetComponent.<Animation>()[GuardAnim.name].speed = 1;
GetComponent.<Animation>()[GuardAnim.name].wrapMode = WrapMode.Loop;
GetComponent.<Animation>()[AttackAnim.name].speed = 1;
GetComponent.<Animation>()[AttackAnim.name].wrapMode = WrapMode.Once;
GetComponent.<Animation>()[MuerteAnim.name].speed = 1;
GetComponent.<Animation>()[MuerteAnim.name].wrapMode = WrapMode.ClampForever;
RotInic = transform.rotation;
GetComponent.<Animation>().Play(IdleAnim.name);
if (Target == null)
{
Target = GameObject.FindGameObjectWithTag("Player");
}
}
function Update () 
{
var controller : CharacterController = GetComponent(CharacterController);
if (Estado == 0)
{
//Acción 
//Cambio de Estado y Activar siguiente animación.
//Se cambia mediante un disparador externo.
}
if (Estado == 1) //Perseguir
{
//Acción
//Girar y avanzar.
transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(Target.transform.position - transform.position), RotSpeed * Time.deltaTime);
transform.rotation.x = RotInic.x;
transform.rotation.z = RotInic.z; 
//Cambio de Estado y Activar siguiente animación.
controller.Move(transform.forward * VelMov * Time.deltaTime);
//Aplicar gravedad
controller.Move(transform.up * -gravity * Time.deltaTime);
//Cambio de Estado y Activar siguiente animación.
DistanciaCont = Vector3.Distance(Target.transform.position, transform.position);
if (DistanciaCont <= DistEnem)
{
Estado = 2;
GetComponent.<Animation>().CrossFade(GuardAnim.name);
}
}
if (Estado == 2) //Guardia
{
//Acción
//Cambio de Estado y Activar siguiente animación.
DistanciaCont = Vector3.Distance(Target.transform.position, transform.position);
if (DistanciaCont > DistEnem)
{
Estado = 1; //Pasa al estado de perseguir.
GetComponent.<Animation>().CrossFade(RunAnim.name);
}else{
Estado = 3;//Pasa al estado de Atacar.
contador = Time.time + (GetComponent.<Animation>()[AttackAnim.name].clip.length * 1.2);
//El tiempo actual + (el tiempo de la animación y un pelín más)
GetComponent.<Animation>().Play(AttackAnim.name); 
}
}
if (Estado == 3) // Atacar
{
//Acción
//Cambio de Estado y Activar siguiente animación.
if (Time.time > contador)
{
Estado = 2;
GetComponent.<Animation>().CrossFade(GuardAnim.name, 2.0f);
}
}
}
function Muerte ()
{
Estado =9;
GetComponent.<Animation>().Play (MuerteAnim.name);
}
function DoActivateTrigger ()
{
Estado = 1;
GetComponent.<Animation>().CrossFade(RunAnim.name);
}
function DoDesactivateTrigger ()
{
Estado = 0; //cambiar a al estado de Inactivo
GetComponent.<Animation>().Play(IdleAnim.name);
}