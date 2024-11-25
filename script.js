// Crear o cargar el ranking desde localStorage
let rankingPlanes = JSON.parse(localStorage.getItem("rankingPlanes")) || [];

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
    const gif = esPositivo
        ? "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif" // Gif positivo
        : "https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif"; // Gif negativo

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

// Función para Modo Caos
function modoCaos() {
    alert("¡Modo Caos activado! Prepárate...");

    // Cambia el color de fondo aleatoriamente
    document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Cambia el color del texto aleatoriamente
    document.body.style.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Rota los botones aleatoriamente
    document.querySelectorAll("button").forEach(button => {
        button.style.transform = `rotate(${Math.random() * 360}deg)`;
        button.style.transition = "transform 0.5s ease";
    });

    // Generar GIFs aleatorios
    generarGIFsCaoticos(5); // Generar 5 GIFs
}

// Función para generar GIFs aleatorios
function generarGIFsCaoticos(cantidad) {
    const gifURLs = [
        "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
        "https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif",
        "https://media.giphy.com/media/3o6ZsYm5P38NvqOfsY/giphy.gif",
        "https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif",
        "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
    ];

    for (let i = 0; i < cantidad; i++) {
        const gif = document.createElement('img');
        gif.src = gifURLs[Math.floor(Math.random() * gifURLs.length)];
        gif.style.position = 'absolute';
        gif.style.left = `${Math.random() * 100}vw`;
        gif.style.top = `${Math.random() * 100}vh`;
        gif.style.width = `${Math.random() * 150 + 50}px`; // Tamaño aleatorio entre 50px y 200px
        gif.style.animation = `spin ${Math.random() * 2 + 1}s infinite linear`; // Animación de giro
        document.body.appendChild(gif);

        // Remover el GIF después de unos segundos
        setTimeout(() => gif.remove(), 5000);
    }
}

// Animación de giro para los GIFs
const estiloAnimacion = document.createElement('style');
estiloAnimacion.innerHTML = `
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
`;
document.head.appendChild(estiloAnimacion);

// Función para mostrar el ranking global
function mostrarRankingGlobal() {
    const rankingPlanes = JSON.parse(localStorage.getItem("rankingPlanes")) || {};

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
