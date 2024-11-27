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
            return {};
        });
}

// Función para procesar las palabras clave
function procesarPalabras(rankingPlanes) {
    const palabrasRelevantes = {};
    const palabrasIrrelevantes = [
        "el", "la", "los", "las", "un", "unos", "una", "unas", // Artículos
        "a", "al", "ante", "bajo", "cabe", "con", "contra", "de", "del", "desde", "en", // Preposiciones
        "entre", "hacia", "hasta", "para", "por", "según", "sin", "so", "sobre", "tras",
        "y", "e", "ni", "que", "o", "u", "pero", "mas", "sino", "aunque", // Conjunciones
        "mi", "tu", "su", "nuestro", "nuestra", "nuestros", "nuestras", // Pronombres posesivos
        "vuestro", "vuestra", "vuestros", "vuestras", "este", "estos", "esta", "estas",
        "ese", "esos", "esa", "esas", "aquel", "aquellos", "aquella", "aquellas", // Demostrativos
        "yo", "tú", "él", "ella", "nosotros", "nosotras", "vosotros", "vosotras", "ellos", "ellas", // Personales
        "me", "te", "se", "nos", "os", "lo", "la", "los", "las", // Reflexivos y objetos
        "hay", "ser", "es", "soy", "somos", "son", "era", "eran", "fue", "fueron" // Verbos comunes
    ];

    Object.keys(rankingPlanes).forEach((plan) => {
        const palabras = plan.split(/\s+/);
        palabras.forEach((palabra) => {
            const palabraLimpia = palabra.toLowerCase().replace(/[^a-záéíóúñ]/g, "");
            if (!palabrasIrrelevantes.includes(palabraLimpia) && palabraLimpia) {
                palabrasRelevantes[palabraLimpia] =
                    (palabrasRelevantes[palabraLimpia] || 0) + rankingPlanes[plan];
            }
        });
    });

    return palabrasRelevantes;
}

// Mostrar todas las palabras relevantes en el gráfico
function mostrarTodasLasPalabras() {
    cargarDatosDesdeFirebase().then((rankingPlanes) => {
        const palabrasRelevantes = procesarPalabras(rankingPlanes);
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
    });
}

// Función para actualizar el gráfico completo
function actualizarGraficoCompleto(rankingOrdenado) {
    if (!rankingOrdenado || rankingOrdenado.length === 0) {
        console.warn("No hay datos para mostrar en el gráfico.");
        return;
    }

    const chartElement = document.getElementById("rankingChart");
    if (!chartElement) {
        console.error("El elemento canvas para el gráfico no se encuentra en el DOM.");
        return;
    }

    const ctx = chartElement.getContext("2d");

    // Si existe un gráfico previo, destrúyelo correctamente
    if (window.rankingChart instanceof Chart) {
        window.rankingChart.destroy();
    }

    // Crear el gráfico
    window.rankingChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: rankingOrdenado.map(([palabra]) => palabra),
            datasets: [
                {
                    label: "Relevancia de Palabras",
                    data: rankingOrdenado.map(([_, count]) => count),
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


// Llamar a la función para mostrar los datos
mostrarTodasLasPalabras();
