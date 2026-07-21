# CLAUDE.md

> **Políticas del proyecto** para Claude Code. Este archivo define _cómo_ debe  
> trabajar el agente dentro del repositorio; no ejecuta el trabajo por sí mismo.

## Qué vamos a construir

Una **landing / deck** que funciona como **presentación de slides**: pestañas  
principales (los temas) con subpestañas (los slides de cada tema) y navegación  
**libre** — se puede saltar a cualquier tema/slide, avanzar con Anterior/Siguiente  
o con las flechas del teclado.

Este es un **harness reutilizable**: sirve para armar una presentación de  
**cualquier tema**. El _qué_ (el temario y su copy) no vive aquí — vive en las  
**referencias de contenido** (`.claude/references/03-content.md` y las notas de  
dominio que la acompañen). Para hacer una presentación nueva, se cambia el contenido;  
el resto (este archivo, el diseño, la arquitectura, los agentes y comandos) se reusa.

Este repositorio arranca _casi vacío_ a propósito. La landing (`src/index.html`,  
`src/css/styles.css`, `src/js/main.js`) **todavía no existe** — la construimos juntos,  
guiados por este `CLAUDE.md`, las referencias y un flujo de **Spec-Driven Development**  
**simplificado**.

*   **Stack:** HTML + CSS + JavaScript puro. Sin framework, sin bundler, sin build.
*   **Todo el código vive en `src/`.** `index.html`, `css/styles.css` y `js/main.js` se  
    generan **dentro de `src/`** — nunca en la raíz del repo. Los `assets/` siguen en la  
    raíz, así que desde `src/index.html` se referencian con `../assets/…`; entre sí,  
    `css/` y `js/` son hermanos de `index.html` (rutas `css/styles.css`, `js/main.js`).
*   **Identidad visual:** GIGA IT (grupo-giga.com). Colores y assets fijos — ver  
    [`.claude/references/01-design-system.md`](.claude/references/01-design-system.md).
*   **Contenido del tema:** [`.claude/references/03-content.md`](.claude/references/03-content.md).

## Primer arranque (Kickoff) — hazlo antes de escribir código

Cuando alguien abre este proyecto por primera vez (o escribe `empecemos` / usa  
`/kickoff`), **no empieces a codificar de inmediato**. Primero conduce esta  
conversación de arranque, en orden, y confirma cada punto con la persona:

1.  **Definir la presentación.** Lee las referencias de contenido y confirma el  
    alcance: ¿qué temas entran?, ¿cuántos slides por tema?, ¿público?, ¿idioma?  
    Resume lo entendido y pide confirmación.
2.  **Verificar los assets mínimos.** Comprueba que existan en `assets/` (ver  
    lista en [`01-design-system.md`](.claude/references/01-design-system.md)).  
    Si falta alguno, avísalo antes de continuar — no inventes rutas ni binarios.
3.  **Evaluar las skills disponibles.** Ejecuta mentalmente `/skills`. Confirma qué  
    skills de diseño/UX están instaladas y **cuáles conviene instalar** con  
    `npx skills find`. Ver [Skills](#skills--cu%C3%A1ndo-usar-cada-una).
4.  **Definir los colores y tokens.** Confirma la paleta y tipografía derivadas del  
    logo (no inventar hex nuevos). Ver [`01-design-system.md`](.claude/references/01-design-system.md).
5.  **Proponer el plan SDD.** Solo cuando 1–4 estén claros, entra al flujo  
    [Spec → Plan → Tasks](#forma-de-trabajo-spec-driven-development-simplificado).

> Presenta el kickoff como una **checklist con estado** (✔ / pendiente) y detente  
> a pedir confirmación en cada decisión ambigua. El detalle vive en  
> [`.claude/commands/kickoff.md`](.claude/commands/kickoff.md).

## Forma de trabajo: Spec-Driven Development (simplificado)

Trabajamos **spec-first**. La especificación es la fuente principal que dirige el  
plan, las tareas y la validación. El ciclo simplificado tiene **tres artefactos**  
antes de implementar:

```
SPEC  →  PLAN  →  TASKS  →  IMPLEMENT  →  VALIDATE ↻
```

**Spec** (`/spec`) — _qué_ se construye y _por qué_. Objetivo, alcance dentro/fuera  
y **criterios de aceptación verificables**. Se guarda en `.claude/specs/<slug>/spec.md`.

**Plan** (`/planner`) — _cómo_ se construye. Enfoque técnico, archivos afectados,  
riesgos y estrategia de validación. Se guarda en `.claude/specs/<slug>/plan.md`.  
Requiere **aprobación humana** antes de seguir.

**Tasks** (`/tasks`) — el plan partido en **tareas pequeñas y verificables**,  
una a la vez. Cada tarea referencia el criterio de aceptación que satisface.  
Se guarda en `.claude/specs/<slug>/tasks.md`.

**Implement** — al aprobar el plan, **ejecutas todas las tareas de corrido**, en  
orden: implementa, verifica y marca `[x]` cada una **sin pedir confirmación entre**  
**tareas**. No avances si una tarea no cumple su criterio; detente solo ante un  
fallo que bloquee (o si la persona interrumpe).

> ### ⛔ INVARIANTE: skills de diseño instaladas (bloqueante)
> 
> **No se ejecuta NINGUNA task** hasta que estén instaladas y cargadas las tres  
> skills de diseño: `frontend-design`, `ui-ux-pro-max` y `web-design-guidelines`  
> (ver `.claude/skills/`). Antes de implementar, verifica que existan; si falta  
> alguna, **detente** y pide instalarlas (`npx skills find` → `/reload-skills`)  
> antes de tocar código. Especificar y planear (spec/plan) sí se permite sin  
> ellas; **implementar no**.

**Validate** — corre `/verify`, revisa contra la spec y **actualiza la spec** si  
una decisión cambió.

> **Guardar siempre en archivo — una carpeta por funcionalidad.** Los tres  
> artefactos **se escriben siempre en disco**, no solo en el chat, y viven juntos en  
> una carpeta nombrada con la convención `**NN-DDMMYYYY-intención**` (número  
> secuencial · fecha `DDMMYYYY` · intención en kebab sin acentos). Dentro, los  
> archivos van **numerados por el orden del ciclo** para dejar claro el paso:  
> `01-spec.md` → `02-plan.md` → `03-tasks.md` → `04-notas-implementacion.md`  
> (conclusiones/validación, separadas de la spec). Ej.:  
> `.claude/specs/01-16072026-cimientos-de-presentacion/01-spec.md`. Cada  
> funcionalidad = una carpeta.
> 
> **Encausado — una spec a la vez.** Genera solo la spec de la sección actual; nunca  
> adelantes las de otras secciones aunque te pidan "todas". Escribe la primera,  
> complétala y detente.
> 
> **Ciclo encadenado sin comandos manuales.** `/sdd <slug>` corre spec → plan →  
> tasks en una sola pasada, con **una única pausa**: la aprobación humana del plan.  
> No hace falta invocar `/spec`, `/planner` y `/tasks` por separado (aunque siguen  
> disponibles para correr un paso suelto).

### Rebanado: una spec por sección, generadas en vivo

**No hagas una sola spec que construya toda la landing.** El trabajo se rebana y  
cada rebanada se especifica, planea, implementa y valida **antes de pasar a la**  
**siguiente**. El orden sugerido:

1.  **Cimientos** — el esqueleto: `src/index.html` base, tokens `:root` + estilos base y  
    el motor de `src/js/main.js` (pestañas, subpestañas, teclado, deep-linking).
2.  **Una spec por sección** — una por cada tema definido en las referencias de  
    contenido, en su orden.
3.  **Pulido final** — no-scroll, accesibilidad y deep-links, apoyándote en los  
    subagentes `@content-auditor` y `@design-reviewer`.

> ### ⛔ INVARIANTE: cimientos primero (bloqueante)
> 
> **Ninguna spec de sección se especifica, planea ni implementa hasta que el**  
> **esqueleto exista.** El esqueleto mínimo válido es:
> 
> *   `src/index.html` + `src/css/styles.css` + `src/js/main.js` presentes y funcionando  
>     (el motor navega: pestañas, subpestañas autogeneradas, teclado, deep-linking, `.pipe`).
> *   **Las portadas de TODAS las secciones del temario, con su título real visible**,  
>     sin contenido interno (solo los títulos mostrados, sin mayor información).
> 
> **Validación obligatoria al arrancar** `**/sdd**` **(y** `**/spec**`**):** antes de escribir nada,  
> comprueba que el esqueleto existe. Si **no** existe (o le faltan portadas/títulos),  
> **detente y construye cimientos primero** (`/sdd cimientos`); no avances a ninguna  
> otra sección. Esta comprobación se anuncia **la primera vez** que se ejecuta `/sdd`  
> en el proyecto.

`.claude/specs/` **arranca vacío a propósito**: las specs se **generan durante la**  
**sesión**, una a la vez. Ver esa generación ocurriendo _es_ parte del ejercicio — no  
las prepares por adelantado.

Reglas SDD para este repo:

*   **No implementes sin spec aprobada.** Si te piden código directo, propón primero  
    una spec mínima (puede ser de 10 líneas) y confírmala.
*   **Una spec a la vez.** Si te piden "toda la landing", propón partirla por secciones  
    y arranca por los cimientos; luego una sección por spec.
*   **Trazabilidad:** cada tarea apunta a un criterio de aceptación; cada criterio,  
    a contenido en [`03-content.md`](.claude/references/03-content.md).
*   SDD **no** es lo mismo que "modo plan": el modo plan separa análisis de ejecución;  
    SDD además exige spec, criterios de aceptación y validación explícita.

## Skills — cuándo usar cada una

Este proyecto es de **front-end visual**; las skills de diseño son de primera clase.  
Cárgalas **cuando las necesites** (para no gastar contexto), no todas de golpe.

| Skill | Úsala para | Cuándo |
| --- | --- | --- |
| `frontend-design` | Dirección estética, tipografía, decisiones que no parezcan plantilla | Al definir el look, al crear un slide/componente nuevo |
| `ui-ux-pro-max` | Paletas, pares tipográficos, layout, accesibilidad, motion | Al elegir colores/tipos o construir UI compleja (diagramas, `.pipe`) |
| `web-design-guidelines` | Auditar el UI contra buenas prácticas de accesibilidad y UX | Después de construir un slide, antes de darlo por hecho |

*   Instalar más skills: `npx skills find` → se guardan en `.claude/skills/` → luego  
    `/reload-skills`.
*   Documenta en la spec **qué skill** guio una decisión de diseño, para trazabilidad.

## Subagentes — delegar a especialistas

Definidos en [`.claude/agents/`](.claude/agents/). Delega en ellos para no llenar el  
contexto principal y obtener una segunda mirada especializada:

*   `**content-auditor**` — explora el código ya construido y **compara cada sección**  
    **contra las referencias de contenido**  
    ([`03-content.md`](.claude/references/03-content.md)), reportando qué falta, qué  
    sobra y qué difiere. Úsalo tras implementar un tema o antes de validar.
*   `**design-reviewer**` — revisa el resultado visual y **propone mejoras de diseño**  
    **constantemente** (jerarquía, contraste, espaciado, motion, identidad GIGA).  
    Úsalo de forma recurrente durante la implementación.

Política de delegación: el agente principal **decide** delegar e **integra** los  
resultados; los subagentes no toman la decisión final de producto.

## Referencias

La documentación estructurada vive en [`.claude/references/`](.claude/references/).  
Léelas antes de planear; son la base de las specs. Las tres primeras son del  
**harness** (reusables entre presentaciones); las de contenido cambian por tema.

| Archivo | Contenido | Tipo |
| --- | --- | --- |
| [`00-brief.md`](.claude/references/00-brief.md) | Qué es el producto, el formato de presentación y sus convenciones | Harness |
| [`01-design-system.md`](.claude/references/01-design-system.md) | Colores del logo, tipografía, assets y clases reutilizables | Harness |
| [`02-architecture.md`](.claude/references/02-architecture.md) | Modelo de slides, DOM, navegación libre, `.pipe`, deep-linking, regla de _no scroll_ | Harness |
| [`03-content.md`](.claude/references/03-content.md) | El temario del tema: secciones, slides y su copy | Contenido |
| [`04-…`](.claude/references/) | Notas de dominio que el copy necesita para no equivocarse | Contenido |

## Convenciones

*   **Sin scroll:** cada slide debe caber en pantalla (`body { height:100vh; overflow:hidden }`).  
    Si no cabe, divídelo en pasos con el componente `.pipe` (ver [`02-architecture.md`](.claude/references/02-architecture.md)).
*   **Colores y tipografía solo vía variables** `**:root**` (`--brand`, `--ink`, …). No  
    hardcodear hex nuevos: deben derivar del logo.
*   **Rutas relativas** para todo recurso.
*   Sin dependencias ni `npm` en runtime; la única carga externa son las Google Fonts  
    (Inter / JetBrains Mono / Space Grotesk) del `<head>`.
*   Las **subpestañas se generan solas** desde el `data-title` de cada `.slide`; no se  
    escriben a mano.

## Previsualización local

No hay build. Servir como estático **desde la raíz del repo** (así `../assets/` resuelve  
bien y se cargan fuentes y el logo SVG). La landing queda bajo `/src/`:

```
python -m http.server 8000   # abrir http://localhost:8000/src/
# o: npx serve                #   (o servir directamente la carpeta src/)
```

## Flujo recomendado en Claude Code

```
/kickoff            → arranque guiado (define, verifica assets, evalúa skills, colores)
/sdd <sección>      → ciclo completo: spec → plan (aprobación) → tasks, de una pasada
… implementar una tarea a la vez …
/verify             → valida el comportamiento real (sirve la página y revísala)
@content-auditor    → compara lo construido contra las referencias de contenido
@design-reviewer    → recibe mejoras de diseño
```

> `/sdd` es el atajo recomendado (no ejecutas los pasos uno por uno). Si prefieres  
> control fino, siguen disponibles sueltos: `/spec <slug>` → `/planner <slug>` →  
> `/tasks <slug>`. Todos guardan en `.claude/specs/<slug>/`.