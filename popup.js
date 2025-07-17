document.addEventListener('DOMContentLoaded', () => {
    const extractButton = document.getElementById('extractCookies');
    const applyButton = document.getElementById('applyCookies');
    const statusDiv = document.getElementById('status');

    extractButton.addEventListener('click', async () => {
        statusDiv.textContent = 'Extrayendo cookies...';
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab || !tab.id) {
            statusDiv.textContent = 'Error: No se encontró la pestaña activa.';
            return;
        }

        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: extractCookiesFromPage
            });
            statusDiv.textContent = 'Cookies extraídas y guardadas.';
        } catch (error) {
            console.error("Error al extraer cookies:", error);
            statusDiv.textContent = `Error: ${error.message}`;
        }
    });

    applyButton.addEventListener('click', async () => {
        statusDiv.textContent = 'Aplicando cookies...';
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab || !tab.id) {
            statusDiv.textContent = 'Error: No se encontró la pestaña activa.';
            return;
        }

        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: applyCookiesToPage
            });
            statusDiv.textContent = 'Cookies aplicadas. Recargando...';
            // Opcional: Recargar la página después de aplicar las cookies
            // setTimeout(() => chrome.tabs.reload(tab.id), 1000);
        } catch (error) {
            console.error("Error al aplicar cookies:", error);
            statusDiv.textContent = `Error: ${error.message}`;
        }
    });
});

// Estas funciones serán inyectadas en la página web
// NO tienen acceso directo a las APIs de la extensión (chrome.*)
// Se comunicarán a través del mensaje o chrome.storage
function extractCookiesFromPage() {
    let cookies = document.cookie.split('; ').map(cookie => {
        let parts = cookie.split('=');
        return {
            name: decodeURIComponent(parts[0]),
            value: decodeURIComponent(parts.slice(1).join('='))
        };
    });
    // Guardamos las cookies en el storage de la extensión
    // para que el background script pueda acceder a ellas.
    chrome.storage.local.set({ storedCookies: cookies }, () => {
        if (chrome.runtime.lastError) {
            console.error("Error al guardar cookies:", chrome.runtime.lastError);
        } else {
            console.log("Cookies extraídas y guardadas localmente.");
        }
    });
}

function applyCookiesToPage() {
    chrome.storage.local.get(['storedCookies'], (result) => {
        const cookiesToSet = result.storedCookies;
        if (cookiesToSet && cookiesToSet.length > 0) {
            cookiesToSet.forEach(cookie => {
                // Asegúrate de que el 'path' sea adecuado. '/' es el más común.
                document.cookie = `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}; path=/;`;
            });
            console.log("Cookies aplicadas.");
            location.reload(); // Recarga la página para que las nuevas cookies surtan efecto
        } else {
            console.warn("No hay cookies guardadas para aplicar.");
        }
    });
}