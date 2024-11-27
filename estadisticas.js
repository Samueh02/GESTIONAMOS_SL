import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDsOhaiiWaK42QpFUWiBCwPhr8D-jU-WYU",
    authDomain: "gestionamosl.firebaseapp.com",
    databaseURL: "https://gestionamosl-default-rtdb.firebaseio.com",
    projectId: "gestionamosl",
    storageBucket: "gestionamosl.firebasestorage.app",
    messagingSenderId: "919639592401",
    appId: "1:919639592401:web:71779ab725472f241fa4f0",
    measurementId: "G-DQZQPGHBDP",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Variable global para almacenar el gráfico
let rankingChart;

// Función para mostrar/ocultar el mensaje de carga
function mostrarCargando(mostrar) {
    const loadingElement = document.getElementById("loading");
    loadingElement.style.display = mostrar ? "block" : "none";
}

// Función para cargar los datos desde Firebase
function cargarDatosDesdeFirebase() {
    const dbRef = ref(database, "rankingPlanes");

    return get(dbRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.warn("No se encontraron datos en Firebase.");
                return {};
            }
        })
        .catch((error) => {
            console.error("Error al cargar datos desde Firebase:", error);
            document.getElementById("ranking-container").innerHTML = "<p>Error al cargar datos. Inténtalo más tarde.</p>";
            return {};
        });
}

// Función para procesar las palabras clave
function procesarPalabras(rankingPlanes) {
    const palabrasRelevantes = {};
    const palabrasIrrelevantes = new Set([
        "el", "la", "los", "las", "un", "unos", "una", "unas",
        "a", "al", "ante", "bajo", "cabe", "con", "contra", "de", "del", "desde", "en",
        "entre", "hacia", "hasta", "para", "por", "según", "sin", "so", "sobre", "tras",
        "y", "e", "ni", "que", "o", "u", "pero", "mas", "sino", "aunque",
        "mi", "tu", "su", "nuestro", "nuestra", "nuestros", "nuestras",
        "vuestro", "vuestra", "vuestros", "vuestras", "este", "estos", "esta", "estas",
        "ese", "esos", "esa", "esas", "aquel", "aquellos", "aquella", "aquellas",
        "yo", "tú", "él", "ella", "nosotros", "nosotras", "vosotros", "vosotras", "ellos", "ellas",
        "me", "te", "se", "nos", "os", "lo", "la", "los", "las", "hay", "ser", "es", "soy", "somos",
        "son", "era", "eran", "fue", "fueron"
    ]);

    Object.keys(rankingPlanes).forEach((plan) => {
        const palabras = plan.split(/\s+/);
        palabras.forEach((palabra) => {
            const palabraLimpia = palabra.toLowerCase().replace(/[^a-záéíóúñ]/g, "");
            if (!palabrasIrrelevantes.has(palabraLimpia) && palabraLimpia) {
                palabrasRelevantes[palabraLimpia] =
                    (palabrasRelevantes[palabraLimpia] || 0) + rankingPlanes[plan];
            }
        });
    });

    return palabrasRelevantes;
}

// Mostrar todas las palabras relevantes en el gráfico
function mostrarTodasLasPalabras() {
    mostrarCargando(true);
    cargarDatosDesdeFirebase().then((rankingPlanes) => {
        const palabrasRelevantes = procesarPalabras(rankingPlanes);
        const rankingOrdenado = Object.entries(palabrasRelevantes).sort((a, b) => b[1] - a[1]);

        const resultado = document.getElementById("ranking-container");
        let htmlContent = "<h3>Palabras más relevantes (todas):</h3>";

        if (rankingOrdenado.length === 0) {
            htmlContent += "<p>No se han introducido planes todavía.</p>";
        } else {
            htmlContent += rankingOrdenado.map(([palabra, count], index) =>
                `<p>${index + 1}. ${palabra} - ${count} veces</p>`
            ).join("");
        }
        resultado.innerHTML = htmlContent;

        actualizarGraficoCompleto(rankingOrdenado);
        mostrarCargando(false);
    }).catch(() => {
        mostrarCargando(false);
    });
}

// Función para actualizar el gráfico completo
function actualizarGraficoCompleto(rankingOrdenado) {
    if (rankingOrdenado.length === 0) {
        console.warn("No hay datos para mostrar en el gráfico.");
        return;
    }

    const labels = rankingOrdenado.map(([palabra]) => palabra);
    const data = rankingOrdenado.map(([_, count]) => count);

    const ctx = document.getElementById("rankingChart").getContext("2d");

    if (rankingChart) {
        rankingChart.destroy();
    }

    rankingChart = new Chart(ctx, {
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
            plugins: {
                legend: {
                    position: "top",
                },
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 0,
                    },
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Configurar el botón de recarga
document.getElementById("reload-btn").addEventListener("click", () => {
    mostrarTodasLasPalabras();
});

// Cargar los datos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarTodasLasPalabras();
});
