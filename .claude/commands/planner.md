---
description: Propone el enfoque técnico para una spec aprobada (cómo). Requiere aprobación humana antes de implementar.
argument-hint: <slug de la spec en .claude/specs/>
---

# /planner — Plan técnico (paso 2 de SDD)

Localiza la carpeta de la spec en `.claude/specs/` cuyo nombre corresponda a
**$ARGUMENTS** (convención `NN-DDMMYYYY-intención`; empareja por la intención si te
pasan solo un alias). A partir de su `01-spec.md`, propón **cómo** implementarla.
**Guarda siempre el plan en archivo** (nunca solo en el chat), en la **misma
carpeta** y numerado por el orden del ciclo: `.claude/specs/<carpeta>/02-plan.md`.
No edites código todavía: primero escribe el plan, preséntalo y **espera aprobación**.

## Contenido del plan
1. **Enfoque técnico** — qué componentes/clases existentes reutilizar
   (`.card`, `.grid`, `.callout`, `.pipe`, `.steps`…) y qué se crea nuevo.
2. **Archivos afectados** — `src/index.html`, `src/css/styles.css`, `src/js/main.js`, assets.
3. **Pasos de alto nivel** — en orden, cada uno atado a un criterio de aceptación.
4. **Riesgos** — no-scroll, contraste, contexto/tamaño, deep-linking.
5. **Estrategia de validación** — cómo se comprobará (`/verify`, `@content-auditor`,
   `@design-reviewer`, servir la página).

## Reglas
- Respeta las convenciones de `CLAUDE.md` (sin build, rutas relativas, tokens `:root`).
- Marca las decisiones que requieren confirmación humana.
- Cuando se apruebe, continúa con `/tasks`.
