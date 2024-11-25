function modoCaos() {
    alert("¡Modo Caos activado! Prepárate...");

    // Cambia el color de fondo aleatoriamente
    document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Cambia el color de texto aleatoriamente
    document.body.style.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Rota los botones aleatoriamente
    document.querySelectorAll("button").forEach(button => {
        button.style.transform = `rotate(${Math.random() * 360}deg)`;
        button.style.transition = "transform 0.5s ease";
    });

    // Genera GIFs aleatorios
    generarGIFsCaoticos(5); // Generar 5 GIFs
}

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

// Animación de giro
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
