# Plan · Cimientos de la presentación

> Para la spec `01-spec.md`. **Requiere aprobación humana antes de implementar.**

## Enfoque técnico

Tres archivos, HTML/CSS/JS puro, sin build. Construimos el motor genérico una sola vez
y lo dejamos listo para que cada sección solo agregue `.slide` dentro de su `.panel`.

### `src/index.html`
- `<head>`: charset/viewport, `<title>`, favicons (`../assets/…`), preconnect + `<link>`
  a Google Fonts (Inter, JetBrains Mono, Space Grotesk), `css/styles.css`.
- `<header>`: logo GIGA (`../assets/Logo-GIGA-IT_2024-interno-color.svg`) + `#mainTabs`
  con los seis `.mtab[data-topic]` (etiquetas cortas).
- `<main id="stage">`: los seis `<section class="panel" data-topic>`, cada uno con **una**
  `<div class="slide cover" data-title="Portada">` que contiene el índice (`.cover-index`)
  y el título (`.cover-title`, con `<span class="accent">Claude</span>` en el tema 00).
- Barra inferior de navegación: `#subTabs` (vacío, lo llena el JS), `#prevBtn`,
  `#nextBtn`, `#dots`.
- `<script src="js/main.js" defer>`.

### `src/css/styles.css`
- `:root`: `--brand:#25c6a0`, `--ink:#001622`, `--bg:#fff`, grises/bordes derivados
  (rgba de `--ink`), fuentes (`--font-title/-body/-mono`), espaciados y radios.
- Reset ligero + `body { height:100vh; overflow:hidden; display:flex; flex-direction:column }`.
- Header, `.mtab` (activa con acento), `#stage` flex-1, `.panel` (oculto salvo activo),
  `.slide` (oculto salvo activo, centrado), `.slide.cover` (fondo `--ink`, texto claro,
  `.cover-index` monospace, `.cover-title` Space Grotesk grande, `.accent` verde).
- Barra inferior: `#subTabs` (chips), botones prev/next, `#dots`.
- `.pipe` completo (steps, tabs, stage, panels, `.active`, `.run`) respetando
  `prefers-reduced-motion`.
- Todo con variables; nada de hex sueltos fuera de `:root`.

### `src/js/main.js` (motor genérico, IIFE o módulo)
- **Recolección**: leer paneles y construir la lista global de slides en orden de DOM,
  guardando `{topic, slideEl, title, indexInTopic, globalIndex}`.
- **Estado**: `current` (globalIndex). `render()` aplica `.active` al panel y slide
  correctos, regenera `#subTabs` desde los `data-title` del tema activo, marca la
  subpestaña y la `.mtab` activas, actualiza `#dots` y el hash.
- **Navegación**: `goTo(i)`, `next()`, `prev()` (clamp a los límites). Click en `.mtab`
  → primer slide de ese tema. Click en subpestaña → ese slide. Click en dots → ese slide.
- **Teclado**: `keydown` global; ←/PageUp/Backspace → prev, →/Space/PageDown → next;
  ignorar si `document.activeElement` es input/textarea/contenteditable.
- **Deep-linking**: hash `#topic/slug` (slug = `data-title` normalizado a kebab sin
  acentos). `replaceState` en cada `render()`. Al cargar y en `hashchange`, resolver el
  hash al globalIndex correspondiente (fallback: primer slide).
- **`.pipe` stepper genérico**: delegación de eventos sobre `.pipe-tab[data-step]`;
  activa el `.pipe-panel` correspondiente y reinicia animación (`.run`). Independiente
  del deep-linking (el paso interno no va al hash).

## Archivos afectados
- **Nuevos**: `src/index.html`, `src/css/styles.css`, `src/js/main.js`.
- Sin tocar `assets/`, referencias ni configuración.

## Riesgos y mitigaciones
- **Normalización de slugs** (acentos, mayúsculas) inconsistente entre HTML y JS →
  una única función `slugify` compartida; los `data-title` no llevan caracteres raros.
- **No-scroll en portadas** → probar a 1280×720 y 1366×768; título con `clamp()`.
- **Colisión de `data-topic` duplicados** → validar en consola (warn) si un `.mtab` no
  encuentra su `.panel`.
- **`.pipe` sin uso aún** → se prueba con un bloque temporal que NO se commitea (criterio 9).

## Estrategia de validación
- `/verify`: servir desde la raíz (`python -m http.server 8000` → `/src/`) y recorrer:
  seis pestañas, subpestañas autogeneradas, teclado, deep-link abriendo un `#tema/slide`,
  ausencia de scroll, logo y fuentes cargadas.
- `@content-auditor`: confirmar que las seis portadas y sus títulos coinciden con
  `03-content.md` y que no hay contenido interno de más.
- `@design-reviewer`: revisar jerarquía de portada, contraste, uso de marca y motion.

## Skills que guían el diseño
- `frontend-design` para el look de las portadas y la barra de navegación.
- `ui-ux-pro-max` para paleta/tipografía derivadas del logo y el motion del `.pipe`.
- `web-design-guidelines` para auditar accesibilidad (foco, contraste, teclado) antes
  de dar el esqueleto por hecho.
> Recordatorio de invariante: estas tres skills deben estar instaladas y cargadas
> **antes de ejecutar cualquier task** (bloqueante en `CLAUDE.md`).
