// Variables globales para el uso del tablero del juego

var tablero;
var puntaje = 0;
var filas = 5;
var columnas = 4;

window.onload = function() {
    iniciarJuego();
}

function iniciarJuego() {

    // tabla = [
    //     [0, 0, 0, 0 ],
    //     [2, 2, 2, 0],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

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

    // Coloca dos números "2" al azar en el tablero para comenzar la partida
    setTwo();
    setTwo();
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
    else if (e.code == "ArrowUp") {
        deslizarArriba();

    }
    else if (e.code == "ArrowDown") {
        deslizarAbajo();
    }
    document.getElementById("puntaje").innerText = puntaje;
})

function deslizarIzquierda() {
    // Implementa la lógica para deslizar los bloques hacia la izquierda
    // Actualiza el tablero y puntaje según sea necesario
}

function deslizarDerecha() {
    // Implementa la lógica para deslizar los bloques hacia la derecha
    // Actualiza el tablero y puntaje según sea necesario
}

function deslizarArriba() {
    // Implementa la lógica para deslizar los bloques hacia arriba
    // Actualiza el tablero y puntaje según sea necesario
}

function deslizarAbajo() {
    // Implementa la lógica para deslizar los bloques hacia abajo
    // Actualiza el tablero y puntaje según sea necesario
}

function setTwo() {
    if (!hasEmptyTileInFirstRow()) {
        return;
    }

    let found = false;
    while (!found) {
        // Columna aleatoria en la primera fila
        let c = Math.floor(Math.random() * columnas);

        if (tablero[0][c] == 0) {
            // Decide si colocar un 2 o un 4 (con una probabilidad de 50% para cada uno)
            let nuevoNumero = Math.random() < 0.5 ? 2 : 4;

            tablero[0][c] = nuevoNumero;
            let bloque = document.getElementById("0-" + c.toString());
            bloque.innerText = nuevoNumero.toString();
            bloque.classList.add("x" + nuevoNumero.toString());
            found = true;
        }
    }
}

function hasEmptyTileInFirstRow() {
    for (let c = 0; c < columnas; c++) {
        if (tablero[0][c] === 0) {
            return true;
        }
    }
    return false;
}

// Agrega un registro de consola para verificar el estado del tablero después de cada llamada a setTwo
console.log(tablero);

