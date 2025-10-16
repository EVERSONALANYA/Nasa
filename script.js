// JavaScript source code
// ** Importante: Reemplaza "TU_API_KEY_AQUI" con tu clave real de la NASA **
const API_KEY = "mDuHBUn1qZ7TQdpFXRdGMZD1KHvkz7laNhu8Pl8e"; 
const MEDIA_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

const mediaContent = document.getElementById('media-content');
const titleElement = document.getElementById('apod-title');
const dateElement = document.getElementById('apod-date');
const explanationElement = document.getElementById('apod-explanation');

// 1. Funci�n para realizar la petici�n a la API de la NASA
async function getAPOD() {
    mediaContent.innerHTML = '<p class="loading-message">Cargando datos de la NASA...</p>';
    titleElement.textContent = '';
    explanationElement.textContent = '';

    try {
        // Petici�n a la API usando 'fetch'
        const response = await fetch(MEDIA_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Convierte la respuesta a formato JSON
        const data = await response.json();

        // Muestra los datos en la interfaz
        displayAPOD(data);

    } catch (error) {
        console.error("Hubo un problema: ", error);
        mediaContent.innerHTML = '<p class="error">Error al conectar con la NASA. Revisa tu API Key y conexi�n.</p>';
    }
}

// 2. Funci�n para mostrar los resultados
function displayAPOD(data) {
    titleElement.textContent = data.title;
    dateElement.textContent = `Fecha: ${data.date}`;
    explanationElement.textContent = data.explanation;

    // L�gica para manejar si es IMAGEN o VIDEO
    if (data.media_type === 'image') {
        renderImage(data.url, data.title);
    } else if (data.media_type === 'video') {
        renderVideo(data.url);
    } else {
        mediaContent.innerHTML = '<p class="error">Tipo de contenido no soportado.</p>';
    }
}

// 3. Funci�n para renderizar una IMAGEN
function renderImage(url, title) {
    mediaContent.innerHTML = `<img src="${url}" alt="${title}">`;
}

// 4. Funci�n para renderizar un VIDEO (Generalmente YouTube)
function renderVideo(url) {
    // La URL de la NASA a menudo requiere ser modificada para incrustar el video.
    // Usamos una Expresi�n Regular para asegurar que el URL sea incrustable.
    const embedUrl = url.replace("watch?v=", "embed/");
    
    mediaContent.innerHTML = `
        <iframe 
            width="100%" 
            height="400" 
            src="${embedUrl}" 
            frameborder="0" 
            allowfullscreen>
        </iframe>
    `;
}

// No llamamos a la funci�n en window.onload, dejamos que el usuario presione el bot�n.