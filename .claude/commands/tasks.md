---
description: Parte un plan aprobado en tareas pequeñas y verificables, una a la vez.
argument-hint: <slug de la spec en .claude/specs/>
---

# /tasks — Tareas (paso 3 de SDD)

Localiza la carpeta de la spec en `.claude/specs/` que corresponda a **$ARGUMENTS**
(convención `NN-DDMMYYYY-intención`). Convierte su `02-plan.md` aprobado en una
**lista de tareas pequeñas, ordenadas y verificables**. **Guárdalas siempre en
archivo** (nunca solo en el chat), en la **misma carpeta** y numerado por el orden
del ciclo: `.claude/specs/<carpeta>/03-tasks.md`.

## Formato

```markdown
## Tasks
- [ ] T1 — <acción concreta> · satisface AC1 · verifica: <cómo>
- [ ] T2 — <acción concreta> · satisface AC2 · verifica: <cómo>
...
```

## Precondición bloqueante · skills de diseño instaladas
**Antes de ejecutar cualquier task** (fase de implementación), verifica que estén
instaladas y cargadas las tres skills de diseño en `.claude/skills/`:
`frontend-design`, `ui-ux-pro-max` y `web-design-guidelines`. Si falta alguna,
**detente**: no ejecutes tareas; pide instalarlas (`npx skills find` →
`/reload-skills`) y solo entonces continúa. Escribir la lista de tareas sí se
permite sin ellas; **ejecutarlas no**.

## Reglas
- Cada tarea es **pequeña** (idealmente una edición coherente) y **verificable**.
- Cada tarea referencia el **criterio de aceptación** que satisface.
- **Implementar = ejecutar todas las tareas de corrido.** Una vez aprobado el plan,
  recorre la lista completa en orden: implementa cada tarea, verifícala, márcala
  `[x]` y pasa a la siguiente **sin pedir confirmación entre tareas**. Detente solo
  si una tarea falla y bloquea el avance (o si el usuario interrumpe).
- Verifica cada tarea contra su criterio antes de marcarla; el "de corrido" no
  significa saltarse la verificación, sino no pausar a pedir permiso.
- Tras completar todas, corre la validación:
  `/verify` + `@content-auditor` + `@design-reviewer`, y **actualiza la spec** si
  alguna decisión cambió durante la implementación.
- **Conclusiones en su propio archivo.** Las notas de implementación y validación
  (verificación, hallazgos de subagentes, fixes aplicados, pendientes diferidos) se
  escriben en `.claude/specs/<carpeta>/04-notas-implementacion.md`, **no** dentro de
  `01-spec.md` (ahí solo un puntero). Mantiene el qué/por qué separado de las
  conclusiones.
