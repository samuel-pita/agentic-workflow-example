---
description: Ejecuta el ciclo SDD completo (spec → plan → tasks) de una funcionalidad en una sola corrida, con una única pausa de aprobación.
argument-hint: <slug de la funcionalidad, p. ej. "cimientos" o "seccion-01-introduccion">
---

# /sdd — Ciclo SDD encadenado (spec → plan → tasks)

Ejecuta los tres pasos de SDD para **$ARGUMENTS** sin que la persona tenga que
invocar `/spec`, `/planner` y `/tasks` por separado. Todo se **guarda en archivo**
dentro de **una carpeta por funcionalidad**, nombrada con la convención
`NN-DDMMYYYY-intención` (ver `/spec`): p. ej.
`.claude/specs/01-16072026-cimientos-de-presentacion/`.

**Encausado, una funcionalidad a la vez.** `/sdd` corre el ciclo de **UNA** sola
spec (la sección actual). Nunca generes specs de varias secciones por adelantado.

## Paso 0 · Validar cimientos (bloqueante)

**Antes de cualquier otra cosa**, verifica la invariante "cimientos primero" de
`CLAUDE.md`: deben existir `src/index.html`, `src/css/styles.css` y `src/js/main.js` con el motor
funcionando y **las portadas de todas las secciones del temario con su título real
visible** (sin contenido interno).

- **La primera vez que se ejecuta `/sdd` en el proyecto**, anúncialo explícitamente:
  di que vas a comprobar el esqueleto antes de avanzar.
- Si el esqueleto **no existe o está incompleto** (faltan archivos, motor o
  portadas/títulos): **detente**. No especifiques ninguna sección. Propón construir
  cimientos primero (`/sdd cimientos`) y hazlo antes de seguir.
- Si `$ARGUMENTS` ya es `cimientos`, esta validación es el propio objetivo: procede.
- Solo cuando el esqueleto esté completo, continúa con el Flujo.

## Flujo

Los tres artefactos van **numerados por el orden del ciclo** dentro de la carpeta:
`01-spec.md`, `02-plan.md`, `03-tasks.md`.

1. **Spec** — sigue `/spec`: lee las referencias, escribe
   `.claude/specs/<carpeta>/01-spec.md` con criterios de aceptación verificables.
   Si hay decisiones ambiguas, pregúntalas ahora (en bloque, no de a una).
2. **Plan** — sin esperar otro comando, sigue `/planner`: escribe
   `.claude/specs/<carpeta>/02-plan.md` con el enfoque técnico.
3. **⏸ Única pausa de aprobación** — presenta un resumen de spec + plan y **espera
   la aprobación humana del plan** (lo exige `CLAUDE.md`). No implementes código.
4. **Tasks** — al aprobarse, sigue `/tasks`: escribe
   `.claude/specs/<carpeta>/03-tasks.md` con tareas pequeñas y verificables.

## Reglas

- **Guarda siempre en archivo**, nunca solo en el chat. Carpeta por funcionalidad.
- **Una sola pausa**: agrupa las preguntas de la spec y la aprobación del plan; no
  detengas el flujo paso a paso salvo en la aprobación obligatoria del plan.
- **Una funcionalidad a la vez** (la regla de rebanado de `CLAUDE.md` sigue vigente):
  `/sdd` encadena los pasos de UNA spec, no construye toda la landing.
- Tras `tasks.md`, se implementa una tarea a la vez y se valida con `/verify`,
  `@content-auditor` y `@design-reviewer`.
