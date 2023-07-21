let ataquesDelJugador = []
let ataquesDelRival = []
let triunfos = 0
let derrotas = 0
let empates = 0
let vidaJugador = 3
let vidaRival = 3
let mokepones = []
let resultado = ''
let opcionDeMokepones
let opcionDeAtaques

let ocultarSecciones = document.getElementById("seccion-batalla")
let botonSeleccionMascota = document.getElementById("mascota")
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
let mascotaRival = ""
let botones = []
let ataquesMokeponEnemigo = []
let ataquesMokeponJugador = []
let indexAtaqueEnemigo = ""
let indexAtaqueJugador = ""

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
    botonSeleccionMascota.addEventListener("click", seleccionMascotaJugador)
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
    mascotaRival = ranNumero(0,mokepones.length-1)
    mascotaSeleccionadaRival.innerHTML = mokepones[mascotaRival].nombre
    ataquesMokeponEnemigo = mokepones[mascotaRival].ataques
    ocultarSecciones.style.display = "flex"
    ocultarSeccionesI.style.display = "none"
    secuenciaAtaques()
}
function extraerAtaques(mascota) {
    let ataquesMokeponJugador = []
    for (let i = 0; i < mokepones.length; i++) {
        if (mascota == mokepones[i].nombre) {
            ataquesMokeponJugador = mokepones[i].ataques;
        }        
    }
    mostrarAtaques(ataquesMokeponJugador)
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
}
function secuenciaAtaques() {
    botones.forEach((boton) =>{
        boton.addEventListener("click", (e) => { 
            if (e.target.textContent == "Fuego🔥") {
                ataquesDelJugador.push("FUEGO")
                console.log(ataquesDelJugador)
                boton.style.background = '#112f58' 
                boton.disabled = true
            } else if (e.target.textContent == "Agua💧"){
                ataquesDelJugador.push("AGUA")
                console.log(ataquesDelJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataquesDelJugador.push("VIENTO")
                console.log(ataquesDelJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueRival()
        })
    })  
}
function ataqueRival() {
    aleatorio = ranNumero(0,ataquesMokeponEnemigo.length-1)
    tipoDeAtaqueEnemigo = ataquesMokeponEnemigo[aleatorio].nombre
    if (tipoDeAtaqueEnemigo == "Fuego🔥") {
        ataquesDelRival.push("FUEGO")
    } else if (tipoDeAtaqueEnemigo === "Agua💧") {
        ataquesDelRival.push("AGUA")
    } else {
        ataquesDelRival.push("VIENTO")
    } 
    console.log(ataquesDelRival)
    iniciarCombate()    
}
function iniciarCombate() {
    if (ataquesDelJugador.length === 5) {
        textBatalla()
    }
}
function textBatalla(){
    for (let i = 0; i < ataquesDelJugador.length; i++) {
        if (ataquesDelJugador[i] === ataquesDelRival[i]) {
            empates++
            indexAmbos(i, i)
            addElemento(triunfos, derrotas, false)
        } else if (ataquesDelJugador[i] === "FUEGO" && ataquesDelRival[i] === "VIENTO"){
            triunfos++
            indexAmbos(i, i)
            addElemento(triunfos, derrotas, false)
        } else if (ataquesDelJugador[i] === "AGUA" && ataquesDelRival[i] === "FUEGO"){
            triunfos++ 
            indexAmbos(i, i)
            addElemento(triunfos, derrotas, false)
        } else if (ataquesDelJugador[i] === "VIENTO" && ataquesDelRival[i] === "AGUA"){
            triunfos++           
            indexAmbos(i, i)
            addElemento(triunfos, derrotas, false)
        } else {
            derrotas++
            indexAmbos(i, i)
            addElemento(triunfos, derrotas, false)
        } updateVida(triunfos, derrotas)
    }resultadoBatalla.innerHTML = addElemento(triunfos, derrotas, true)
}
function indexAmbos(jugador, enemigo) {
    indexAtaqueJugador = ataquesDelJugador[jugador]
    indexAtaqueEnemigo = ataquesDelRival[enemigo]
}
function addElemento(triunfos, derrotas, bool) { 
    if (bool == false) {
        let newAtaqueDelJugador = document.createElement("p")    
    let newAtaqueDelRival = document.createElement("p")
    newAtaqueDelJugador.innerHTML = indexAtaqueJugador 
    newAtaqueDelRival.innerHTML = indexAtaqueEnemigo
    ataqueDelJugador.appendChild(newAtaqueDelJugador)
    ataqueDelPc.appendChild(newAtaqueDelRival)
    } else if (triunfos == derrotas) {
        return resultado = ("EMPATE")
    } else if (triunfos > derrotas){
        return resultado = ("VICTORIA")
    } else {
        return resultado = ("DERROTA")
    }   
}
function updateVida(triunfos, derrotas) {
    miVida.innerHTML = triunfos 
    suVida.innerHTML = derrotas
}
function reinicio() {
    location.reload()
}
window.addEventListener("load", iniciarJuego)