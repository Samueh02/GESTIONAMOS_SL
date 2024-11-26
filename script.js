// Importar las funciones necesarias desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDsOhaiiWaK42QpFUWiBCwPhr8D-jU-WYU",
  authDomain: "gestionamosl.firebaseapp.com",
  databaseURL: "https://gestionamosl-default-rtdb.firebaseio.com",
  projectId: "gestionamosl",
  storageBucket: "gestionamosl.firebasestorage.app",
  messagingSenderId: "919639592401",
  appId: "1:919639592401:web:71779ab725472f241fa4f0",
  measurementId: "G-DQZQPGHBDP"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let rankingPlanes = {};

// Mostrar el ranking al cargar la página
window.onload = function () {
  cargarRankingDesdeFirebase(mostrarRankingGlobal);
};

// Guardar datos en Firebase
function guardarRankingEnFirebase(rankingPlanes) {
  const dbRef = ref(database, "rankingPlanes");
  set(dbRef, rankingPlanes)
    .then(() => {
      console.log("Ranking guardado en Firebase.");
    })
    .catch((error) => {
      console.error("Error al guardar en Firebase:", error);
    });
}

// Cargar datos desde Firebase
function cargarRankingDesdeFirebase(callback) {
  const dbRef = ref(database, "rankingPlanes");
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        rankingPlanes = snapshot.val();
        console.log("Ranking cargado desde Firebase:", rankingPlanes);
        callback();
      } else {
        console.log("No hay datos disponibles en Firebase.");
        rankingPlanes = {};
        callback();
      }
    })
    .catch((error) => {
      console.error("Error al cargar desde Firebase:", error);
    });
}

// Gestionar planes
function gestionar() {
  const nombre = document.getElementById("nombre").value.trim() || "Amigo";
  const plan = document.getElementById("plan").value.trim().toLowerCase();

  if (!plan) {
    document.getElementById("resultado").innerText = "Por favor, escribe un plan primero.";
    return;
  }

  // Actualizar el ranking
  rankingPlanes[plan] = (rankingPlanes[plan] || 0) + 1;

  // Guardar en Firebase
  guardarRankingEnFirebase(rankingPlanes);

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

// Función para excusa extrema
function excusaExtrema() {
  const excusasExtremas = [
    "No puedo, mi tortuga está aprendiendo a tocar la guitarra eléctrica.",
    "Imposible, estoy ocupado diseñando mi próximo castillo de naipes.",
    "No puedo, tengo que contar todas las estrellas esta noche.",
    "Estoy practicando cómo quedarme quieto como una estatua, y no puedo moverme.",
    "No puedo, tengo una reunión importante con mi almohada.",
    "Hoy no puedo, estoy entrenando para el campeonato mundial de procrastinación.",
    "Imposible, tengo que enseñarle a mi gato a bailar salsa.",
    "Lo siento, pero estoy desarrollando mi habilidad para hablar con plantas.",
    "No puedo, estoy esperando una señal del universo para tomar decisiones.",
    "Estoy demasiado ocupado investigando por qué las tostadas siempre caen del lado de la mantequilla."
  ];

  const excusa = excusasExtremas[Math.floor(Math.random() * excusasExtremas.length)];
  document.getElementById("resultado").innerText = excusa;
}

// Procesar palabras clave para el ranking
function procesarPalabras() {
  const palabrasRelevantes = {};
  const palabrasIrrelevantes = [
    "el", "la", "los", "las", "un", "unos", "una", "unas", // Artículos
    "a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "en", "entre", "hacia", "hasta", "para", "por", "según", "sin", "so", "sobre", "tras", // Preposiciones
    "y", "e", "ni", "que", "o", "u", "pero", "mas", "sino", "aunque", // Conjunciones
    "mi", "tu", "su", "nuestro", "nuestra", "nuestros", "nuestras", "vuestro", "vuestra", "vuestros", "vuestras", // Pronombres posesivos
    "este", "estos", "esta", "estas", "ese", "esos", "esa", "esas", "aquel", "aquellos", "aquella", "aquellas", // Pronombres demostrativos
    "yo", "tú", "él", "ella", "nosotros", "nosotras", "vosotros", "vosotras", "ellos", "ellas", // Pronombres personales
    "me", "te", "se", "nos", "os", "lo", "la", "los", "las", // Pronombres reflexivos y objetos
    "hay", "ser", "es", "soy", "somos", "son", "era", "eran", "fue", "fueron" // Verbos comunes
  ];

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
