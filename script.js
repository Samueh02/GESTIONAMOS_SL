// Inicializar rankingPlanes solo una vez
let rankingPlanes = JSON.parse(localStorage.getItem("rankingPlanes")) || {};
if (!rankingPlanes || Array.isArray(rankingPlanes)) {
    rankingPlanes = {}; // Corrige si era un array
    localStorage.setItem("rankingPlanes", JSON.stringify(rankingPlanes));
}
console.log("Ranking inicial:", rankingPlanes); // Depuración

function gestionar() {
    const nombre = document.getElementById("nombre").value.trim() || "Amigo";
    const plan = document.getElementById("plan").value.trim().toLowerCase();

    if (!plan) {
        document.getElementById("resultado").innerText = "Por favor, escribe un plan primero.";
        return;
    }

    // Actualizar el ranking
    rankingPlanes[plan] = (rankingPlanes[plan] || 0) + 1;
    localStorage.setItem("rankingPlanes", JSON.stringify(rankingPlanes));
    console.log("Ranking actualizado:", rankingPlanes);

    // Respuesta
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
        "https://media.giphy.com/media/26FPCXdkvDbKBbgOI/giphy.gif",
        "https://media.giphy.com/media/3orieRJQ5nVSTkB5cA/giphy.gif",
        "https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif",
        "https://media.giphy.com/media/3ohs4yz8VXr3XZQ4kE/giphy.gif"
    ];

    const gifsNegativos = [
        "https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif",
        "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
        "https://media.giphy.com/media/3oriO7A7bt1wsEP4cw/giphy.gif",
        "https://media.giphy.com/media/3o7aD4ZQ3t6tTcDlWM/giphy.gif",
        "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
        "https://media.giphy.com/media/26FPCXdkvDbKBbgOI/giphy.gif",
        "https://media.giphy.com/media/l2Je9dD8A4wFFkiLK/giphy.gif"
    ];

    const gif = esPositivo
        ? gifsPositivos[Math.floor(Math.random() * gifsPositivos.length)]
        : gifsNegativos[Math.floor(Math.random() * gifsNegativos.length)];

    gifContainer.innerHTML = `<img src="${gif}" alt="Resultado">`;
}


// Función para Excusa Extrema
function excusaExtrema() {
    const excusasExtremas = [
        "No puedo, estoy ocupado organizando una reunión para mis calcetines perdidos.",
        "Imposible, tengo que enseñar a mi gato a programar en JavaScript.",
        "No puedo, hoy es el aniversario de mi planta.",
        "Estoy atrapado en una maratón de memes y no puedo salir.",
        "Es imposible, tengo que meditar para decidir qué pizza pedir.",
        "No puedo, estoy esperando que Netflix me pregunte si sigo aquí.",
        "No, porque estoy entrenando para las Olimpiadas de procrastinación.",
        "Lo siento, tengo una cita con mi sillón para discutir temas importantes.",
        "Estoy ocupado resolviendo un misterio: ¿quién se comió mi chocolate?",
        "No puedo, estoy escribiendo mi autobiografía ficticia.",
        "Es imposible, estoy buscando el calcetín izquierdo del Triángulo de las Bermudas.",
        "No puedo, mi frigorífico y yo estamos reconciliándonos después de la última limpieza.",
        "Lo siento, estoy traduciendo canciones de reguetón al latín.",
        "Hoy no puedo, estoy dirigiendo un casting para mi próxima siesta.",
        "No puedo, tengo que practicar mis discursos para cuando me entreguen un premio ficticio."
    ];
    const excusa = excusasExtremas[Math.floor(Math.random() * excusasExtremas.length)];
    document.getElementById("resultado").innerText = excusa;
}


// Función para mostrar el ranking global
function mostrarRankingGlobal() {
    const rankingPlanes = JSON.parse(localStorage.getItem("rankingPlanes")) || {};
    console.log("Ranking leído de localStorage:", rankingPlanes); // Verificar qué datos se leen
    
    if (Array.isArray(rankingPlanes) || typeof rankingPlanes !== "object") {
    console.error("Error: rankingPlanes no es un objeto válido:", rankingPlanes);
    rankingPlanes = {};
    localStorage.setItem("rankingPlanes", JSON.stringify(rankingPlanes));
}

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
