# Notas de implementación y validación · Cimientos

> Conclusiones del ciclo (separadas del qué/por qué de `01-spec.md`).

## Qué se entregó
- `src/index.html` — header (logo GIGA + 6 `.mtab`), 6 `.panel[data-topic]` con una
  `.slide cover` cada uno (índice 00–05 + título real, "Claude" en verde), barra
  inferior (`#subTabs`, `#prevBtn`, `#nextBtn`, `#dots`).
- `src/css/styles.css` — tokens `:root`, no-scroll, portadas oscuras, header/footer,
  subpestañas, dots, `.pipe` genérico, base reusable (`.slide-head`, `.lead`).
- `src/js/main.js` — motor: lista global de slides (orden DOM), `render/goTo/next/prev`,
  subpestañas autogeneradas desde `data-title`, teclado, deep-linking `#tema/slug` con
  `replaceState`, stepper `.pipe` por delegación.

## Validación
- **Sintaxis JS**: `node --check src/js/main.js` → OK.
- **Recursos servidos** (`python -m http.server` desde raíz): `index`, `css`, `js` y el
  logo SVG responden `200`.
- **@content-auditor**: esqueleto 100% conforme a `03-content.md` y a la spec. 6 paneles
  en orden exacto, 6 portadas con título e índice correctos, "Claude" en verde, sin
  contenido interno de más, `.mtab` 1:1 con paneles. Único matiz (BAJA): título
  "Prerequisitos" es decisión documentada, no defecto.
- **@design-reviewer**: motor sólido; señaló issues de contraste AA en la base reusable.

## Cambios aplicados tras la revisión de diseño
| # | Sev | Hallazgo | Fix |
|---|-----|----------|-----|
| 1 | ALTA | `--brand` como texto sobre blanco ≈2.2:1 (`.kicker`) | Nuevo token `--brand-ink #0c7a60` (≈5.4:1) para texto verde sobre blanco; `--brand` puro queda para trazos/fondos/sobre oscuro |
| 2 | ALTA | `.mtab`/`.subtab` inactivos con `--ink-55` ≈4.1:1 | Subidos a `--ink-70` |
| 3 | ALTA | Logo (enlace) sin `:focus-visible` | Añadido `.brand:focus-visible` |
| 4 | MEDIA | Padding header/footer (32px) vs slide (64px) desalineado | Header/footer a `--sp-8`; móvil unificado a `--sp-5` |
| 5 | MEDIA | `.main-tabs` mezcla `flex-wrap` + `overflow-x` | Quitado `flex-wrap`; solo `overflow-x` |
| 6 | MEDIA | `<br>` manual en portada 00 forzaba líneas extra | Quitado el `<br>`; `max-width` a `18ch` controla el wrap |
| 7 | BAJA | `#fff` hardcodeado en `.cover-title` | Token `--paper #ffffff` |
| 8 | BAJA | `transform` de `.dot.active` fuera de reduced-motion | Añadido bloque `@media (prefers-reduced-motion: reduce)` |

## Pendiente de verificación manual (recomendado con `/verify` en navegador)
- Recorrido visual de las 6 portadas, subpestañas autogeneradas, teclado y deep-link
  (abrir `#workflow/portada` y caer ahí).
- Confirmar **no-scroll** a 1280×720 y 1366×768 con el título largo del tema 00 ya sin `<br>`.
- **AC9 (`.pipe`)**: estilo + stepper JS presentes y con sintaxis válida; falta la prueba
  visual con un `.pipe` temporal en navegador (T13) — no se dejó ningún `.pipe` commiteado.

## Estado
Cimientos **completos** y conformes. Invariante "cimientos primero" satisfecha: se puede
proceder a especificar la primera sección (`inicio`) en una próxima corrida de `/sdd`.
