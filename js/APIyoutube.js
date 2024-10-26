// Función para obtener datos del video y actualizar la card correspondiente
async function getVideoData(videoId, cardNumber) {
    const apiKey = ''; // Reemplaza con tu API Key
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items.length > 0) {
            const video = data.items[0];
            const stats = video.statistics;
            const snippet = video.snippet;

            const title = snippet.title;
            const views = stats.viewCount;
            const likes = stats.likeCount;
            const description = snippet.description;

            // Actualizar el HTML de la card específica
            document.getElementById(`video-title-${cardNumber}`).innerText = title;
            document.getElementById(`views-${cardNumber}`).innerText = views;
            document.getElementById(`likes-${cardNumber}`).innerText = likes;
            document.getElementById(`description-${cardNumber}`).innerText = description;

            // Guardar la URL del video en el atributo data-video-url del botón
            document.getElementById(`original-video-button-${cardNumber}`).setAttribute('data-video-url', `https://www.youtube.com/watch?v=${videoId}`);
        } else {
            console.error("No video found with this ID:", videoId);
        }
    } catch (error) {
        console.error('Error fetching YouTube video data:', error);
    }
}

// Funcion para actualizar el video de acuerdo a una lista de videos con su ID
function updateVideo(cardNumber, selectedVideos) {
    const videos = [
        'pEqA-xiDaEw',
        'nOIQkX0GMTU',
        'VG_xV2Vs70s',
        'lTbNt7ev2ls',
        '5AFtsvSNXnQ'
    ];

    // Filtrar videos ya seleccionados
    const availableVideos = videos.filter(video => !selectedVideos.includes(video));

    // Seleccionar un video al azar de los disponibles
    if (availableVideos.length > 0) {
        const videoId = availableVideos[Math.floor(Math.random() * availableVideos.length)];
        document.getElementById(`youtube-video-${cardNumber}`).src = `https://www.youtube.com/embed/${videoId}`;

        // Obtener y mostrar las estadísticas del video
        getVideoData(videoId, cardNumber);
        return videoId; // Devolver el ID del video seleccionado
    } else {
        console.error("No hay videos disponibles para seleccionar.");
        return null; // No hay videos disponibles
    }
}

// Llamar a la función para cada card al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const selectedVideos = []; // Almacenar los IDs de videos seleccionados
    const lastUpdateKey = 'lastVideoUpdate'; // Clave para localStorage
    const lastUpdateTime = localStorage.getItem(lastUpdateKey);
    const currentTime = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

    // Verificar si han pasado 24 horas desde la última actualización
    if (lastUpdateTime || (currentTime - lastUpdateTime) > twentyFourHours) {
        // Actualiza la primera tarjeta
        const videoId1 = updateVideo(1, selectedVideos);
        if (videoId1) selectedVideos.push(videoId1); // Agregar video seleccionado a la lista

        // Actualiza la segunda tarjeta
        const videoId2 = updateVideo(2, selectedVideos);
        if (videoId2) selectedVideos.push(videoId2); // Agregar video seleccionado a la lista

        // Actualiza la hora de la última actualización en localStorage
        localStorage.setItem(lastUpdateKey, currentTime);
    } else {
        // Cargar videos existentes (opcional: puedes agregar lógica para mostrar los videos actuales)
        console.log("Los videos se mostrarán desde el almacenamiento local.");
    }

    // Agregar event listener a los botones para redirigir al video de YouTube
    document.getElementById('original-video-button-1').addEventListener('click', function () {
        const url = this.getAttribute('data-video-url');
        if (url) window.open(url, '_blank'); // Abre el video en una nueva pestaña
    });

    document.getElementById('original-video-button-2').addEventListener('click', function () {
        const url = this.getAttribute('data-video-url');
        if (url) window.open(url, '_blank'); // Abre el video en una nueva pestaña
    });
});
