function gestionar() {
    const plan = document.getElementById("plan").value.trim();
    const positivos = [
        "¡Claro que sí, ya está gestionado!",
        "Por supuesto, no hay mejor plan.",
        "¡Gestionado con éxito, vamos allá!"
    ];
    const negativos = [
        "No puedo, estoy ocupado resolviendo un Sudoku.",
        "No es posible, mi perro necesita clases de meditación.",
        "Imposible, tengo que buscar la décima temporada de mi serie favorita."
    ];

    if (!plan) {
        document.getElementById("resultado").innerText = "Por favor, escribe un plan primero.";
        return;
    }

    const esPositivo = Math.random() > 0.5;
    const respuesta = esPositivo
        ? positivos[Math.floor(Math.random() * positivos.length)]
        : negativos[Math.floor(Math.random() * negativos.length)];

    const resultado = document.getElementById("resultado");
    resultado.style.opacity = 0; // Animación de salida
    setTimeout(() => {
        resultado.innerText = `"${plan}" → ${respuesta}`;
        resultado.style.opacity = 1; // Animación de entrada
    }, 300);
}
