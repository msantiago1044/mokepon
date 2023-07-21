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
let mascotaJugadorObjeto
let botones = []
let ataquesMokeponEnemigo
let ataquesMokeponJugador = []
let indexAtaqueEnemigo = ""
let indexAtaqueJugador = ""
let seccionVerMapa = document.getElementById("ver-mapa")
let mapa = document.getElementById("mapa")
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackGround = new Image()
mapaBackGround.src = "./resources/mokemap-ca51ea18-7ac8-492f-be96-6181d766a99d.webp"
let alturaBuscada
let anchoDelMapa = window.innerWidth - 20
const anchoMaximo = 650
if (anchoDelMapa > anchoMaximo) {
    anchoDelMapa = anchoMaximo - 20
}
alturaBuscada = (anchoDelMapa * 600) / 800
mapa.width = anchoDelMapa
mapa.height = alturaBuscada

class Mokepones {
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = ranNumero(0,mapa.width - this.ancho)
        this.y = ranNumero(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }    
}

let Hidropone = new Mokepones("Hidropone","./resources/mokepons_mokepon_hipodoge_attack.webp",5,"./resources/hipodoge.webp")
let Ratagueya = new Mokepones("Ratagueya","./resources/mokepons_mokepon_ratigueya_attack.webp",5,"./resources/ratigueya.webp")
let Cimiodonte = new Mokepones("Cimiodonte","./resources/mokepons_mokepon_capipepo_attack.png",5,"./resources/capipepo.webp")
let HidroponeEnemigo = new Mokepones("Hidropone","./resources/mokepons_mokepon_hipodoge_attack.webp",5,"./resources/hipodoge.webp")
let RatagueyaEnemigo = new Mokepones("Ratagueya","./resources/mokepons_mokepon_ratigueya_attack.webp",5,"./resources/ratigueya.webp")
let CimiodonteEnemigo = new Mokepones("Cimiodonte","./resources/mokepons_mokepon_capipepo_attack.png",5,"./resources/capipepo.webp")

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
HidroponeEnemigo.ataques.push(
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Viento🌪️",id:"ataque-viento"}
)
RatagueyaEnemigo.ataques.push(
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Viento🌪️",id:"ataque-viento"}
)
CimiodonteEnemigo.ataques.push(
    {nombre: "Fuego🔥", id:"ataque-fuego"},
    {nombre: "Agua💧", id:"ataque-agua"},
    {nombre: "Viento🌪️",id:"ataque-viento"},
    {nombre: "Viento🌪️",id:"ataque-viento"},
    {nombre: "Viento🌪️",id:"ataque-viento"}
)
mokepones.push(Hidropone, Ratagueya, Cimiodonte)

function iniciarJuego() {       
    ocultarSecciones.style.display = "none"  
    seccionVerMapa.style.display = "none"
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
        iniciarMapa()
    } else if (inputRatagueya.checked) {
        mascotaSeleccionadaJudador.innerHTML = inputRatagueya.id
        mascotaJugador = inputRatagueya.id
        iniciarMapa()
    } else if (inputCimiodonte.checked) {
        mascotaSeleccionadaJudador.innerHTML = inputCimiodonte.id
        mascotaJugador = inputCimiodonte.id
        iniciarMapa()
    } else {
        alert("seleccion no valida")
        reinicio()
    }
}
function reinicio() {
    location.reload()
}
function iniciarMapa() { 
    ocultarSeccionesI.style.display = "none"  
    seccionVerMapa.style.display = "flex" 
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)   
    representarCanva()
    intervalo = setInterval(representarCanva, 50)
    window.addEventListener("keydown", sePresionoTecla)
    window.addEventListener("keyup", detenerMovimiento)
}
function representarCanva() {  
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)  
    lienzo.drawImage(
        mapaBackGround,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    HidroponeEnemigo.pintarMokepon()
    RatagueyaEnemigo.pintarMokepon()
    CimiodonteEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !==0) {
        revisarColision(HidroponeEnemigo)
        revisarColision(RatagueyaEnemigo)
        revisarColision(CimiodonteEnemigo)
    }
}
function moverMokeponUp() {
    mascotaJugadorObjeto.velocidadY = -5
}
function moverMokeponDown() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverMokeponRight() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverMokeponLeft() {
    mascotaJugadorObjeto.velocidadX = - 5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePresionoTecla(e) {
    switch (e.key) {
        case "ArrowUp":
            moverMokeponUp()
            break;
        case "ArrowDown":
            moverMokeponDown()
            break;
        case "ArrowLeft":
            moverMokeponLeft()
            break;
        case "ArrowRight":
            moverMokeponRight()
            break;
        default:
            break;
    }
}
function obtenerObjetoMascota(mascota) {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascota == mokepones[i].nombre) {
            return mokepones[i]
        }        
    }
}
function revisarColision(enemigo) { 
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x  

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x  

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
    ) {
        return        
    }
    detenerMovimiento()
    clearInterval(intervalo)
    alert("Batalla de "+mascotaJugador+" vs "+enemigo.nombre)
    extraerAtaques(mascotaJugador)  
    mascotaRival = enemigo 
    seleccionMascotaRival()   

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
        botones = document.querySelectorAll(".BAtaque")
    }) 
}
function seleccionMascotaRival() {  
    mascotaSeleccionadaRival.innerHTML = mascotaRival.nombre
    ataquesMokeponEnemigo = mascotaRival.ataques 
    secuenciaAtaques()
    seccionVerMapa.style.display = "none"
    ocultarSecciones.style.display = "flex"  
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
function ranNumero(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
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
window.addEventListener("load", iniciarJuego)
