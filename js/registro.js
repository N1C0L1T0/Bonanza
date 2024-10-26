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

// -----------------------------------------------------------VALIDACIÓN DE FORMULARIO DE REGISTRO----------------------------------------------------//

function validarCampo(campo) {

    errores = []
    const num = /^[0-9]+$/;

    let valNombre = document.getElementById('nombre');
    let nombreValue = valNombre.value.trim();
    const uu = /^[a-zA-ZÀ-ÿ ]+$/;

    let apelllido1 = document.getElementById("apellido");
    let apellidoVal = apelllido1.value.trim();
    let valApellido = /^[a-zA-ZÀ-ÿ ]+$/; // Expresión regular para una sola palabra con letras

    let tipoDocumento1 = document.getElementById("tipoDocumento");
    let tipoDocumentoVal = tipoDocumento1.value;

    let numeroDoc1 = document.getElementById("documento")
    let numeroDocVal = numeroDoc1.value.trim()

    let departamento = document.getElementById("departamentos").value;
    let municipio = document.getElementById("municipios").value;
    
    let numero1 = document.getElementById("telefono")
    let numeroVal = numero1.value.trim()

    let valCorreo = document.getElementById("correo");
    let correoValue = valCorreo.value.trim();    
    let valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let password = document.getElementById("password");
    let passwordVal = password.value.trim(); // Añadido trim() para eliminar espacios

    let password1 = document.getElementById("copassword");
    let passwordVal2 = password1.value.trim(); // Añadido trim() para eliminar espacios

    //Validad nombre
    if(campo === 'nombre'){
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
    }

    //Validad apellido
    if(campo === 'apellido') {
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
    }

    //Validar tipo de documento
    if(campo === 'tipoDocumento'){
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
    }


    // Valida numero de documento 
    if(campo === 'documento') {
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
    }

    //Validar departamento
    if(campo === 'departamentos'){
        if (departamento === "") {
            let mensajeError = document.getElementById("error-Depar");
            mensajeError.innerHTML = "Por favor, Seleccione una opción";
            mensajeError.style.color = "red";
            errores.push("error-Depar"); // Agrega el error a la lista
        } else {
            // Limpiar mensaje de error si el apellido es válido
            let mensajeError = document.getElementById("error-Depar");
            mensajeError.innerHTML = "";
        }
    }

    //Validar municipio
    if(campo === 'municipios'){
        if (municipio === "") {
            let mensajeError = document.getElementById("error-Muni");
            mensajeError.innerHTML = "Por favor, Seleccione una opción";
            mensajeError.style.color = "red";
            errores.push("error-Muni"); // Agrega el error a la lista
        } else {
            // Limpiar mensaje de error si el apellido es válido
            let mensajeError = document.getElementById("error-Muni");
            mensajeError.innerHTML = "";
        }
    }

    // Valida numero de telefono
    if (campo === 'telefono') {
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
    }
    
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

    // Validación de la confirmacion de la contraseña
    if (campo === 'copassword') {
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
    }

    
    return { errores: errores.length };

};

// Función para validar todo el formulario
function validarFormulario() {
    let resultado = validarCampo();

    // Retornar true solo si hay cero errores
    if (resultado.errores === 0) {

        // Crear un objeto "diccionario" con los valores del formulario
        var dicc_datos = {
            Nombre: resultado.nombreValue,
            Apellido: resultado.apellidoVal,
            TipoDeDocumento: resultado.tipoDocumentoVal,
            NumeroDeDocumento: resultado.numeroDocVal,
            Telefono: resultado.numeroVal,
            Departamento: resultado.departamento,
            Municipio: resultado.municipio,
            Correo: resultado.valEmail,
            Contraseña: resultado.passwordVal,
            Contraseña2: resultado.passwordVal2
        };

        // se envia la información a la BD por una petición fech
        registrarPost(dicc_datos);

        return true
    } else {
        errores.length = 0;
        return false
    }
    
};

// Manejo del botón "submit"
$("#submit-button").click(function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón de enviar

    const isValid = validarFormulario(); // Llamar a la función que valida todo el formulario
    let errores1 = validarCampo().errores;

    if (isValid) {
        // Si la validación es exitosa, enviar el formulario
        console.log("Formulario válido. Enviando...");
        //document.getElementById("sign_in_1").submit(); // Enviar el formulario
    } else {
        // Si hay errores, manejar la situación (ya se muestran mensajes de error en la validación)
        console.log(errores1);
        console.log("Errores en la validación");
    }
});

// -----------------------------------------------------------ENVIO USANDO LA API REST----------------------------------------------------//

function registrarPost(dicc_datos) {

    let ladata = new FormData();
    ladata.append("password", dicc_datos.Contraseña);
    ladata.append("password2", dicc_datos.Contraseña2);
    ladata.append("nombre", dicc_datos.Nombre);
    ladata.append("apellido", dicc_datos.Apellido);
    ladata.append("tipo_documento", dicc_datos.TipoDeDocumento);
    ladata.append("numero_documento", dicc_datos.NumeroDeDocumento);
    ladata.append("telefono", dicc_datos.Telefono);
    ladata.append("departamento", dicc_datos.Departamento);
    ladata.append("municipio", dicc_datos.Municipio);
    ladata.append("username", dicc_datos.Correo);
    ladata.append("email", dicc_datos.Correo);

    console.log('Datos enviados:', ladata); // Muestra los datos que se envían

    /*
        fetch('https://bonanza.gesicom.co/api-auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(ladata)
        })
        .then(response => {
            console.log('Status:', response.status); // Muestra el código de estado de la respuesta
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
        })
        .then(data => console.log('Respuesta de la API:', data)) // Muestra la respuesta de la API
        .catch(error => console.error('Error:', error));
    */
}

