# Notas de diseño

La identidad es la de **GIGA IT** (grupo-giga.com). Nada muy elaborado, más bien
mantenerlo limpio y que se sienta de la marca. Colores y assets son **fijos** — son
la identidad, valen para cualquier presentación.

## Colores

Son los dos del logo, nada más:

- **Verde/teal** `#25c6a0` — es el acento. Foco, cosas activas, enlaces. No lo uses
  como relleno de todo, pierde fuerza.
- **Azul oscuro** `#001622` — el texto principal y el fondo de las portadas.

El fondo general es blanco. Todo lo demás (grises, bordes, tonos más claritos)
sácalo de esos dos + blanco/negro, con criterio. Métemelos como variables en `:root`
(tipo `--brand`, `--ink`) y usa las variables en todo el CSS, no hex sueltos regados.

## Tipografías

- Títulos: **Space Grotesk**.
- Texto normal: **Inter**.
- Código: **JetBrains Mono**.

Las jalo de Google Fonts en el `<head>` — esa es la única carga externa que quiero.

## Assets de marca

Ya están en `assets/`, no hace falta inventar nada:

- `Logo-GIGA-IT_2024-interno-color.svg` — el logo del header.
- `apple-touch-icon.png`, `favicon-192.png`, `favicon-32.webp` — los favicons.

Si en algún momento falta alguno, avísame — no me generes binarios ni inventes rutas.
Si un tema necesita **assets propios** (iconos, logos de lo que se explique), esos van
también en `assets/` pero se describen en la referencia de contenido, no aquí.

## Clases que ya existen (reúsalas antes de crear nuevas)

Estas son las piezas base, sirven para cualquier tema:

`.card`, `.grid.cols-2` / `.cols-3`, `.slide-head` (con `.kicker` + `h2`), `.lead`,
`.callout` (y sus variantes `.warn` / `.ok`), `.steps`, `.clean-list`, `.tag`,
`.table-wrap` con `table.cmp`, `.code` para bloques de terminal, `code.inline`,
`.pipe` (el stepper para lo que no cabe) y `.loop-cycle` (pasos con flechas).

Si un slide pide un componente más específico (una demo interactiva, un diagrama),
descríbelo en su spec y en la referencia de contenido; reúsa estas clases como base.
