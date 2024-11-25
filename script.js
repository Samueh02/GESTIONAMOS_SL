//const positivoSound = new Audio('positivo.mp3'); // Sonido positivo
//const negativoSound = new Audio('negativo.mp3'); // Sonido negativo

function gestionar() {
    const nombre = document.getElementById("nombre").value.trim() || "Amigo";
    const plan = document.getElementById("plan").value.trim();

    if (!plan) {
        document.getElementById("resultado").innerText = "Por favor, escribe un plan primero.";
        return;
    }

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

    if (esPositivo) {
        //positivoSound.play();
        confetti();
    } else {
        //negativoSound.play();
    }

    document.getElementById("resultado").innerText = respuesta;
    mostrarGif(esPositivo);
}

function mostrarGif(esPositivo) {
    const gifContainer = document.getElementById("gif");
    const gif = esPositivo
        ? "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif" // Gif positivo
        : "https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif"; // Gif negativo

    gifContainer.innerHTML = `<img src="${gif}" alt="Resultado">`;
}

function excusaExtrema() {
    const excusasExtremas = [
        "No puedo, mi tortuga se unió a una banda de moteros.",
        "Estoy ocupado vigilando que los árboles no se muevan.",
        "No puedo, mi secadora se comió mis calcetines y estoy en duelo."
    ];
    const excusa = excusasExtremas[Math.floor(Math.random() * excusasExtremas.length)];
    document.getElementById("resultado").innerText = excusa;
}

function modoCaos() {
    alert("¡Modo Caos activado! Prepárate...");
    document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setTimeout(() => alert("¡Qué locura!"), 2000);
}
