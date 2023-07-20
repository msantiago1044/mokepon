let ataqueJugador = ""
let ataqueDelRival = ""
let triunfos = 0
let derrotas = 0
let empates = 0
let vidaTuya = 3
let vidaMaquina = 3
let mokepones = []
let opcionDeMokepones
let opcionDeAtaques

let ocultarSecciones = document.getElementById("seccion-batalla")
let botonMascota = document.getElementById("mascota")
let botonReinicio = document.getElementById("reinicio")
let mascotaSeleccionadaJudador = document.getElementById("mascota-seleccionada")
let mascotaSeleccionadaRival = document.getElementById("mascota-rival")
let ocultarSeccionesI = document.getElementById("selection-mascota")
let resultadoBatalla = document.getElementById("resultado-batalla")    
let ataqueDelJugador = document.getElementById("ataque-jugador")
let ataqueDelPc = document.getElementById("ataque-pc")
let miVida = document.getElementById("tu-vida")
let suVida = document.getElementById("su-vida") 
let botonFuego = ""
let botonAgua = ""
let botonViento = ""
let inputHidropone = ""
let inputRatagueya = ""
let inputCimiodonte = "" 
let mascotaJugador = "" 
let botones = []
let ataquesJugador

class Mokepones {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let Hidropone = new Mokepones("Hidropone","./resources/mokepons_mokepon_hipodoge_attack.webp",5)
let Ratagueya = new Mokepones("Ratagueya","./resources/mokepons_mokepon_ratigueya_attack.webp",5)
let Cimiodonte = new Mokepones("Cimiodonte","./resources/mokepons_mokepon_capipepo_attack.png",5)

Hidropone.ataques.push(
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Viento🌪️",id:"ataque-viento"}
)
Ratagueya.ataques.push(
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Viento🌪️",id:"ataque-viento"}
)
Cimiodonte.ataques.push(
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Viento🌪️",id:"ataque-viento"},
    {nombre: "Viento🌪️",id:"ataque-viento"},
    {nombre: "Viento🌪️",id:"ataque-viento"}
)
mokepones.push(Hidropone, Ratagueya, Cimiodonte)

function iniciarJuego() {    
    ocultarSecciones.style.display = "none"  
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre}>              
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>`
        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputHidropone = document.getElementById("Hidropone")
        inputRatagueya = document.getElementById("Ratagueya")
        inputCimiodonte = document.getElementById("Cimiodonte") 
    })    
    botonMascota.addEventListener("click", seleccionMascotaJugador)
    botonReinicio.addEventListener("click", reinicio)
}
function seleccionMascotaJugador() { 
    if (inputHidropone.checked) {
        mascotaSeleccionadaJudador.innerHTML = inputHidropone.id
        mascotaJugador = inputHidropone.id
    } else if (inputRatagueya.checked) {
        mascotaSeleccionadaJudador.innerHTML = inputRatagueya.id
        mascotaJugador = inputRatagueya.id
    } else if (inputCimiodonte.checked) {
        mascotaSeleccionadaJudador.innerHTML = inputCimiodonte.id
        mascotaJugador = inputCimiodonte.id
    } else {
        alert("seleccion no valida")
        reinicio()
    }
    extraerAtaques(mascotaJugador)
    seleccionMascotaRival()
}
function ranNumero(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
} 
function seleccionMascotaRival() {
    pc = ranNumero(0,mokepones.length-1)
    mascotaSeleccionadaRival.innerHTML = mokepones[pc].nombre
    ocultarSecciones.style.display = "flex"
    ocultarSeccionesI.style.display = "none"
}
function extraerAtaques(mascotaJugador) {
    let ataques = []
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
        
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        opcionDeAtaques = `<button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>`
        contenedorTarjetasAtaques.innerHTML += opcionDeAtaques
        botonFuego = document.getElementById("ataque-fuego")
        botonAgua = document.getElementById("ataque-agua")
        botonViento = document.getElementById("ataque-viento")
    })  
    botones = document.querySelectorAll(".BAtaque")    
    botonFuego.addEventListener("click", ataqueFuego)    
    botonAgua.addEventListener("click", ataqueAgua)    
    botonViento.addEventListener("click", ataqueViento)     
}
function secuenciaAtaques() {
    botones.forEach((boton) =>{
        boton.addEventListener("click", (e) => { 
            if (e.target.textContent == "Fuego🔥") {
                ataquesJugador.push("Fuego🔥")
                boton.style.background = '#112f58' 
            } else if (e.target.textContent == "Agua💧"){
                ataquesJugador.push("Agua💧")
                boton.style.background = '#112f58'
            } else {
                ataquesJugador.push("Viento🌪️")
                boton.style.background = '#112f58'
            }
        })
    })
}
function ataqueFuego() {
    ataqueJugador = "FUEGO"
    ataqueRival()
}
function ataqueAgua() {
    ataqueJugador = "AGUA"
    ataqueRival()
}
function ataqueViento() {
    ataqueJugador = "VIENTO"
    ataqueRival()
}
function ataqueRival() {
    pc = ranNumero(1,3)
    if (pc == 1) {
        ataqueDelRival = "FUEGO"
    } else if (pc == 2) {
        ataqueDelRival = "AGUA"
    } else {
        ataqueDelRival = "VIENTO"
    } 
   addElemento()    
}
function addElemento() {
    resultado = textBatalla(ataqueJugador, ataqueDelRival)   
    let newAtaqueDelJugador = document.createElement("p")    
    let newAtaqueDelPc = document.createElement("p")
    resultadoBatalla.innerHTML = resultado
    newAtaqueDelJugador.innerHTML = "Atacaste con "+ ataqueJugador
    newAtaqueDelPc.innerHTML = "Tu oponente ataco con "+ ataqueDelRival
    ataqueDelJugador.appendChild(newAtaqueDelJugador)
    ataqueDelPc.appendChild(newAtaqueDelPc)
    updateVida()
    revisarVida()
}
function textBatalla(atak1, atak2){
    if (atak1 == atak2){empates ++; return(" EMPATARON")}
    else if (atak1 == "FUEGO" && atak2 == "VIENTO"){triunfos++; return(" VICTORIA para el JUGADOR")}
    else if (atak1 == "AGUA" && atak2 == "FUEGO"){triunfos++; return(" VICTORIA para el JUGADOR")}
    else if (atak1 == "VIENTO" && atak2 == "AGUA"){triunfos++; return(" VICTORIA para el JUGADOR")}
    else {derrotas ++; return(" VICTORIA para la MAQUINA")}
}
function updateVida() {
    miVida.innerHTML = vidaTuya - derrotas
    suVida.innerHTML = vidaMaquina - triunfos
}
function revisarVida() {
    if (triunfos > 3) {
        alert("GANAMOS")
        reinicio()
    } else if (derrotas > 3){
        alert("PERDIMOS")
        reinicio()
    }
}
function reinicio() {
    location.reload()
}
window.addEventListener("load", iniciarJuego)