// Crear o cargar el ranking desde localStorage
let rankingPlanes = JSON.parse(localStorage.getItem("rankingPlanes")) || {};

// Función principal para gestionar el plan
function gestionar() {
    const nombre = document.getElementById("nombre").value.trim() || "Amigo";
    const plan = document.getElementById("plan").value.trim().toLowerCase(); // Minúsculas para evitar duplicados

    if (!plan) {
        document.getElementById("resultado").innerText = "Por favor, escribe un plan primero.";
        return;
    }

    // Guardar el plan en el ranking
    rankingPlanes[plan] = (rankingPlanes[plan] || 0) + 1; // Incrementa el contador del plan
    localStorage.setItem("rankingPlanes", JSON.stringify(rankingPlanes)); // Guardar en localStorage

    console.log("Plan guardado:", plan); // Verificar qué plan se guarda
    console.log("Ranking actualizado:", rankingPlanes); // Mostrar el objeto actualizado en la consola

    // Respuesta aleatoria (positivo o negativo)
    const positivos = [
        "¡Claro que sí, ya lo gestioné!",
        "Por supuesto, no hay mejor plan.",
        "¡Gestionado con éxito, vamos allá!"
    ];
    const negativos = [
        "No puedo, estoy ocupado resolviendo un Sudoku.",
        "No es posible, mi perro necesita clases de meditación.",
        "Imposible, tengo que buscar la décima temporada de mi serie favorita."
    ];

    const esPositivo = Math.random() > 0.5;
    const respuesta = esPositivo
        ? `${nombre}, ${positivos[Math.floor(Math.random() * positivos.length)]}`
        : `${nombre}, ${negativos[Math.floor(Math.random() * negativos.length)]}`;

    document.getElementById("resultado").innerText = `"${plan}" → ${respuesta}`;
    mostrarGif(esPositivo);
}


// Función para mostrar un GIF según la respuesta (positiva o negativa)
function mostrarGif(esPositivo) {
    const gifContainer = document.getElementById("gif");

    const gifsPositivos = [
        "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
        "https://media.giphy.com/media/3o7TKP9lnsgKIMYgfu/giphy.gif",
        "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
        "https://media.giphy.com/media/26FPCXdkvDbKBbgOI/giphy.gif"
    ];

    const gifsNegativos = [
        "https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif",
        "https://media.giphy.com/media/3orieRJQ5nVSTkB5cA/giphy.gif",
        "https://media.giphy.com/media/3oEdv3Ul4ZOOzwFU4k/giphy.gif",
        "https://media.giphy.com/media/5xtDarlqG5kb5SLipra/giphy.gif"
    ];

    const gif = esPositivo
        ? gifsPositivos[Math.floor(Math.random() * gifsPositivos.length)]
        : gifsNegativos[Math.floor(Math.random() * gifsNegativos.length)];

    gifContainer.innerHTML = `<img src="${gif}" alt="Resultado">`;
}

// Función para Excusa Extrema
function excusaExtrema() {
    const excusasExtremas = [
        "No puedo, mi tortuga se unió a una banda de moteros.",
        "Estoy ocupado vigilando que los árboles no se muevan.",
        "No puedo, mi secadora se comió mis calcetines y estoy en duelo."
    ];
    const excusa = excusasExtremas[Math.floor(Math.random() * excusasExtremas.length)];
    document.getElementById("resultado").innerText = excusa;
}

// Función para mostrar el ranking global
function mostrarRankingGlobal() {
    const rankingPlanes = JSON.parse(localStorage.getItem("rankingPlanes")) || {};
    console.log("Ranking leído de localStorage:", rankingPlanes); // Verificar qué datos se leen

    // Convertir el objeto en un array para ordenarlo
    const rankingOrdenado = Object.entries(rankingPlanes).sort((a, b) => b[1] - a[1]);

    // Mostrar el ranking
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h3>Ranking de planes más preguntados:</h3>";

    if (rankingOrdenado.length === 0) {
        resultado.innerHTML += "<p>No se han introducido planes todavía.</p>";
    } else {
        rankingOrdenado.forEach(([plan, count], index) => {
            resultado.innerHTML += `<p>${index + 1}. ${plan} - ${count} veces</p>`;
        });
    }
}


// Función para borrar el ranking
function borrarRanking() {
    localStorage.removeItem("rankingPlanes");
    alert("El ranking ha sido eliminado.");
    document.getElementById("resultado").innerText = "";
}
