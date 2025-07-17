---
# Transferencia de Cookies de Entornos de Desarrollo

---

## 🚀 Visión General

Esta extensión de navegador (para Chrome y otros Chromium) agiliza tu flujo de trabajo de desarrollo, permitiéndote **extraer cookies de una sesión de Ingress y aplicarlas en tu entorno local (`localhost:3000`)**.

Olvídate de copiar y pegar cookies manualmente; esta herramienta es ideal para proyectos Next.js y otras aplicaciones que usan cookies para autenticación o estado de sesión entre dominios.

## ✨ Características

* **Extrae todas las cookies** de la pestaña activa en tu entorno de Ingress.
* **Aplica las cookies guardadas** en tu entorno de desarrollo local (`localhost:3000`).
* **Operación simple de un clic** desde el popup de la extensión.
* **Segura para uso interno**, con permisos restringidos a tus dominios de desarrollo.

## 🛠️ Requisitos

* Navegador basado en Chromium (Chrome, Edge, Brave, etc.).
* Los archivos de esta extensión.

## ⚙️ Configuración (¡Importante!)

Esta extensión funciona **localmente** y necesita que configures los dominios de tu Ingress.

1.  **Cloná o descargá** este repositorio en tu máquina:
    ```bash
    git clone [https://github.com/tu-usuario/nombre-del-repo.git](https://github.com/tu-usuario/nombre-del-repo.git)
    cd nombre-del-repo
    ```
2.  **Creá tu archivo de configuración de dominios:**
    * Copiá el archivo `urls.template.txt` a un nuevo archivo llamado **`.urls.txt`** en la raíz del proyecto.
        ```bash
        cp .urls.template.txt .urls.txt
        ```
3.  **Editá el archivo `.urls.txt`** y listá los dominios completos de tus entornos de Ingress donde necesitarás extraer cookies. **Cada dominio debe estar entre comillas dobles y con una coma al final, excepto el último, siguiendo el formato JSON.**

    * **Ejemplo de `.urls.txt`:**
        ```
        "[https://mi.dominio.dev.com/](https://mi.dominio.dev.com/)*",
        "[https://otro.qa.dominio.org/](https://otro.qa.dominio.org/)*",
        "http://localhost:8080/*"
        ```
    * **Asegurate de incluir el protocolo** (`http://` o `https://`) y el `/*` al final para cubrir todas las rutas.
4.  **Abrí el archivo `manifest.json`** en la raíz del proyecto.
5.  **Copiá el contenido de tu `.urls.txt`** y pegalo dentro del array `"host_permissions"` en `manifest.json`.

    * La sección `"host_permissions"` en tu `manifest.json` debería lucir similar a esto, **siempre incluyendo `http://localhost:3000/*`**:
        ```json
        "host_permissions": [
          "http://localhost:3000/*",
          "[https://mi.dominio.dev.com/](https://mi.dominio.dev.com/)*",   // <-- Desde tu .urls.txt
          "[https://otro.qa.dominio.org/](https://otro.qa.dominio.org/)*",  // <-- Desde tu .urls.txt
          "http://localhost:8080/*"         // <-- Desde tu .urls.txt
          // ... y cualquier otro dominio que hayas listado
        ],
        ```
6.  **Guardá** los cambios en `manifest.json`.

## 🚀 Instalación y Uso

1.  **Abrí tu navegador** (Chrome, Edge, etc.).
2.  Navegá a la página de extensiones. Podés escribir `chrome://extensions` en la barra de direcciones o ir a `Menú (tres puntos) > Más herramientas > Extensiones`.
3.  En la esquina superior derecha, **activá el "Modo de desarrollador"** (Developer mode).
4.  Hacé clic en **"Cargar extensión descomprimida" (Load unpacked)**.
5.  Seleccioná la carpeta raíz de la extensión (`nombre-del-repo`), que contiene el `manifest.json`.
6.  La extensión "Transferencia de Cookies" aparecerá en tu lista. Su ícono aparecerá en la barra de herramientas. **Después de modificar el `manifest.json`, es crucial hacer clic en el botón de "Actualizar" (Refresh) de la extensión en `chrome://extensions` para que los nuevos permisos de dominio surtan efecto.**

### Cómo usarla:

1.  **Para Extraer Cookies:**
    * Abrí una pestaña y navegá a tu **entorno de Ingress de desarrollo** (ej., `https://dev.miempresa.com/productos`).
    * Asegurate de haber iniciado sesión y tener las cookies necesarias.
    * Hacé clic en el ícono de la extensión en la barra de herramientas.
    * Hacé clic en **"Extraer Cookies"**. Verás un mensaje de confirmación en el popup.
2.  **Para Aplicar Cookies:**
    * Abrí una pestaña y navegá a tu **entorno de desarrollo local** (ej., `http://localhost:3000`).
    * Hacé clic en el ícono de la extensión.
    * Hacé clic en **"Aplicar Cookies"**.
    * La página se recargará, y las cookies extraídas se habrán aplicado a tu sesión local.

## 🤝 Contribuciones

Si tenés mejoras o sugerencias, ¡son bienvenidas! Abrí un `issue` o enviá un `pull request`.

## 📜 Licencia

[Aquí podrías añadir el tipo de licencia si tuvieras una, ej. MIT License]# cookie-transfer-extension
