// Este script se ejecuta en segundo plano.
// Por ahora, su función principal será la de un "hub" para el almacenamiento.

// Opcional: Puedes añadir listeners para el ciclo de vida del Service Worker
// o para mensajes entre el popup y los content scripts si la lógica se vuelve más compleja.

// Por ejemplo, si quisieras que el background script maneje directamente la API de cookies
// (chrome.cookies), lo harías aquí. Pero para tu caso de uso, el "scripting.executeScript"
// directamente en las páginas es más directo.

console.log("Service Worker de Transferencia de Cookies iniciado.");