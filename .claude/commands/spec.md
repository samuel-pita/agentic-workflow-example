---
description: Escribe la especificación (qué y por qué) de una feature con criterios de aceptación verificables.
argument-hint: <nombre-de-la-feature, p. ej. "seccion-01-introduccion">
---

# /spec — Especificación (paso 1 de SDD)

Crea la especificación de **$ARGUMENTS** y **guárdala siempre en archivo** (nunca
solo en el chat): `.claude/specs/<NN-DDMMYYYY-intención>/spec.md`. **Una carpeta por
funcionalidad**, nombrada con la convención:

```
NN-DDMMYYYY-intención-clara/
```

- **`NN`** — número secuencial de dos dígitos (01, 02, 03…), en el orden en que se
  crean las specs. Mira las carpetas existentes en `.claude/specs/` y usa el
  siguiente número libre.
- **`DDMMYYYY`** — fecha de creación de la spec (usa la fecha actual de la sesión).
- **`intención-clara`** — descripción breve en kebab-case, sin acentos, que diga
  qué es. Ej.: `01-16072026-cimientos-de-presentacion`.

Los tres artefactos del ciclo viven juntos en esa carpeta y van **numerados por el
orden del ciclo** para que el paso quede explícito: `01-spec.md`, `02-plan.md`,
`03-tasks.md`. Esta spec se guarda como **`01-spec.md`**. Crea la carpeta si no
existe. Antes de escribir, lee las referencias relevantes (`03-content.md` para
contenido, `01`/`02` para diseño y arquitectura).

**Una spec a la vez (encausada).** Genera **solo** la spec de la sección actual;
nunca adelantes las specs de otras secciones. Si te piden varias, escribe la primera
y detente.

**No implementes código en este paso.** La spec es un documento; termina pidiendo
aprobación para pasar a `/planner`.

**Alcance de una spec:** una **sección** de la landing (o los *cimientos*), nunca
toda la landing de una vez. Si `$ARGUMENTS` es demasiado amplio ("todo", "la
presentación"), propón partirlo por secciones y escribe solo la primera. Trabajamos
una spec a la vez.

## Plantilla

```markdown
# Spec · <Feature>

## Objetivo
Una o dos frases: qué se construye y por qué.

## Contexto / referencias
- Contenido: 03-content.md §<sección>
- Diseño: 01-design-system.md
- Arquitectura: 02-architecture.md

## Alcance
- **Dentro:** …
- **Fuera:** …

## Criterios de aceptación (verificables)
- [ ] AC1 — …
- [ ] AC2 — …
- [ ] AC3 — cabe en pantalla sin scroll (o usa `.pipe` si no cabe)

## Riesgos / preguntas abiertas
- …
```

Reglas: criterios **verificables** (se pueden comprobar mirando la página),
cada uno trazable a la referencia. Alcance explícito de lo que queda **fuera**.
