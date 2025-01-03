document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf; 

    function mezclarPreguntas(array) { //mezcla el array para que las preguntas aparezcan desordenadas en cada intento. 
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // genera orden aleatorio de las preguntas
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const preguntasOriginales = [ // este es el orden original de las preguntas.
        // Preguntas que van a aparecer en el simulador. empieza desde 0 para verificar cual es la respuesta correcta. 
         // 1
        {
            pregunta: "La niebla como factor de riesgo produce modificaciones en: ",
            opciones: ["El campo visual del conductor y su percepción del entorno, la capacidad lumínica del vehículo como la adherencia de sus cubiertas y la respuesta del pavimento", 
                "El campo visual del conductor y el estado del pavimento.", 
                "Solo afecta la capacidad lumínica del vehículo y la respuesta de sus cubiertas en el avance"],
            respuestaCorrecta: 0
        },
        // 2
        {
            pregunta: "¿Cuál es la velocidad mínima  permitida en avenidas, salvo señalización en contrario?",
            opciones: ["20 km/h", "40 km/h", "30 km/h"],
            respuestaCorrecta: 2
        },
    
        // 3
       
        {
            pregunta: "¿Está permitido penetrar en un paso de nivel cuando las barreras están en movimiento?",
            opciones: ["Solo si me aseguro que puedo pasar con seguridad", "No", "Sí, cuando estén levantándose"],
            respuestaCorrecta: 1
        },
        // 4
        {
            pregunta: "Cuando un vehículo circula por una arteria ubicada al costado de una vía ferréa. ¿Es obligatorio cederle el paso a otro que sale del paso a nivel?",
            opciones: ["Sí, si viene de la derecha", "No", "Debe cedérse el paso, venga de la izquierda o de la derecha."],
            respuestaCorrecta: 2
        },
        // 5
        {
            pregunta: "Según la ley N°24.449, ¿Qué indica un cordón pintado de color amarillo?",
            opciones: ["Indica que sólo está prohibido estacionar, pudiendo efectuarse detenciones para ascenso y descenso de carga y pasajeros.", 
                "Indica que es un lugar reservado para el estacionamiento exclusivo de vehículos destinados al transporte de pasajeros.", 
                "Indica que está prohibido estacionar o detenerse al costado de la acera."],
            respuestaCorrecta: 0
        },
          // 6
        {
            pregunta: "¿Cuales son los números de emergencia que todo usuario de la vía pública debe conocer con el objetivo de llamar y pedir ayuda ante un accidente de cualquier indole?",
            opciones: ["211/109", "911/107", "112/110"],
            respuestaCorrecta: 1
        },
        //7
        {
            pregunta: "Al efectuar un giro en una bocacalle estando encendida la luz verde del semáforo, entre el conductor y el peatón ¿Quién tiene prioridad de paso?",
            opciones: ["El peatón", "El conductor", "Es indistinto"],
            respuestaCorrecta: 0
        },
        //8
        {
            pregunta: "¿En que casos utilizamos luz alta?",
            opciones: ["En casos de niebla y en conducción nocturna", "Cuando se circule en cualquier arteria y la luz natural sea insuficiente", "Solo en zona rural o autopista, cuando la luz natural sea insuficiente. "],
            respuestaCorrecta: 2
        },
        //9
        {
            pregunta: "¿Por donde no deben circular los conductores principiantes?",
            opciones: ["Calles, avenidas y autopistas", "Rutas y avenidas", "Zonas centricas, rutas, autopistas y semiautopistas. "],
            respuestaCorrecta: 2
        },
        //10
        {
            pregunta: "¿Que debe realizar el conductor frente a la luz amarilla inermitente del semáforo?",
            opciones: ["Detenerse", "Avanzar con precaución", "Avanzar"],
            respuestaCorrecta: 1
        },
        //11
        {
            pregunta: "¿Por qué período puedo dejar estacionado un vehículo en la vía pública?",
            opciones: ["Por un período de 30 días o lo que fije la autoridad", "Por un período de 5 días o lo que fije la autoridad", "No hay plazos determinados para dejar un vehículo estacionado"],
            respuestaCorrecta: 1
        },
        //12
        {
            pregunta: "¿Cuál es la distancia que debe dejarse entre vehículos para estacionar?",
            opciones: ["50 cm", "5 cm", "5 mts"],
            respuestaCorrecta: 0
        },
        //13
        {
            pregunta: "¿Quién tiene prioridad de paso en una avenida?",
            opciones: ["El que viene por la derecha", "El que circula por la avenida", "Es indistinto"],
            respuestaCorrecta: 1
        },
        //14
        {
            pregunta: "Si para adelantar a otro vehículo debe invadir un carril exclusivo para colectivos y taxis, ¿le está permitido realizar la maniobra?",
            opciones: ["Sí, mientras no venga ningún taxi o colectivo", "No, porque está prohibido usar ese carril", "Si, puedo usar el carril para adelantar a otro vehículo"],
            respuestaCorrecta: 1
        },
        //15
        {
            pregunta: "Usted ha adelantado a otro vehículo en una intersección ¿es correcto su comportamiento?",
            opciones: ["Si, porque tengo prioridad de paso", "No, porque sólo está permitido adelantar en las intersecciones con rotondas.",  "No, porque en las intersecciones está prohibido adelantar"],
            respuestaCorrecta: 2
        },
        //16
        {
            pregunta: "¿Debe cederle el paso a una fila de escolares que circula por la calle?",
            opciones: ["Sí", "No",  "Solo si se advierte la existencia de un colegio cercano"],
            respuestaCorrecta: 0
        },
        //17
        {
            pregunta: "¿Cuál de estas sustancias pueden afectar negativamente a la hora de conducir?",
            opciones: ["Cualquier medicamento", "Bebidas azúcaradas",  "Bebidas alcohólicas"],
            respuestaCorrecta: 2
        },
        //18
        {
            pregunta: "¿Qué significa la señal de la estrella amarilla?",
            opciones: ["Lugar donde ocurrió un siniestro vial que produjo una victima fatal", "Lugar donde ocurrió un siniestro",  "Zona de peligro"],
            respuestaCorrecta: 0
        },
        //19
        {
        pregunta: "Entre los efectos que produce el alcohol en el conductor se encuentra la: ",
        opciones: ["Ampliación del campo visual", "Disminución de la distancia de frenado",  "Incorrecta apreciación de distancias y velocidades"],
        respuestaCorrecta: 2
        },
         //20
        {
            pregunta: "Usted ha sufrido un desperfecto en su vehículo y lo ha dejado inmovilizado en la banquina, ¿debe señalizarlo?",
            opciones: ["No, porque el vehículo no está en la calzada", "Sí, con las balizas encendidas, los triángulos de señalización y luces de posición",  "Sí, con los triángulos de señalización de vehículo "],
            respuestaCorrecta: 1 
        },
        
    ]; 

    let preguntas = mezclarPreguntas([...preguntasOriginales]); //mezcla las preguntas para que salagn aleatoriamente

    let respuestasCorrectas = 0;
    let indicePreguntaActual = 0;
    let tiempoRestante = 15 * 60; // 15 minutos en segundos
    let temporizador;

    // Elementos del DOM
    const comenzarBtn = document.getElementById("comenzar-btn");
    const continuarBtn = document.getElementById("continuar-btn");
    const reiniciarBtn = document.getElementById("reiniciar-btn");


    const inicioDiv = document.getElementById("inicio");
    const consideracionesDiv = document.getElementById("consideraciones");
    const preguntasDiv = document.getElementById("preguntas");
    const resultadosDiv = document.getElementById("resultados");
    const preguntaContainer = document.getElementById("pregunta-container");
    const mensajeAprobacion = document.getElementById("mensaje-aprobacion");

    const descargarBtn = document.getElementById("descargar-pdf-btn");
    const volverSimuladorBtn = document.getElementById("volver-simulador-btn")

    // inicia el simulador
    comenzarBtn.addEventListener("click", function() {
        inicioDiv.style.display = "none";
        consideracionesDiv.style.display = "block";
    });

    // continua las preguntas
    continuarBtn.addEventListener("click", function() {
        consideracionesDiv.style.display = "none";
        preguntasDiv.style.display = "block";
        mostrarPregunta();
        iniciarTemporizador();
    });

    // muestra las preguntas
    function mostrarPregunta() {
        const preguntaActual = preguntas[indicePreguntaActual];
        preguntaContainer.innerHTML = `
            <h3>${preguntaActual.pregunta}</h3>
            ${preguntaActual.opciones.map((opcion, index) => `
                <button class="opcion-btn" onclick="verificarRespuesta(${index})">${opcion}</button>
            `).join('')}
        `;

        // actualizar barra de progreso
        const porcentajeProgreso = ((indicePreguntaActual + 1) / preguntas.length) * 100;
        document.getElementById("barra-progreso").value = porcentajeProgreso;
    }

    // verifica si la respuesta es correcta
    window.verificarRespuesta = function(opcionSeleccionada) {
        const preguntaActual = preguntas[indicePreguntaActual];
        
        // Guardar la respuesta seleccionada por el usuario
        preguntaActual.respuestaUsuario = opcionSeleccionada;
    
        if (opcionSeleccionada === preguntaActual.respuestaCorrecta) {
            respuestasCorrectas++;
            preguntaContainer.innerHTML += `<p class="correcta">Respuesta correcta</p>`;
        } else {
            preguntaContainer.innerHTML += `<p class="incorrecta"> Respuesta incorrecta. La respuesta correcta es: ${preguntaActual.opciones[preguntaActual.respuestaCorrecta]}</p>`;
        }
    
        indicePreguntaActual++;

        if (indicePreguntaActual < preguntas.length) {
            setTimeout(mostrarPregunta, 1000); // pasa a la siguiente pregunta despues de 1 segundo 
        } else {
            finalizarExamen();
        }
    };

    // inicia temporizador
    function iniciarTemporizador() {
        temporizador = setInterval(actualizarTemporizador, 1000); // actualizar durante cada segundo q pasa
    }

    // actualizar el temporizador en la pantalla
    function actualizarTemporizador() {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        document.getElementById("temporizador").textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            finalizarExamen();
        }
        tiempoRestante--;
    }

    // finalizar el examen
function finalizarExamen() {
    preguntasDiv.style.display = "none";
    resultadosDiv.style.display = "block";
    clearInterval(temporizador);

    // calcular el porcentaje
    const porcentaje = (respuestasCorrectas / preguntas.length) * 100;
    const mensaje = porcentaje >= 75 ? "¡Aprobaste :) !" : "No aprobaste :( Sigue intentándolo";
    mensajeAprobacion.innerText = `Tu puntuación es del ${porcentaje}%. ${mensaje}`;

    // enviar el intento al backend
guardarIntento(porcentaje); // envia el porcentaje


    // mezclar preguntas para el próximo intento
    preguntas = mezclarPreguntas([...preguntasOriginales]);

    // muestran los botones
    reiniciarBtn.style.display = 'block';
    descargarBtn.style.display = 'block';

    //botón para volver al simulador
    const volverSimuladorBtn = document.getElementById('volver-simulador-btn');
    volverSimuladorBtn.style.display = 'block';

    volverSimuladorBtn.addEventListener('click', function() {
        respuestasCorrectas = 0;
        indicePreguntaActual = 0;
        tiempoRestante = 15 * 60;
        resultadosDiv.style.display = "none";
        inicioDiv.style.display = "block";
    });
}

// funcion para descargar pdf
    function descargarPDF() {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
    
        // Configurar fuente Times New Roman
        doc.setFont("times", "normal");
        doc.setFontSize(12);
    
        // Configuración de márgenes y espaciado
        const margenX = 20;  // Margen izquierdo
        const margenY = 20;  // Margen superior
        const anchoUtil = 170; //hoja a4
        let posY = margenY;
        const espacioLinea = 7; // espacio entre las lineas
    
        // Agregar título
        doc.setFontSize(16);
        doc.setFont("times", "bold");
        const titulo = "Resultados del Simulador de Examen de Manejo";
        const anchoTitulo = doc.getStringUnitWidth(titulo) * doc.getFontSize() / doc.internal.scaleFactor;
        const centroX = (210 - anchoTitulo) / 2;
        doc.text(titulo, centroX, posY);
        
        posY += espacioLinea * 2;
    
    
        // Agregar puntuación
        doc.setFontSize(12);
        doc.setFont("times", "bold");
        const puntuacion = `Puntuación final: ${respuestasCorrectas} de ${preguntas.length} (${(respuestasCorrectas/preguntas.length*100).toFixed(1)}%)`;
        doc.text(puntuacion, margenX, posY);
        posY += espacioLinea * 2;
    
        // Función auxiliar para dividir texto largo
        function dividirTextoLargo(texto, ancho) {
            const palabras = texto.split(' ');
            let lineas = [];
            let lineaActual = palabras[0];
    
            for(let i = 1; i < palabras.length; i++) {
                const palabra = palabras[i];
                const anchoProvisional = doc.getStringUnitWidth(lineaActual + ' ' + palabra) * doc.getFontSize() / doc.internal.scaleFactor;
                
                if(anchoProvisional < ancho) {
                    lineaActual += ' ' + palabra;
                } else {
                    lineas.push(lineaActual);
                    lineaActual = palabra;
                }
            }
            lineas.push(lineaActual);
            return lineas;
        }
    
        // Iterar sobre cada pregunta
        preguntas.forEach((pregunta, index) => {
            // Verificar si necesitamos nueva página
            if(posY > 260) {  
                doc.addPage();
                posY = margenY;
            }
    
            
            doc.setFont("times", "bold");
            let textoPregunta = `Pregunta ${index + 1}: ${pregunta.pregunta}`;
            let lineasPregunta = dividirTextoLargo(textoPregunta, anchoUtil);
            
            lineasPregunta.forEach(linea => {
                doc.text(linea, margenX, posY);
                posY += espacioLinea;
            });
    
            // Respuesta del usuario
            doc.setFont("times", "normal");
            let respuestaUsuario = pregunta.respuestaUsuario !== undefined ? 
                pregunta.opciones[pregunta.respuestaUsuario] : 
                'No respondida';
            let textoRespuestaUsuario = `Tu respuesta: ${respuestaUsuario}`;
            let lineasRespuestaUsuario = dividirTextoLargo(textoRespuestaUsuario, anchoUtil);
            
            posY += espacioLinea/2;
            lineasRespuestaUsuario.forEach(linea => {
                doc.text(linea, margenX, posY);
                posY += espacioLinea;
            });
    
            // Indicar si fue correcta o incorrecta
            let esCorrecta = pregunta.respuestaUsuario === pregunta.respuestaCorrecta;
            doc.setTextColor(esCorrecta ? 0 : 1, esCorrecta ? 0.39 : 0, 0);
            doc.text(esCorrecta ? 'Correcta' : 'Incorrecta', margenX, posY);
            doc.setTextColor(0,0,0); 
    
            // si es incorrecta muestra la respuesta correcta
            if(!esCorrecta) {
                posY += espacioLinea;
                let textoRespuestaCorrecta = `Respuesta correcta: ${pregunta.opciones[pregunta.respuestaCorrecta]}`;
                let lineasRespuestaCorrecta = dividirTextoLargo(textoRespuestaCorrecta, anchoUtil);
                
                lineasRespuestaCorrecta.forEach(linea => {
                    doc.text(linea, margenX, posY);
                    posY += espacioLinea;
                });
            }
    
            posY += espacioLinea * 1.5; // Espacio entre preguntas
        });
    
        // Agregar pie de página
        const fecha = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Fecha de realización: ${fecha}`, margenX, 285);
    
        // Guardar el PDF
        doc.save('resultados-simulador.pdf');
    }
      // boton descargar pdf
      descargarBtn.addEventListener('click', descargarPDF);

 // reiniciar el simulador
    reiniciarBtn.addEventListener('click', function() {
        respuestasCorrectas = 0;
        indicePreguntaActual = 0;
        tiempoRestante = 15 * 60; // 15 minutos en segundos

        resultadosDiv.style.display = "none";
        inicioDiv.style.display = "block";
    });
});
document.getElementById("reiniciar-btn").addEventListener("click", function () {
    // oculta sección de preguntas
    document.getElementById("preguntas").style.display = "none";

    // muestra sección de bienvenida
    document.getElementById("bienvenido").style.display = "block";

    // reinicia el temporizador y la barra de progreso 
    document.getElementById("temporizador").textContent = "15:00";
    document.getElementById("barra-progreso").value = 0;
});

//auto
window.addEventListener('load', () => {
    const auto = document.querySelector('.auto');
    auto.classList.remove('auto'); 
    void auto.offsetWidth; 
    auto.classList.add('auto'); 
});

const autoContainer = document.getElementById('auto-container'); 
const comenzarBtn = document.getElementById('comenzar-btn'); 
const loginSection = document.getElementById('login'); 
const inicioSection = document.getElementById('inicio'); 

comenzarBtn.addEventListener('click', () => {
    autoContainer.style.display = 'none'; // Oculta el auto, bienvenida y despues el login
    inicioSection.style.display = 'none'; 
    loginSection.style.display = 'block'; 
});


// validadaciones iniciar sesion
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // evita que no se envie el form vacio

    // toma los valores de los inputs
    const dni = document.getElementById("dni").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();

    // error y exito
    const errorMessage = document.getElementById("errorMensaje");
    const successMessage = document.getElementById("successMessage");

    // validaciones 
    const dniRegex = /^[0-9]{7,8}$/; // solo números entre 7 y 8 digitos
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,30}$/; // letras y espacios entre 2 y 30 caracteres permite acentos

    // limpiar mensajes anteriores
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
    successMessage.textContent = "";
    successMessage.style.display = "none";

    // validaciones
    if (!dniRegex.test(dni)) {
        errorMessage.textContent = "El DNI debe tener entre 7 y 8 números.";
        errorMessage.style.display = "block";
        return;
    }
    if (!nameRegex.test(nombre)) {
        errorMessage.textContent = "El nombre debe contener solo letras.";
        errorMessage.style.display = "block";
        return;
    }
    if (!nameRegex.test(apellido)) {
        errorMessage.textContent = "El apellido debe contener solo letras.";
        errorMessage.style.display = "block";
        return;
    }

    // cuando cumple con todas las validaciones, lo enviamos al servidor
    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ dni, nombre, apellido })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            errorMessage.textContent = data.error;
            errorMessage.style.display = "block";
        } else {
            // guardar el DNI del usuario en localStorage para usarlo despues
            localStorage.setItem('dniUsuario', dni);
            console.log('DNI guardado en localStorage:', localStorage.getItem('dniUsuario'));
        
            // muestra mensaje de éxito
            successMessage.textContent = data.message; // "Inicio de sesión exitoso"
            successMessage.style.display = "block";
        
            //1 segundo y pasa a la siguiente sección
            setTimeout(() => {
                document.getElementById("login").style.display = "none";
                document.getElementById("consideraciones").style.display = "block";
            }, 1000);
        }
        
    })
    .catch(error => {
        console.error("Error:", error);
        errorMessage.textContent = "Error al conectar con el servidor.";
        errorMessage.style.display = "block";
    });
});

// limpia el formulario del login
function resetLoginForm() {
    document.getElementById("dni").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("errorMensaje").textContent = "";
    document.getElementById("errorMensaje").style.display = "none";
    document.getElementById("successMessage").textContent = "";
    document.getElementById("successMessage").style.display = "none";
}

// boton comenzar
document.addEventListener("DOMContentLoaded", () => {
    const comenzarBtn = document.getElementById("comenzar-btn"); 
    const loginSection = document.getElementById("login"); 
    const consideracionesSection = document.getElementById("consideraciones"); 
    const autoContainer = document.getElementById("auto-container");

    comenzarBtn.addEventListener("click", () => {
        consideracionesSection.style.display = "none";
        if (autoContainer) autoContainer.style.display = "none";

        // muestra login y lo limpia
        resetLoginForm();
        loginSection.style.display = "block";
    });
});

// función para guardar el intento en el backend
function guardarIntento(porcentaje) {
    const dniUsuario = localStorage.getItem('dniUsuario'); // Recupera el DNI del usuario
    if (!dniUsuario) {
        console.error('No se encontró el DNI del usuario en localStorage');
        return;
    }

    const fecha = new Date();
    const intentoData = {
        dni: dniUsuario,
        puntaje: porcentaje,
        fecha: fecha.toISOString(),
    };

    console.log('Datos del intento enviados al backend:', intentoData);

    fetch('http://127.0.0.1:5000/guardar-intento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(intentoData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                console.log('Intento guardado con éxito:', data.message);
            } else if (data.error) {
                console.error('Error al guardar el intento:', data.error);
            }
        })
        .catch((error) => console.error('Error al enviar los datos del intento:', error));
}

async function obtenerIntentos() {
    const dniUsuario = localStorage.getItem("dniUsuario"); // recupera el DNI almacenado en localstore q guardamos con el form
    const tablaCuerpo = document.getElementById("tabla-cuerpo");
    const seccionPrincipal = document.getElementById("inicio");
    const seccionIntentos = document.getElementById("seccion-intentos");

    if (!dniUsuario) {
        console.error("No se encontró el DNI en localStorage.");
        return;
    }

    try {
        const respuesta = await fetch(`http://127.0.0.1:5000/obtener_intentos/${dniUsuario}`);
        if (!respuesta.ok) throw new Error("Error al obtener los intentos");

        const intentos = await respuesta.json();
        tablaCuerpo.innerHTML = ""; // limpiar la tabla antes de llenarla

        intentos.forEach(intento => {
            const fila = `<tr>
                <td>${intento.fecha}</td>
                <td>${intento.hora}</td>
                <td>${intento.puntaje}</td>
            </tr>`;
            tablaCuerpo.innerHTML += fila;
        });

        // muestra la sección de intentos y oculta la sección principal
        seccionPrincipal.style.display = "none";
        seccionIntentos.style.display = "block";

    } catch (error) {
        console.error("Error:", error);
    }
}

// boton volver inicio
document.getElementById("volver-inicio-btn").addEventListener("click", () => {
    // Mostrar la sección principal y ocultar la sección de intentos
    document.getElementById("inicio").style.display = "block";
    document.getElementById("seccion-intentos").style.display = "none";
});

// boton ver intentos
document.getElementById("estadisticas").addEventListener("click", () => {
    console.log("Botón 'Ver intentos y estadísticas' clickeado");
    obtenerIntentos();
});

// funcion ordenar los intentos 
// "      ordenar la tabla según la opción que el usuario quiera
function ordenarTabla(opcion) {
    const tabla = document.getElementById("tabla-intentos");
    const filas = Array.from(tabla.tBodies[0].rows);
    let ordenarPor;

    if (opcion === "fechaDesc") {
        ordenarPor = (a, b) => new Date(b.cells[0].innerText) - new Date(a.cells[0].innerText); // fecha mas reciente
    } else if (opcion === "fechaAsc") {
        ordenarPor = (a, b) => new Date(a.cells[0].innerText) - new Date(b.cells[0].innerText); // fecha mas lejana
    } else if (opcion === "puntajeDesc") {
        ordenarPor = (a, b) => parseInt(b.cells[2].innerText) - parseInt(a.cells[2].innerText); // puntuacion mas alta
    } else if (opcion === "puntajeAsc") {
        ordenarPor = (a, b) => parseInt(a.cells[2].innerText) - parseInt(b.cells[2].innerText); // puntuacion mas baja
    } //parseint convierte el puntaje de texto a numero para poder compararlo

    // ordenar filas
    filas.sort(ordenarPor);
    
    // agregar las filas ordenadas a la tabla
    filas.forEach(fila => tabla.tBodies[0].appendChild(fila));
}

document.getElementById("ordenar").addEventListener("change", (event) => {
    ordenarTabla(event.target.value);
});

// inicio desde intentos
document.getElementById("volver-inicio-btn").addEventListener("click", () => {
    const secciones = document.querySelectorAll("main > section");
    secciones.forEach(seccion => {
        seccion.style.display = "none";
    });

    document.getElementById("inicio").style.display = "block";
});

// volver atras desde intentos
const volverResultadosBtn = document.getElementById("volver-resultados-btn");
if (volverResultadosBtn) {
    volverResultadosBtn.addEventListener("click", () => {
        document.getElementById("resultados").style.display = "block";
        document.getElementById("seccion-intentos").style.display = "none";
    });
}

