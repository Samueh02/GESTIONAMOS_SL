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

// Función para cargar datos desde Firebase
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

// Función para procesar palabras
function procesarPalabras(rankingPlanes) {
  const palabrasRelevantes = {};
  const palabrasIrrelevantes = [
    "el", "la", "los", "las", "un", "unos", "una", "unas", "a", "al", "ante", "bajo", "cabe",
    "con", "contra", "de", "del", "desde", "en", "entre", "hacia", "hasta", "para", "por",
    "según", "sin", "so", "sobre", "tras", "y", "e", "ni", "que", "o", "u", "pero", "mas",
    "sino", "aunque", "mi", "tu", "su", "nuestro", "nuestra", "nuestros", "nuestras",
    "vuestro", "vuestra", "vuestros", "vuestras", "este", "estos", "esta", "estas", "ese",
    "esos", "esa", "esas", "aquel", "aquellos", "aquella", "aquellas", "yo", "tú", "él",
    "ella", "nosotros", "nosotras", "vosotros", "vosotras", "ellos", "ellas", "me", "te",
    "se", "nos", "os", "lo", "la", "los", "las", "hay", "ser", "es", "soy", "somos", "son",
    "era", "eran", "fue", "fueron",
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

// Mostrar palabras y gráfico completo
function mostrarRankingCompleto() {
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

// Función para actualizar el gráfico
function actualizarGraficoCompleto(rankingOrdenado) {
  if (rankingOrdenado.length === 0) {
    console.warn("No hay datos para mostrar en el gráfico.");
    return;
  }

  const labels = rankingOrdenado.map(([palabra]) => palabra);
  const data = rankingOrdenado.map(([_, count]) => count);

  const chartElement = document.getElementById("rankingChart");
  if (!chartElement) {
    console.error("El elemento canvas para el gráfico no se encuentra en el DOM.");
    return;
  }

  const ctx = chartElement.getContext("2d");

  // Verificar si el gráfico ya existe y destruirlo si es válido
  if (window.rankingChart && typeof window.rankingChart.destroy === "function") {
    window.rankingChart.destroy();
  }

  // Crear un nuevo gráfico
  window.rankingChart = new Chart(ctx, {
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

// Llamar a la función inicial
mostrarRankingCompleto();
