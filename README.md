# Eloy Pardo — Portafolio

Portafolio personal de Eloy Pardo, desarrollador backend. Sitio estático de una sola página construido con HTML, CSS y JavaScript puro (sin frameworks ni dependencias de build).

## Demo

Publicado con GitHub Pages: _(añade aquí la URL una vez publicado)_

## Características

- Diseño de una sola página con scroll por secciones: Hero, Sobre mí, Trayectoria, Idiomas & Soft Skills, Stack tecnológico, Proyectos y Contacto.
- Modo claro / oscuro con detección de preferencia del sistema y persistencia en `localStorage`.
- Animaciones de entrada por sección mediante `IntersectionObserver`.
- Ficha de proyecto ampliable con detalle a pantalla completa.
- Totalmente responsive.

## Estructura del proyecto

```
.
├── index.html              # Documento principal
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos
│   ├── js/
│   │   └── script.js       # Interactividad (tema, scroll reveal, detalle de proyectos)
│   ├── img/                # Imágenes (foto, insignias, portadas de proyecto)
│   └── docs/                # Documentos descargables (p. ej. presentaciones de proyectos)
└── README.md
```

## Ejecución en local

Al no depender de ninguna build tool, basta con abrir `index.html` en el navegador o servirlo con un servidor estático:

```bash
python3 -m http.server 8000
```

Y visitar `http://localhost:8000`.

## Tecnologías

HTML5 · CSS3 (custom properties, clip-path, grid/flexbox) · JavaScript (vanilla)

## Contacto

- Email: pardogurreaeloy@gmail.com
- LinkedIn: [linkedin.com/in/eloypardogurrea](https://www.linkedin.com/in/eloypardogurrea)
- GitHub: [github.com/Eloypg](https://github.com/Eloypg)
