function gestionar() {
    const plan = document.getElementById("plan").value.trim();
    const positivos = [
        "¡Claro que sí, ya está gestionado!",
        "Por supuesto, no hay mejor plan.",
        "¡Gestionado con éxito, vamos allá!"
    ];
    const negativos = [
    "No puedo, tengo que regar mis plantas carnívoras.",
    "Estoy atrapado en un loop de procrastinación infinita.",
    "Me toca enseñarle a mi pez a nadar sincronizado.",
    "Estoy esperando que mi tostadora termine su proceso creativo.",
    "Tengo que reorganizar mi colección de chistes malos.",
    "Mi WiFi solo funciona en días soleados.",
    "No puedo, tengo que devolverle un libro a mi vecino imaginario.",
    "Es imposible, mi cobaya está en una llamada de negocios.",
    "No puedo gestionar nada sin mi taza de café número 18.",
    "Estoy revisando si los pingüinos pueden volar (todavía no tengo pruebas).",
    "Me lo prohibió mi horóscopo del día.",
    "Mi aspiradora me pidió un día libre.",
    "No puedo, estoy esperando la señal de los aliens.",
    "Estoy en un retiro espiritual con mi planta de aloe vera.",
    "Es complicado, estoy en plena negociación con un unicornio.",
    "No puedo, he perdido mi sombra.",
    "Mi hamster me robó las llaves de la casa y no las encuentra.",
    "Estoy intentando calcular el número de pelos de mi gato.",
    "Me toca limpiar la colección de pensamientos negativos.",
    "No puedo, es mi día de no hacer absolutamente nada.",
    "Estoy esperando que mi pan salga del horno (y lo puse ayer).",
    "Tengo que aprender a pronunciar supercalifragilisticoespialidoso sin trabarme.",
    "No puedo, estoy traduciendo ladridos a español.",
    "Mi portátil me pidió un descanso, está cansado.",
    "No puedo, estoy buscando el significado del universo.",
    "Tengo que verificar si las estrellas están alineadas correctamente.",
    "Estoy en un experimento de no gestión por 24 horas.",
    "No puedo, mi calcetín favorito está desaparecido y estoy devastado.",
    "Es imposible, tengo que ver si el sol se pone por el oeste hoy también.",
    "Estoy probando si puedo ser invisible al quedarme muy quieto.",
    "No puedo, estoy reconstruyendo mi ego después de perder en un videojuego.",
    "Me toca entrenar a mi perro en parkour.",
    "Estoy esperando que la gravedad me dé permiso para moverme.",
    "No puedo, estoy analizando qué fue primero, el huevo o la gallina.",
    "Estoy buscando mi motivación bajo el sofá.",
    "Tengo una cita con mi almohada, no puedo cancelar.",
    "No puedo, estoy esperando a que mi pizza se autorrecaliente.",
    "Mi unicornio me pidió que le leyera un cuento antes de dormir.",
    "Estoy ocupadísimo mirando cómo crecen las plantas.",
    "No puedo, mi lista de tareas me dio una crisis existencial.",
    "Estoy calculando el porcentaje de días soleados del año.",
    "No puedo, hoy estoy practicando cómo decir que no.",
    "Mi nevera me pidió que la despidiera por no mantener el helado frío.",
    "Tengo que consolar a mi ordenador, dice que no tiene suficiente espacio.",
    "Estoy entrenando para ser el campeón mundial de procrastinación.",
    "No puedo, mi WiFi está en huelga.",
    "Me toca lavar los platos imaginarios de mi restaurante imaginario.",
    "No puedo, estoy tratando de entender por qué la tostada siempre cae del lado de la mantequilla.",
    "Estoy en plena auditoría de mi tiempo perdido.",
    "No puedo, estoy leyendo los términos y condiciones de todo lo que he aceptado.",
    "Es complicado, estoy descifrando el enigma del calcetín perdido.",
    "No puedo, mi espíritu animal me dijo que no es buena idea.",
    "Estoy ocupadísimo guardando mi orgullo en una caja.",
    "Estoy esperando a que mi reloj cucú vuelva de sus vacaciones.",
    "No puedo, estoy en un torneo internacional de salto al sofá.",
    "Es complicado, tengo que evitar que mi sombra se escape.",
    "Estoy viendo si mi pez beta puede aprender álgebra.",
    "No puedo, tengo que ir a una fiesta de despedida para una mosca.",
    "Estoy organizando un grupo de apoyo para las plantas olvidadas.",
    "No puedo, mi cama me atrapó con su gravedad irresistible.",
    "Es imposible, mi wifi se peleó con mi router.",
    "Estoy perfeccionando mi técnica de abrir la nevera sin saber qué quiero.",
    "No puedo, me están entrenando para ser un espía ninja.",
    "Estoy esperando la notificación de que soy famoso.",
    "No puedo, mi teclado me dio error 404.",
    "Es complicado, mi reloj dijo que no es el momento adecuado.",
    "Estoy ocupado buscando el tesoro de las galletas escondido en mi cocina.",
    "No puedo, mi gato se comió mi agenda.",
    "Estoy intentando recordar dónde dejé mi motivación para vivir.",
    "Estoy diseñando un mapa para encontrar el camino al éxito (pero me perdí).",
    "No puedo, tengo una cita con la última temporada de mi serie favorita.",
    "Estoy ocupado pensando en qué voy a pensar."
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
