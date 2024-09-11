function changeImage(imageUrl) {
    const imageElement = document.getElementById('display-image');

    setTimeout(() => {
        imageElement.src = imageUrl; // Cambia la imagen
    },); // Ajusta el tiempo para sincronizar con la transición
}
