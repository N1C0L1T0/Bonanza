// -----------------------------------------------------------LISTA DE DEPARTAMENTOS Y MUNICIPIOS----------------------------------------------------//

// Sección de registro
let municipiosPorDepartamento = {}; 
// Se crea un objeto vacío donde se almacenarán los municipios agrupados por departamento. 
// Las claves serán los nombres de los departamentos en minúsculas, y los valores serán arrays con los nombres de los municipios correspondientes.


// Función para cargar los datos del archivo JSON
async function cargarDatos() {
    try {
        // Se utiliza fetch para obtener un archivo JSON que contiene los datos de Colombia
        const response = await fetch('../Assets/json/colombia.json'); // Ruta al archivo JSON
        const data = await response.json(); // Se convierte la respuesta a formato JSON

        // Convertir el array de objetos en un objeto que tenga el nombre del departamento como clave
        // Se recorre el array de departamentos y se guarda cada departamento como clave en el objeto `municipiosPorDepartamento`
        // y su lista de municipios como el valor.
        data.forEach(indexdepartamento => {
            municipiosPorDepartamento[indexdepartamento.departamento.toLowerCase()] = indexdepartamento.ciudades;
        });

        console.log('Datos cargados:', municipiosPorDepartamento); 
        // Se muestra en la consola el objeto que contiene los departamentos y sus municipios para verificar que los datos han sido cargados correctamente

        cargarDepartamentos(); 
        // Se llama a la función `cargarDepartamentos()` que se encarga de llenar el select con los nombres de los departamentos.
    } catch (error) {
        // Si ocurre algún error durante la carga del archivo JSON, se captura y se muestra en la consola
        console.error('Error al cargar los datos:', error);
    }
}

// Función para cargar los departamentos en el <select>
function cargarDepartamentos() {
    const departamentosSelect = document.getElementById("departamentos"); 
    // Se selecciona el elemento <select> en el DOM donde se mostrarán los departamentos

    // Llenamos el <select> con los departamentos
    // Se recorre el objeto `municipiosPorDepartamento` para extraer los nombres de los departamentos
    for (const departamento in municipiosPorDepartamento) {
        const option = document.createElement("option"); 
        // Por cada departamento, se crea un nuevo elemento <option> 
        option.value = departamento; 
        // El valor de la opción será el nombre del departamento en minúsculas
        option.textContent = departamento.charAt(0).toUpperCase() + departamento.slice(1); 
        // Se formatea el texto para que la primera letra del departamento esté en mayúscula
        departamentosSelect.appendChild(option); 
        // Finalmente, se añade cada opción al <select> de departamentos
    }
}

// Función para mostrar los municipios cuando se selecciona un departamento
function mostrarMunicipios() {
    const departamentoSeleccionado = document.getElementById("departamentos").value; 
    // Se obtiene el valor del departamento seleccionado por el usuario en el <select> de departamentos
    const municipiosSelect = document.getElementById("municipios"); 
    // Se selecciona el <select> donde se van a mostrar los municipios

    // Limpiamos las opciones actuales
    municipiosSelect.innerHTML = ""; 
    // Se eliminan todas las opciones actuales del <select> de municipios, para que no se acumulen con cada nueva selección de departamento

    // Obtenemos los municipios correspondientes al departamento seleccionado
    const municipios = municipiosPorDepartamento[departamentoSeleccionado]; 
    // Se obtienen los municipios asociados al departamento seleccionado

    if (municipios) {
        // Si hay municipios disponibles para el departamento seleccionado
        // Agregamos los municipios al <select> de municipios
        municipios.forEach(municipio => {
            const option = document.createElement("option"); 
            // Por cada municipio, se crea un nuevo elemento <option>
            option.value = municipio.toLowerCase(); 
            // El valor de la opción será el nombre del municipio en minúsculas
            option.textContent = municipio; 
            // El texto que verá el usuario será el nombre del municipio
            municipiosSelect.appendChild(option); 
            // Se añade la opción al <select> de municipios
        });
    }
}

// Este evento se dispara cuando la ventana se ha cargado completamente
window.onload = cargarDatos;


// -----------------------------------------------------------MOSTRAR OCULTAR CONTRASEÑA"----------------------------------------------------//

// Este código está diseñado para alternar la visibilidad de la contraseña en dos campos diferentes 
// (uno con id "password" y otro con id "copassword") usando un botón con íconos de "ojo abierto" y "ojo cerrado".
// Además, carga datos (probablemente relacionados a departamentos y municipios) cuando se carga la página.

// El primer bloque se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('password'); 
    // Se selecciona el campo de contraseña con id 'password'
    const togglePasswordButton = document.getElementById('togglePassword'); 
    // Se selecciona el botón que alterna la visibilidad de la contraseña
    const eyeOpen1 = document.getElementById('eyeOpen'); 
    // Se selecciona el ícono de "ojo abierto" que indica que la contraseña está visible
    const eyeClose1 = document.getElementById('eyeClose'); 
    // Se selecciona el ícono de "ojo cerrado" que indica que la contraseña está oculta

    togglePasswordButton.addEventListener('click', function () {
        // Alternar el tipo del campo entre "password" y "text"
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type; // Cambia el tipo del campo según el estado actual

        // Alternar visibilidad de los íconos de ojo abierto y cerrado
        if (type === 'password') {
            eyeOpen1.style.display = 'inline'; // Mostrar el ícono de ojo abierto
            eyeClose1.style.display = 'none'; // Ocultar el ícono de ojo cerrado
        } else {
            eyeOpen1.style.display = 'none'; // Ocultar el ícono de ojo abierto
            eyeClose1.style.display = 'inline'; // Mostrar el ícono de ojo cerrado
        }
    });
});

// Sección 2: Alternar visibilidad de la contraseña en el segundo campo de contraseña
document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('copassword'); // Selecciona el segundo campo de contraseña (confirmación de contraseña)
    const togglePasswordButton = document.getElementById('togglePassword2'); // Selecciona el botón para alternar visibilidad de este segundo campo

    // Reutilizamos los mismos íconos de ojo abierto y cerrado
    const eyeOpen1 = document.getElementById('eyeOpen');
    const eyeClose1 = document.getElementById('eyeClose');

    togglePasswordButton.addEventListener('click', function () {
        // Alternar el tipo del campo entre "password" y "text"
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type; // Cambia el tipo del campo según el estado actual

        // Alternar visibilidad de los íconos de ojo abierto y cerrado
        if (type === 'password') {
            eyeOpen1.style.display = 'inline'; // Mostrar el ícono de ojo abierto
            eyeClose1.style.display = 'none'; // Ocultar el ícono de ojo cerrado
        } else {
            eyeOpen1.style.display = 'none'; // Ocultar el ícono de ojo abierto
            eyeClose1.style.display = 'inline'; // Mostrar el ícono de ojo cerrado
        }
    });
});



// -----------------------------------------------------------SECCIÓN DE "¿POR QUÉ PREFERIRNOS?"----------------------------------------------------//

// Función para cambiar la imagen mostrada en el contenedor principal
function changeImage(imageUrl) {
    const imageElement = document.getElementById('display-image'); // Selecciona el elemento de imagen donde se va a mostrar la nueva imagen

    setTimeout(() => {
        imageElement.src = imageUrl; // Cambia el atributo `src` de la imagen, actualizando la imagen mostrada
    },); // El temporizador podría ajustarse para sincronizar con una animación o transición (el valor de tiempo no está especificado aquí)
}

// Funcionalidad para manejar los enlaces en la barra lateral (slidebar) y la visualización de los títulos de cursos

// Asignamos un evento `click` a cada enlace dentro de la barra lateral con la clase `.slidebar__content__enlance`
document.querySelectorAll('.slidebar__content__enlance').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el enlace siga su acción predeterminada (redirigir a otra página)

        // Obtenemos el valor del atributo `data-info` del enlace clicado (es un identificador del contenedor de información que debe mostrarse)
        var infoId = link.getAttribute('data-info');

        // Ocultamos todos los contenedores de información visibles
        document.querySelectorAll('.info-container').forEach(function(container) {
            container.classList.add('hidden'); // Añade la clase `hidden` para ocultar el contenedor
            container.classList.remove('visible'); // Elimina la clase `visible` si está presente
        });

        // Mostramos solo el contenedor correspondiente al enlace clicado
        var selectedContainer = document.getElementById(infoId); // Seleccionamos el contenedor de información correspondiente al `data-info` del enlace
        if (selectedContainer) {
            selectedContainer.classList.remove('hidden'); // Quitamos la clase `hidden` para hacerlo visible
            selectedContainer.classList.add('visible'); // Añadimos la clase `visible` para mostrarlo
        }

        // Ajustamos el tamaño del contenido de la barra lateral para hacer más pequeña la sección (responsive)
        document.querySelectorAll('.slidebar__content2').forEach(function(responsive) {
            responsive.classList.remove('col-lg-4'); // Removemos la clase que define una columna más grande
            responsive.classList.add('col-lg-1'); // Añadimos una clase que hace la columna más pequeña (de 4 a 1 columnas en un grid layout)
        });

        // Ocultamos los títulos (textos) dentro de los enlaces de la barra lateral, pero las bolitas (iconos) permanecen visibles
        document.querySelectorAll('.slidebar__content__enlance .information').forEach(function(info) {
            info.classList.add('hidden'); // Añadimos la clase `hidden` para ocultar el texto asociado con las bolitas
        });

        // Reiniciamos el color de todas las bolitas (iconos), eliminando la clase `selected` que indica el ítem seleccionado
        document.querySelectorAll('.icon').forEach(function(icon) {
            icon.classList.remove('selected'); // Removemos la clase `selected` para quitar el color o estilo seleccionado de los iconos
        });

        // Cambiamos el color de la bolita clicada, añadiendo la clase `selected` al icono dentro del enlace que fue clicado
        link.querySelector('.icon').classList.add('selected'); // Añadimos la clase `selected` solo al ícono del enlace seleccionado
    });
});


// -----------------------------------------------------------VALIDACIÓN DE FORMULARIO DE REGISTRO----------------------------------------------------//

function validarCampo() {

    errores = []

    //Validad nombre
    let valNombre = document.getElementById('nombre');
    let nombreValue = valNombre.value.trim();
    const uu = /^[a-zA-ZÀ-ÿ ]+$/;

    if (!nombreValue.match(uu) || nombreValue === "") {
        let mensajeError = document.getElementById("error-nom");
        mensajeError.innerHTML = "Por favor, Ingrese un nombre valido";
        mensajeError.style.color = "red";
        errores.push("error-nom"); // El nombre no es válido
    } else {
        // Limpiar mensaje de error si el nombre es válido
        let mensajeError = document.getElementById("error-nom");
        mensajeError.innerHTML = "";
    }

    //Validad apellido
    let apelllido1 = document.getElementById("apellido");
    let apellidoVal = apelllido1.value.trim();
    let valApellido = /^[a-zA-ZÀ-ÿ ]+$/; // Expresión regular para una sola palabra con letras

    if (!valApellido.test(apellidoVal) || apellidoVal === "") {
        let mensajeError = document.getElementById("error-ape");
        mensajeError.innerHTML = "Por favor, Ingrese un apellido valido";
        mensajeError.style.color = "red";
        errores.push("error-ape"); // Agrega el error a la lista
    } else {
        // Limpiar mensaje de error si el apellido es válido
        let mensajeError = document.getElementById("error-ape");
        mensajeError.innerHTML = "";
    }

    //Validar tipo de documento
    let tipoDocumento1 = document.getElementById("tipoDocumento");
    let tipoDocumentoVal = tipoDocumento1.value;

    if (tipoDocumentoVal === "") {
        let mensajeError = document.getElementById("error-tipoD");
        mensajeError.innerHTML = "Por favor, Seleccione una opción valida";
        mensajeError.style.color = "red";
        errores.push("error-tipoD"); // Agrega el error a la lista
    } else {
        // Limpiar mensaje de error si el apellido es válido
        let mensajeError = document.getElementById("error-tipoD");
        mensajeError.innerHTML = "";
    }

    // Valida numero de documento 
    let numeroDoc1 = document.getElementById("documento")
    let numeroDocVal = numeroDoc1.value.trim()
    const num = /^[0-9]+$/;

    if (numeroDocVal === "" || !numeroDocVal.match(num)) {
        let mensajeError = document.getElementById("error-doc");
        mensajeError.innerHTML = "Por favor, Ingrese un numero de documento valido";
        mensajeError.style.color = "red";
        errores.push("error-doc"); // Agrega el error a la lista
    } else {
        // Limpiar mensaje de error si el apellido es válido
        let mensajeError = document.getElementById("error-doc");
        mensajeError.innerHTML = "";
    }

    // Valida numero de telefono 
    let numero1 = document.getElementById("telefono")
    let numeroVal = numero1.value.trim()

    if (numeroVal === "" || numeroVal.length !== 10) {
        let mensajeError = document.getElementById("error-tel");
        mensajeError.innerHTML = "Por favor, Ingrese un telefono valido";
        mensajeError.style.color = "red";
        errores.push("error-tel"); // Agrega el error a la lista
    } else {
        // Limpiar mensaje de error si el apellido es válido
        let mensajeError = document.getElementById("error-tel");
        mensajeError.innerHTML = "";
    }

    let valCorreo = document.getElementById("correo");
    let correoValue = valCorreo.value.trim();

    // Validar email
    let valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!valEmail.test(correoValue)) {
        let mensajeError = document.getElementById("error-correo");
        mensajeError.innerHTML = "Por favor, Ingrese un correo valido";
        mensajeError.style.color = "red";
        errores.push("error-correo"); // El correo no es válido
    } else {
        // Limpiar mensaje de error si el correo es válido
        let mensajeError = document.getElementById("error-correo");
        mensajeError.innerHTML = "";
    }

    // Validación de la contraseña
    let password = document.getElementById("password");
    let passwordVal = password.value.trim(); // Añadido trim() para eliminar espacios

    if (!passwordVal.match(num) || passwordVal === "") {
        let mensajeError = document.getElementById("error-pass");
        mensajeError.innerHTML = "La contraseña debe ser solo NUMEROS";
        mensajeError.style.color = "red";
        errores.push("error-pass"); // La contraseña no es válida
    } else {
        // Limpiar mensaje de error si la contraseña es válida
        let mensajeError = document.getElementById("error-pass");
        mensajeError.innerHTML = "";
    }

    // Validación de la confirmacion de la contraseña
    let password1 = document.getElementById("copassword");
    let passwordVal2 = password1.value.trim(); // Añadido trim() para eliminar espacios

    if (!passwordVal2.match(num) || passwordVal2 === "") {
        let mensajeError = document.getElementById("error-coPass"); // Usar "error-coPass" aquí también
        mensajeError.innerHTML = "Por favor, ingrese un valor válido";
        mensajeError.style.color = "red";
        errores.push("error-pass"); // La contraseña no es válida
    } else if (passwordVal2 !== passwordVal) {
        let mensajeError = document.getElementById("error-coPass"); // Mantener consistencia en el id "error-coPass"
        mensajeError.innerHTML = "Las contraseñas no coinciden";
        mensajeError.style.color = "red";
        errores.push("error-coPass"); // Las contraseñas no coinciden
    } else {
        // Limpiar mensaje de error si la contraseña es válida
        let mensajeError = document.getElementById("error-coPass"); // Asegurar que se usa el id correcto
        mensajeError.innerHTML = ""; // Limpia el mensaje de error
    }
    

    if(errores.length === 0){
        return true
    }else {
        return false
    }

};

// funcion para cuando de click en el paso tercero
$("#submit-button").click(function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón
    const isValid = validarCampo(); // Validar el formulario
    
    if (isValid) {
        // Si la validación es exitosa, enviar el formulario o realizar otra acción
        console.log("BIEN")
        document.getElementById("sign_in_1").submit(); // Para enviar el formulario
        
        // o puedes hacer otra acción, como mostrar un mensaje de éxito.
    } else {
        // Manejo de errores, ya se hace en la función de validación
        console.log("Errores en la validación");
    }
});