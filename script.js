// Configuración de Firebase (copia tus datos de configuración desde Firebase Console)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    databaseURL: "TU_DATABASE_URL",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let rankingPlanes = {};

// Mostrar el ranking al cargar la página
window.onload = function () {
    cargarRankingDesdeFirebase(mostrarRankingGlobal);
};

// Guardar datos en Firebase
function guardarRankingEnFirebase(rankingPlanes) {
    firebase.database().ref("rankingPlanes").set(rankingPlanes, (error) => {
        if (error) {
            console.error("Error al guardar en Firebase:", error);
        } else {
            console.log("Ranking guardado en Firebase.");
        }
    });
}

// Cargar datos desde Firebase
function cargarRankingDesdeFirebase(callback) {
    firebase.database().ref("rankingPlanes").get().then((snapshot) => {
        if (snapshot.exists()) {
            rankingPlanes = snapshot.val();
            console.log("Ranking cargado desde Firebase:", rankingPlanes);
            callback();
        } else {
            console.log("No hay datos disponibles en Firebase.");
            rankingPlanes = {};
            callback();
        }
    }).catch((error) => {
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

// Extraer palabras clave y contarlas
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
    "hay", "ser", "es", "soy", "somos", "son", "era", "eran", "fue", "fueron", // Verbos comunes
    "sí", "no", "porque", "como", "cuando", "donde", "quién", "qué", "cual", "cuales", "cuyo", "cuyos", "cuyas", "cuya" // Adverbios y palabras interrogativas
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
