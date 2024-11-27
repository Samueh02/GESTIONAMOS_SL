import { procesarPalabras } from "./script.js";

// Mostrar todas las palabras relevantes en el gráfico
function mostrarTodasLasPalabras() {
    const palabrasRelevantes = procesarPalabras();
    const rankingOrdenado = Object.entries(palabrasRelevantes).sort((a, b) => b[1] - a[1]);

    const resultado = document.getElementById("ranking-container");
    resultado.innerHTML = "<h3>Palabras más relevantes (todas):</h3>";

    if (rankingOrdenado.length === 0) {
        resultado.innerHTML += "<p>No se han introducido planes todavía.</p>";
    } else {
        rankingOrdenado.forEach(([palabra, count], index) => {
            resultado.innerHTML += `<p>${index + 1}. ${palabra} - ${count} veces</p>`;
        });
    }

    actualizarGraficoCompleto(rankingOrdenado);
}

// Función para actualizar el gráfico completo
function actualizarGraficoCompleto(rankingOrdenado) {
    const labels = rankingOrdenado.map(([palabra]) => palabra);
    const data = rankingOrdenado.map(([_, count]) => count);

    const ctx = document.getElementById("rankingChart").getContext("2d");

    // Crear un nuevo gráfico
    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Relevancia de Palabras",
                    data,
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

mostrarTodasLasPalabras();
