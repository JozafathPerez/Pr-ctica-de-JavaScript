// Variables globales para el uso del tablero del juego

var tablero;
var puntaje = 0;
var filas = 5;
var columnas = 4;
var numeroRandom;
var posicionBloque = { fila: 0, columna: 0 };
let intervaloGravedad;

//Variables de menu de pausa
let pausaMenu = false;
let sumaPiezas = 0;
let numeroMovientos = 0;
let tiempoInicio;
let tiempoFin;
let flagJuego = true;



window.onload = function() {
    iniciarJuego();
}

function iniciarJuego() {

    tablero = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // Crea visualmente las celdas del tablero usando bucles anidados
    for (let r = 0; r < filas; r++) {
        for (let c = 0; c < columnas; c++) {

            // Crea un elemento div representando cada celda del tablero
            let bloque = document.createElement("div");
            
            // Asigna un id único a cada celda basado en su posición en la matriz
            bloque.id = r.toString() + "-" + c.toString();
            
            // Obtiene el número en la celda actual y actualiza visualmente la celda
            let numero = tablero[r][c];
            actualizarBloque(bloque, numero);
            
            // Agrega la celda al documento HTML
            document.getElementById("tablero").append(bloque);
        }
    }
    generarBloque();
    //Setea la hora de inicio
    tiempoInicio = new Date();
    intervaloGravedad = setInterval(gravedad, 1000);
    intervaloGravedadTablero = setInterval(gravedadTablero,500)
    document.getElementById('btnAbrirMenu').addEventListener('click', pausarJuego);
    document.getElementById('btnReiniciar').addEventListener('click',reiniciarJuego);
}

function pausarJuego() {
    //Reanudar el juego y quitar el resumen
    if (pausaMenu ){
        intervaloGravedad = setInterval(gravedad,1000)
        console.log('Intervalo de gravedad accionado.');
        pausaMenu = false;
        //Quitar el menu
        document.getElementById('menuDesplegable').style.display = 'none';
    }
    //Pausar el juego y mostrar resumen
    else if (flagJuego){
        clearInterval(intervaloGravedad);
        console.log('Intervalo de gravedad detenido.');
        // //Actualizar subtitulo
        let subtitulo = document.getElementById("subtitulo");
        subtitulo.textContent = "Resumen";
        pausaMenu = true;
        //Calcular la hora
        tiempoFin = new Date;
        // Calcula la diferencia en tiempo
        let tiempoTranscurrido = tiempoFin.getTime() - tiempoInicio.getTime();
        // Calcula minutos y segundos
        let minutos = Math.floor(tiempoTranscurrido / 60000); // 1 minuto = 60,000 milisegundos
        let segundos = Math.floor((tiempoTranscurrido % 60000) / 1000); // 1 segundo = 1000 milisegundos
        //Desplegar resumen
        desplegarResumen(minutos, segundos)
        //Ocultar boton
        let botonReinicio = document.getElementById("botonReinicio");
        botonReinicio.style.display = "none";
        
    }
}

function desplegarResumen(pMinutos,pSegundos) {
    //Actualizar datos
    document.getElementById('menuDesplegable').style.display = 'flex';
    let textoTiempo = document.getElementById("tiempo");
    textoTiempo.innerText = `Tiempo: ${pMinutos}:${pSegundos}`;
    let textoPiezas = document.getElementById("totales");
    textoPiezas.innerText = "Suma de Piezas: " + sumarBloques().toString();
    let textoMovimientos = document.getElementById("movimientos");
    textoMovimientos.innerText = "Movientos:  " + numeroMovientos.toString();
}

function verificarVictoria() {
    for (let r = 0; r < filas; r++) {
        for (let c = 0; c < columnas; c++) {
            if(tablero[r][c] == 16) {
                flagJuego = false;
                clearInterval(intervaloGravedad);
                //Actualizar subtitulo
                let subtitulo = document.getElementById("subtitulo");
                subtitulo.textContent= "You Win!";
                //Calcular la hora
                tiempoFin = new Date;
                // Calcula la diferencia en tiempo
                let tiempoTranscurrido = tiempoFin.getTime() - tiempoInicio.getTime();
                // Calcula minutos y segundos
                let minutos = Math.floor(tiempoTranscurrido / 60000); // 1 minuto = 60,000 milisegundos
                let segundos = Math.floor((tiempoTranscurrido % 60000) / 1000); // 1 segundo = 1000 milisegundos
                // Despliega el resumen
                desplegarResumen(minutos, segundos);
                // Inserta Boton de reinicio
                let botonReinicio = document.getElementById("botonReinicio");
                botonReinicio.textContent = 'Jugar de Nuevo';
                botonReinicio.style.display = "flex";
                botonReinicio.addEventListener('click', reiniciarJuego);
            }
        }
    }
}

function mostrarGameOVer() {
    //Parar el intervalo
    flagJuego = false;
    clearInterval(intervaloGravedad);
    let subtitulo = document.getElementById("subtitulo");
    subtitulo.textContent= "Game Over!";
    //Calcular la hora
    tiempoFin = new Date;
    // Calcula la diferencia en tiempo
    let tiempoTranscurrido = tiempoFin.getTime() - tiempoInicio.getTime();
    // Calcula minutos y segundos
    let minutos = Math.floor(tiempoTranscurrido / 60000); // 1 minuto = 60,000 milisegundos
    let segundos = Math.floor((tiempoTranscurrido % 60000) / 1000); // 1 segundo = 1000 milisegundos
    // Despliega el resumen
    desplegarResumen(minutos, segundos);
    // Inserta Boton de reinicio
    let botonReinicio = document.getElementById("botonReinicio");
    botonReinicio.textContent = 'Jugar de Nuevo';
    botonReinicio.style.display = "flex";
    botonReinicio.addEventListener('click', reiniciarJuego);
}

function reiniciarJuego() {
    //Restablecer variables
    tablero = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    flagJuego =  true;
    sumaPiezas = 0;
    numeroMovientos = 0;
    tiempoInicio = new Date;
    //Quitar el menu
    document.getElementById('menuDesplegable').style.display = 'none';
    //Iniciar el intervalo
    intervaloGravedad = setInterval(gravedad,1000)
}

function sumarBloques() {
    sumaPiezas = 0;
    for (let r = 0; r < filas; r++) {
        for (let c = 0; c < columnas; c++) {
            sumaPiezas += tablero[r][c]
        }
    }
    return sumaPiezas;
}

function generarBloque() {
    if (!encabezadoVacio()) {
        return;
    }

    // Genera un bloque en la primera fila
    numeroRandom = Math.random() < 0.5 ? 2 : 4;
    let c = Math.floor(Math.random() * columnas);
    tablero[0][c] =  numeroRandom; // o 4 según tu lógica
    posicionBloque = { fila: 0, columna: c };

    actualizarTablero();
    let bloque = document.getElementById("0-" + c.toString());
    aplicarAnimacion(bloque);
}

function aplicarAnimacion(bloque) {
    // Agrega temporalmente la clase de animación
    bloque.classList.add("pop-animation");

    // Espera un breve momento y luego quita la clase de animación
    setTimeout(() => {
        bloque.classList.remove("pop-animation");
    }, 200);
}


function encabezadoVacio() {
    for (let c = 0; c < columnas; c++) {
        if (tablero[0][c] === 0) {
            return true;
        }
    }
    return false;
}


function actualizarTablero() {
    // Actualiza visualmente el tablero según la matriz actualizada
    for (let r = 0; r < filas; r++) {
        for (let c = 0; c < columnas; c++) {
            let bloque = document.getElementById(r.toString() + "-" + c.toString());
            let numero = tablero[r][c];
            actualizarBloque(bloque, numero);
        }
    }
}


function gravedad() {
    let tiempoEspera = 500; // 1 segundos en milisegundos

    // Guardar la posición inicial antes de intentar mover
    let filaInicial = posicionBloque.fila;
    let columnaInicial = posicionBloque.columna;

    // Intentar bajar el bloque
    if (posicionBloque.fila < filas - 1) {
        let proximaFila = posicionBloque.fila + 1;

        if (tablero[proximaFila][posicionBloque.columna] === 0) {
            // Caso 1: La próxima casilla (fila) está vacía, baja el bloque
            tablero[proximaFila][posicionBloque.columna] = tablero[posicionBloque.fila][posicionBloque.columna];
            tablero[posicionBloque.fila][posicionBloque.columna] = 0;
            posicionBloque.fila = proximaFila;
        } else if (tablero[proximaFila][posicionBloque.columna] === tablero[posicionBloque.fila][posicionBloque.columna]) {
            // Caso 2: La próxima casilla (fila) tiene el mismo número, suma los bloques
            tablero[proximaFila][posicionBloque.columna] *= 2;
            tablero[posicionBloque.fila][posicionBloque.columna] = 0;
            posicionBloque.fila = proximaFila;
        }
    }

    // Verificar si el bloque cambió de posición después de 2 segundos
    setTimeout(() => {
        if (posicionBloque.fila == 0){
            mostrarGameOVer();
        }
        if (posicionBloque.fila === filaInicial && posicionBloque.columna === columnaInicial) {
            // Si el bloque no cambió de posición, generar un número aleatorio
            generarBloque();
        }
    }, tiempoEspera);

    //VerificarVictoria
    verificarVictoria()

    // Actualizar visualmente el tablero
    actualizarTablero();
}



function gravedadTablero() {
    // Recorrer el tablero
    for (let r = 0; r < filas - 1; r++) {
        for (let c = 0; c < columnas; c++) {
            if (r !== posicionBloque.fila || c !== posicionBloque.columna) {
                // Validar si hay un 0 debajo del tablero y no estamos en la última fila
                if (tablero[r + 1] && tablero[r + 1][c] === 0) {
                    tablero[r + 1][c] = tablero[r][c];
                    tablero[r][c] = 0;
                    actualizarTablero();
                } else if (tablero[r][c] === tablero[r + 1][c]) {
                    // Validar si los elementos se pueden sumar y si el bloque debajo no es 0
                    if (tablero[r][c] !== 0) {
                        tablero[r + 1][c] = tablero[r][c] * 2;
                        tablero[r][c] = 0;

                        // Actualizar visualmente el tablero después de la suma
                        actualizarTablero();
                    }
                }
            }
        }
    }
}



function actualizarBloque(bloque, numero) {
    // Limpia el contenido de texto y la lista de clases del bloque
    bloque.innerText = "";
    bloque.classList.value = ""; // Limpia la lista de clases
    
    // Agrega la clase base "bloque" al bloque
    bloque.classList.add("bloque");
    
    // Verifica si el número es mayor que cero (si la celda no está vacía)
    if (numero > 0) {
        // Establece el texto del bloque con el número
        bloque.innerText = numero.toString();
        
        // Asigna clases adicionales basadas en el valor del número
        if (numero <= 4096) {
            // Para números menores o iguales a 4096, agrega una clase específica basada en el número
            bloque.classList.add("x" + numero.toString());
        } else {
            // Para números mayores a 4096, agrega una clase específica para "8192" (valor máximo)
            bloque.classList.add("x8192");
        }                
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        deslizarIzquierda();
    }
    else if (e.code == "ArrowRight") {
        deslizarDerecha();
    }
    else if (e.code == "ArrowDown") {
        deslizarAbajo();
    }
})

function deslizarIzquierda() {
    if (posicionBloque.columna > 0) {
        let columnaAnterior = posicionBloque.columna - 1;

        if (tablero[posicionBloque.fila][columnaAnterior] === 0) {
            // Caso 1: La próxima casilla (columna) está vacía, mueve el bloque
            tablero[posicionBloque.fila][columnaAnterior] = tablero[posicionBloque.fila][posicionBloque.columna];
            tablero[posicionBloque.fila][posicionBloque.columna] = 0;
            posicionBloque.columna = columnaAnterior;
            // Sumar variable movimientos
            numeroMovientos++;
        } else if (tablero[posicionBloque.fila][columnaAnterior] === tablero[posicionBloque.fila][posicionBloque.columna]) {
            // Caso 2: La próxima casilla (columna) tiene el mismo número, suma los bloques
            tablero[posicionBloque.fila][columnaAnterior] *= 2;
            tablero[posicionBloque.fila][posicionBloque.columna] = 0;
            posicionBloque.columna = columnaAnterior;
            // Sumar variable movimientos
            actualizarTablero();

            numeroMovientos++;
        }

        // Actualizamos visualmente el tablero
        actualizarTablero();
    }
}

function deslizarDerecha() {
    if (posicionBloque.columna < columnas - 1) {
        let columnaSiguiente = posicionBloque.columna + 1;

        if (tablero[posicionBloque.fila][columnaSiguiente] === 0) {
            // Caso 1: La próxima casilla (columna) está vacía, mueve el bloque
            tablero[posicionBloque.fila][columnaSiguiente] = tablero[posicionBloque.fila][posicionBloque.columna];
            tablero[posicionBloque.fila][posicionBloque.columna] = 0;
            posicionBloque.columna = columnaSiguiente;
            // Sumar variable movimientos
            numeroMovientos++;
        } else if (tablero[posicionBloque.fila][columnaSiguiente] === tablero[posicionBloque.fila][posicionBloque.columna]) {
            // Caso 2: La próxima casilla (columna) tiene el mismo número, suma los bloques
            tablero[posicionBloque.fila][columnaSiguiente] *= 2;
            tablero[posicionBloque.fila][posicionBloque.columna] = 0;
            posicionBloque.columna = columnaSiguiente;
            // Sumar variable movimientos
            numeroMovientos++;
        }

        // Actualizamos visualmente el tablero
        actualizarTablero();
    }
}


function deslizarAbajo() {
    if (posicionBloque.fila < filas - 1) {
        // Si no estamos en la última fila
        let proximaFila = posicionBloque.fila + 1;

        if (tablero[proximaFila][posicionBloque.columna] === 0) {
            // Caso 1: La próxima casilla (fila) está vacía, baja el bloque
            tablero[proximaFila][posicionBloque.columna] = tablero[posicionBloque.fila][posicionBloque.columna];
            tablero[posicionBloque.fila][posicionBloque.columna] = 0;
            posicionBloque.fila = proximaFila;
            // Sumar variable movimientos
            numeroMovientos++;
        } else if (tablero[proximaFila][posicionBloque.columna] === tablero[posicionBloque.fila][posicionBloque.columna]) {
            // Caso 2: La próxima casilla (fila) tiene el mismo número, suma los bloques
            tablero[proximaFila][posicionBloque.columna] *= 2;
            tablero[posicionBloque.fila][posicionBloque.columna] = 0;
            posicionBloque.fila = proximaFila;
            // Sumar variable movimientos
            numeroMovientos++;
        }

        // Actualizamos visualmente el tablero
        actualizarTablero();
    }
}


function verificarAdyacenteAbajo() {
    // Verifica si los bloques adyacentes abajo son iguales
    return tablero[posicionBloque.fila][posicionBloque.columna] === tablero[posicionBloque.fila + 1][posicionBloque.columna];
}

