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
    const passwordField1 = document.getElementById('copassword'); // Selecciona el segundo campo de contraseña (confirmación de contraseña)
    const togglePasswordButton = document.getElementById('togglePassword2'); // Selecciona el botón para alternar visibilidad de este segundo campo

    // Reutilizamos los mismos íconos de ojo abierto y cerrado
    const eyeOpen2 = document.getElementById('eyeOpen1');
    const eyeClose2 = document.getElementById('eyeClose1');

    togglePasswordButton.addEventListener('click', function () {
        // Alternar el tipo del campo entre "password" y "text"
        const type = passwordField1.type === 'password' ? 'text' : 'password';
        passwordField1.type = type; // Cambia el tipo del campo según el estado actual

        // Alternar visibilidad de los íconos de ojo abierto y cerrado
        if (type === 'password') {
            eyeOpen2.style.display = 'inline'; // Mostrar el ícono de ojo abierto
            eyeClose2.style.display = 'none'; // Ocultar el ícono de ojo cerrado
        } else {
            eyeOpen2.style.display = 'none'; // Ocultar el ícono de ojo abierto
            eyeClose2.style.display = 'inline'; // Mostrar el ícono de ojo cerrado
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


// -----------------------------------------------------------VALIDACIÓN DE FORMULARIO DE INICIO DE SESIÓN----------------------------------------------------//
function validarCamposInicio(campo) {

    errores = []
    const num = /^[0-9]+$/;

    let valCorreo = document.getElementById("correo");
    let correoValue = valCorreo.value.trim();    
    let valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let password = document.getElementById("password");
    let passwordVal = password.value.trim(); // Añadido trim() para eliminar espacios

    // Validar email
    if(campo === 'correo') {
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
    }

    // Validación de la contraseña
    if(campo === 'password') {
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
    }

    return { errores: errores.length };

};

// Función para validar todo el formulario
function validarFormularioInicio() {
   let resultado = validarCamposInicio();

   return (resultado.errores === 0) ? true : false;
    
};

// Manejo del botón "submit"
$("#submit-button-inicio").click(function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón de enviar

    const isValid = validarFormularioInicio(); // Llamar a la función que valida todo el formulario
    let errores1 = validarCamposInicio().errores;

    if (isValid) {
        // Si la validación es exitosa, enviar el formulario
        console.log("Formulario válido. Enviando...");
        document.getElementById("login").submit(); // Enviar el formulario
    } else {
        // Si hay errores, manejar la situación (ya se muestran mensajes de error en la validación)
        console.log(errores1);
        console.log("Errores en la validación");
    }
});

// -----------------------------------------------------------VALIDACIÓN DE FORMULARIO DE RECUPERAR CUENTA----------------------------------------------------//
function validarCamposRecupera(campo) {

    errores = []
    const num = /^[0-9]+$/;

    let valCorreo = document.getElementById("correo");
    let correoValue = valCorreo.value.trim();    
    let valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // Validar email
    if(campo === 'correo') {
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
    }

    return { errores: errores.length };

};

// Función para validar todo el formulario
function validarFormularioRecupera() {
   let resultado = validarCamposRecupera();

   return (resultado.errores === 0) ? true : false;
    
};

// Manejo del botón "submit"
$("#submit-button-inicio").click(function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón de enviar

    const isValid = validarFormularioRecupera(); // Llamar a la función que valida todo el formulario
    let errores1 = validarCamposRecupera().errores;

    if (isValid) {
        // Si la validación es exitosa, enviar el formulario
        console.log("Formulario válido. Enviando...");
        document.getElementById("forgot_password_form").submit(); // Enviar el formulario
    } else {
        // Si hay errores, manejar la situación (ya se muestran mensajes de error en la validación)
        console.log(errores1);
        console.log("Errores en la validación");
    }
});


    
  