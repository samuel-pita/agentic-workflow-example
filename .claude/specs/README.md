# Specs

Esta carpeta arranca **vacía a propósito**. Las specs no vienen prehechas: se
**generan en vivo** durante la sesión, una a la vez. Verlas aparecer conforme
avanzamos es justo parte de lo que queremos mostrar del ejercicio.

## Cómo se llena

Una spec por rebanada de trabajo, en este orden:

1. **cimientos** — el esqueleto y la navegación (todo cuelga de aquí).
2. **una por sección** — una spec por cada tema definido en el contenido, en su orden.
3. **pulido** — no-scroll, accesibilidad y deep-links, con `@content-auditor` y
   `@design-reviewer`.

Cada una pasa por el ciclo antes de tocar la siguiente. Lo normal es correrlo
encadenado con un solo comando:

```
/sdd <slug>    → spec → plan (lo apruebas tú) → tasks, todo de una pasada
… implementar y validar …
```

O paso a paso si quieres controlar cada fase:

```
/spec <slug>   → qué y por qué, con criterios de aceptación
/planner <slug> → el cómo (lo apruebas tú)
/tasks <slug>  → tareas chiquitas y verificables
```

## Reglas de la casa

- **Una carpeta por funcionalidad.** Los artefactos viven juntos y **numerados por
  el orden del ciclo**: `.claude/specs/<NN-DDMMYYYY-intención>/01-spec.md`,
  `02-plan.md`, `03-tasks.md` y `04-notas-implementacion.md` (conclusiones y
  validación, separadas de la spec). Se **guardan siempre en archivo**, no solo en
  el chat.
- **Nomenclatura de carpeta:** `NN-DDMMYYYY-intención` — número secuencial (01, 02…),
  fecha `DDMMYYYY` y una intención clara en kebab sin acentos. Ej.:
  `01-16072026-cimientos-de-presentacion/`.
- **Encausado, una a la vez.** Nada de una sola spec que construya todo, ni adelantar
  varias secciones. Una sección = una carpeta, generada cuando toca.
- Los criterios de aceptación tienen que ser verificables y trazables a
  `../references/03-content.md`.
