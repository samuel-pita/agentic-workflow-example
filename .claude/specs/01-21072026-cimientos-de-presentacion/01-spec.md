# Spec · Cimientos de la presentación

> Carpeta: `.claude/specs/01-21072026-cimientos-de-presentacion/`
> Estado: **implementada y validada** — ver conclusiones en `04-notas-implementacion.md`.

## Qué se construye y por qué

El **esqueleto reutilizable** de la presentación: los tres archivos (`src/index.html`,
`src/css/styles.css`, `src/js/main.js`) con el **motor de navegación** funcionando y las
**portadas de las seis secciones** del temario, cada una con su título real visible y
**sin contenido interno**.

Es el cimiento bloqueante: por la invariante de `CLAUDE.md`, **ninguna sección** puede
especificarse, planearse ni implementarse hasta que este esqueleto exista y navegue.
El _qué_ de cada tema llegará después, una spec por sección.

## Alcance

### Dentro
- `src/index.html`: estructura base (header con logo GIGA, `#mainTabs`, `#subTabs`,
  `#stage`, controles `#prevBtn`/`#nextBtn`/`#dots`), `<head>` con Google Fonts
  (Inter · JetBrains Mono · Space Grotesk) y favicons.
- Los **seis `.panel[data-topic]`** en orden, cada uno con **una sola** `.slide cover`
  (la portada) mostrando el índice y el título real. Sin slides internos aún.
- Los **seis botones `.mtab[data-topic]`** en `#mainTabs`, en el mismo orden que los paneles.
- `src/css/styles.css`: tokens `:root` (colores de marca, tipografías, espaciados),
  reset/estilos base, regla no-scroll (`body { height:100vh; overflow:hidden }`),
  estilos del header, pestañas, subpestañas, portadas (`.slide.cover`, fondo oscuro),
  controles de navegación y `.pipe` (stepper genérico) para uso futuro.
- `src/js/main.js`: el motor —índice de slides, next/prev/goTo, subpestañas
  autogeneradas desde `data-title`, navegación por teclado, deep-linking por hash
  (`#tema/slide`) con `replaceState`, y el stepper `.pipe` genérico.

### Fuera
- El contenido interno de cualquier sección (agenda, tarjetas, tablas, diagramas,
  calculadoras, etc.). Eso es una spec por sección, después.
- Cualquier animación específica de un slide (`#netDiag`, `cap-map`, barras, etc.).

## Secciones y portadas (orden fijo)

Orden de pestañas: `inicio · intro · claude-code · workflow · prerequisitos · caso`.

| # | `data-topic` | Índice | Título de portada |
|---|---|---|---|
| 00 | `inicio` | 00 | **Inteligencia Artificial, enfocada en <span verde>Claude</span>** |
| 01 | `intro` | 01 | **Introducción a la IA** |
| 02 | `claude-code` | 02 | **Capacidades Agénticas** |
| 03 | `workflow` | 03 | **Workflow Loop** |
| 04 | `prerequisitos` | 04 | **Prerequisitos** |
| 05 | `caso` | 05 | **Caso de estudio** |

> Etiqueta corta de cada `.mtab` (visible en la pestaña de arriba): `Inicio`,
> `Introducción`, `Claude Code`, `Workflow`, `Prerequisitos`, `Caso`.
> La palabra "Claude" del título 00 va en verde (`--brand`).

## Criterios de aceptación (verificables)

1. **Archivos presentes.** Existen `src/index.html`, `src/css/styles.css` y
   `src/js/main.js`; el HTML enlaza el CSS (`css/styles.css`) y el JS (`js/main.js`) por
   ruta relativa, y los assets vía `../assets/…`.
2. **Seis pestañas en orden.** `#mainTabs` muestra seis `.mtab` en el orden
   `inicio · intro · claude-code · workflow · prerequisitos · caso`; cada `data-topic`
   coincide con el de su `.panel`.
3. **Seis portadas con título real.** Cada tema tiene exactamente una `.slide.cover`
   con su índice y su título tal cual la tabla; en `inicio`, "Claude" se renderiza en
   verde. No hay contenido interno adicional en ninguna portada.
4. **Subpestañas autogeneradas.** `#subTabs` se llena solo desde el `data-title` de los
   slides del tema activo (no escritas a mano). Con una sola portada por tema, cada tema
   muestra una subpestaña ("Portada" u homónima).
5. **Navegación libre.** Clic en cualquier `.mtab` cambia de tema y muestra su portada;
   clic en una subpestaña va a ese slide; `#prevBtn`/`#nextBtn` recorren la lista global
   de slides en orden de DOM.
6. **Teclado.** Flechas / espacio / AvPág / RePág avanzan y retroceden; se ignoran si el
   foco está en un `input`/`textarea`.
7. **Deep-linking.** Al navegar, el hash se actualiza a `#tema/slide` con `replaceState`;
   abrir la página con ese hash cae directo en ese slide.
8. **No scroll.** El `body` es `height:100vh; overflow:hidden`; ninguna portada
   desborda la pantalla en tamaños de escritorio comunes (≥1280×720).
9. **`.pipe` genérico presente.** El estilo y el JS del stepper `.pipe` existen y son
   funcionales aunque ninguna portada lo use todavía (verificable con un `.pipe` de
   prueba temporal, que no se commitea).
10. **Marca.** Colores y tipografías salen de variables `:root` derivadas del logo
    (`--brand #25c6a0`, `--ink #001622`, fondo blanco); no hay hex sueltos regados fuera
    de `:root`. El logo GIGA aparece en el header.

## Trazabilidad
- Formato y navegación: `00-brief.md`, `02-architecture.md`.
- Colores, tipografía, assets, clases base: `01-design-system.md`.
- Secciones, orden y títulos de portada: `03-content.md` (líneas 21, 25–246).

## Decisiones tomadas (defaults razonables, confirmables en la aprobación)
- **Portadas sin bajada.** Solo índice + título, como pide la invariante ("sin mayor
  información"). Las bajadas/subtítulos llegan con la spec de cada sección.
- **Título de `prerequisitos` = "Prerequisitos"** y de `inicio` = el título largo del
  tema 00 (el content no da un H1 explícito para la portada de prerequisitos).
- **`.pipe` incluido en cimientos** porque la invariante lista `.pipe` como parte del
  motor; se entrega estilizado y funcional aunque aún no se use.
