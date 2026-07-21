---
description: Arranque guiado del proyecto — define la landing, verifica assets, evalúa skills y confirma la paleta antes de planear.
---

# /kickoff — Primer arranque

Conduce la conversación de arranque del proyecto **antes de escribir código**.
Sigue estos pasos en orden y **detente a confirmar** en cada decisión ambigua.
Presenta el avance como una checklist con estado (✔ / pendiente).

## Paso 1 · Definir la presentación
- Lee `.claude/references/00-brief.md` y las referencias de contenido (`03-content.md`
  y sus notas de dominio).
- Resume el alcance: qué temas entran y en qué orden, cuántos slides por tema, público
  e idioma, estilo de presentación por pestañas con navegación libre.
- Pregunta si hay cambios de alcance antes de continuar.

## Paso 2 · Verificar assets mínimos
- Comprueba `assets/` contra la lista de `01-design-system.md`: logo SVG y favicons de
  marca (más los assets propios que pida el tema, si aplica).
- Reporta lo presente y lo faltante. No inventes binarios ni rutas.

## Paso 3 · Evaluar skills
- Revisa qué skills hay en `.claude/skills/` (o ejecuta `/skills`).
- Recomienda cuáles usar (`frontend-design`, `ui-ux-pro-max`,
  `web-design-guidelines`) y cuáles instalar con `npx skills find`.

## Paso 4 · Definir colores y tokens
- Confirma la paleta derivada del logo (`--brand #25c6a0`, `--ink #001622`, …) y
  las tipografías. Recuerda: no se hardcodean hex nuevos.

## Paso 5 · Arrancar el SDD (una spec por sección, en vivo)
- Solo cuando 1–4 estén confirmados, explica el rebanado: **cimientos → una spec por
  cada sección del contenido → pulido**, una a la vez.
- La **primera** spec es *cimientos* (el esqueleto y la navegación). Propón crearla
  con `/spec cimientos` y explica el ciclo Spec → Plan → Tasks → Implement → Validate.
- Deja claro que `.claude/specs/` empieza vacío y se irá llenando conforme avancemos:
  **no** prepares todas las specs de golpe.

Cierra con un resumen de decisiones tomadas y el siguiente comando a ejecutar.
