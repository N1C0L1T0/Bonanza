
// Sección de registro
let municipiosPorDepartamento = {};

// Función para cargar los datos del archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch('../Assets/json/colombia.json'); // Ruta al archivo JSON
        const data = await response.json();

        // Convertir el array de objetos en un objeto que tenga el nombre del departamento como clave
        data.forEach(indexdepartamento => {
            municipiosPorDepartamento[indexdepartamento.departamento.toLowerCase()] = indexdepartamento.ciudades;
        });

        console.log('Datos cargados:', municipiosPorDepartamento); // Ver datos en la consola
        cargarDepartamentos();
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Función para cargar los departamentos en el <select>
function cargarDepartamentos() {
    const departamentosSelect = document.getElementById("departamentos");

    // Llenamos el <select> con los departamentos
    for (const departamento in municipiosPorDepartamento) {
        const option = document.createElement("option");
        option.value = departamento;
        option.textContent = departamento.charAt(0).toUpperCase() + departamento.slice(1);
        departamentosSelect.appendChild(option);
    }
}

// Función para mostrar los municipios cuando se selecciona un departamento
function mostrarMunicipios() {
    const departamentoSeleccionado = document.getElementById("departamentos").value;
    const municipiosSelect = document.getElementById("municipios");

    // Limpiamos las opciones actuales
    municipiosSelect.innerHTML = "";

    // Obtenemos los municipios correspondientes al departamento seleccionado
    const municipios = municipiosPorDepartamento[departamentoSeleccionado];

    if (municipios) {
        // Agregamos los municipios al <select> de municipios
        municipios.forEach(municipio => {
            const option = document.createElement("option");
            option.value = municipio.toLowerCase();
            option.textContent = municipio;
            municipiosSelect.appendChild(option);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('user[password]');
    const togglePasswordButton = document.getElementById('togglePassword');

    togglePasswordButton.addEventListener('click', function () {
        // Alternar el tipo del campo entre password y text
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;

        // Cambiar el texto del botón según el estado del campo
        togglePasswordButton.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('user[Copassword]');
    const togglePasswordButton = document.getElementById('togglePassword');

    togglePasswordButton.addEventListener('click', function () {
        // Alternar el tipo del campo entre password y text
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;

        // Cambiar el texto del botón según el estado del campo
        togglePasswordButton.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    });
});

// Cargamos los datos al cargar la página
window.onload = cargarDatos;



// Sección deporque prefernios
function changeImage(imageUrl) {
    const imageElement = document.getElementById('display-image');

    setTimeout(() => {
        imageElement.src = imageUrl; // Cambia la imagen
    },); // Ajusta el tiempo para sincronizar con la transición
}

// Para que desaparezca los titulos de los cursos
    // Asignamos la función de clic a cada enlace
    document.querySelectorAll('.slidebar__content__enlance').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();  // Evita la acción por defecto del enlace

            // Obtenemos el atributo data-info del enlace clicado
            var infoId = link.getAttribute('data-info');

            // Ocultamos todos los contenedores de información
            document.querySelectorAll('.info-container').forEach(function(container) {
                container.classList.add('hidden');
                container.classList.remove('visible');
            });

            // Mostramos solo el contenedor correspondiente al enlace clicado
            var selectedContainer = document.getElementById(infoId);
            if (selectedContainer) {
                selectedContainer.classList.remove('hidden');
                selectedContainer.classList.add('visible');
            }

            document.querySelectorAll('.slidebar__content2').forEach(function(responsive) {
                responsive.classList.remove('col-lg-4');
                responsive.classList.add('col-lg-1');
            });

            // Ocultamos solo los títulos (texto) al hacer clic, pero las bolitas permanecen visibles
            document.querySelectorAll('.slidebar__content__enlance .information').forEach(function(info) {
                info.classList.add('hidden');
            });

            // Resetear el color de todas las bolitas (quitar la clase 'selected')
            document.querySelectorAll('.icon').forEach(function(icon) {
                icon.classList.remove('selected');
            });

            // Cambiar el color de la bolita clicada (añadir la clase 'selected')
            link.querySelector('.icon').classList.add('selected');
        });
    });
