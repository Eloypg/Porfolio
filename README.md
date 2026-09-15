# Eloy Pardo — Portafolio

Portafolio personal de Eloy Pardo, desarrollador backend. Sitio estático de una sola página construido con HTML, CSS y JavaScript puro (sin frameworks ni dependencias de build).

## Demo

Publicado con GitHub Pages: _(añade aquí la URL una vez publicado)_

## CI/CD

Cada push a `main` (incluidos los merges de otras ramas) dispara el workflow `.github/workflows/ci-cd.yml`:

1. **Validación** (`validate`): valida el HTML (`html-validate`) y comprueba que no haya enlaces rotos (`linkinator`), tanto en `push` como en `pull_request` hacia `main`.
2. **Despliegue** (`deploy`): si la validación pasa, publica el sitio automáticamente en GitHub Pages. No requiere aprobación manual.

Para que el despliegue funcione hay que activarlo una vez en `Settings > Pages > Build and deployment > Source`, seleccionando **GitHub Actions**.

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
