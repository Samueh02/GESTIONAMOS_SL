// Inicializar rankingPlanes
let rankingPlanes = JSON.parse(localStorage.getItem("rankingPlanes")) || {};

// Mostrar el ranking al cargar la página
window.onload = function () {
    mostrarRankingGlobal();
};

// Gestionar planes
function gestionar() {
    const nombre = document.getElementById("nombre").value.trim() || "Amigo";
    const plan = document.getElementById("plan").value.trim().toLowerCase();

    if (!plan) {
        document.getElementById("resultado").innerText = "Por favor, escribe un plan primero.";
        return;
    }

    // Guardar el plan en el ranking
    rankingPlanes[plan] = (rankingPlanes[plan] || 0) + 1;
    localStorage.setItem("rankingPlanes", JSON.stringify(rankingPlanes));

    console.log("Plan guardado:", plan);
    console.log("Ranking actualizado:", rankingPlanes);

    // Respuesta aleatoria
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

// Extraer palabras clave y contarlas
function procesarPalabras() {
    const rankingPlanes = JSON.parse(localStorage.getItem("rankingPlanes")) || {};
    const palabrasRelevantes = {};
    const palabrasIrrelevantes = ["el", "la", "y", "de", "en", "a", "con", "que", "por", "al"]; // Ignorar

    Object.keys(rankingPlanes).forEach(plan => {
        const palabras = plan.split(/\s+/);
        palabras.forEach(palabra => {
            const palabraLimpia = palabra.toLowerCase().replace(/[^a-záéíóúñ]/g, "");
            if (!palabrasIrrelevantes.includes(palabraLimpia) && palabraLimpia) {
                palabrasRelevantes[palabraLimpia] = (palabrasRelevantes[palabraLimpia] || 0) + rankingPlanes[plan];
            }
        });
    });

    return palabrasRelevantes;
}

// Mostrar ranking de palabras relevantes
function mostrarRankingGlobal() {
    const palabrasRelevantes = procesarPalabras();
    const rankingOrdenado = Object.entries(palabrasRelevantes).sort((a, b) => b[1] - a[1]);

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h3>Palabras más relevantes:</h3>";

    if (rankingOrdenado.length === 0) {
        resultado.innerHTML += "<p>No se han introducido planes todavía.</p>";
    } else {
        rankingOrdenado.forEach(([palabra, count], index) => {
            resultado.innerHTML += `<p>${index + 1}. ${palabra} - ${count} veces</p>`;
        });
    }
}

// Mostrar un GIF según la respuesta
function mostrarGif(esPositivo) {
    const gifContainer = document.getElementById("gif");

    const gifsPositivos = [
        "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
        "https://media.giphy.com/media/3o7TKP9lnsgKIMYgfu/giphy.gif"
    ];

    const gifsNegativos = [
        "https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif",
        "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
    ];

    const gif = esPositivo
        ? gifsPositivos[Math.floor(Math.random() * gifsPositivos.length)]
        : gifsNegativos[Math.floor(Math.random() * gifsNegativos.length)];

    gifContainer.innerHTML = `<img src="${gif}" alt="Resultado">`;
}
