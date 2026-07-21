# Landing-presentación · plantilla con Claude Code

Harness reutilizable para construir, guiado por Claude Code, una **landing/deck** que
funciona como presentación de slides (pestañas = temas, subpestañas = slides,
navegación libre). Sirve para **cualquier tema**: el contenido vive en las referencias
y se cambia por presentación; el resto se reusa.

Este repo arranca **casi vacío a propósito**: trae la configuración de Claude Code
(`.claude/`), las referencias y los assets — pero **no** trae la landing
(`index.html`, `css/`, `js/`). Generarla es justamente el ejercicio.

## Empezar

1. Requisitos: Git, Node.js, Python, Claude Code y VS Code instalados.
2. Abre una terminal en esta carpeta y ejecuta:

   ```bash
   claude
   ```

3. Escribe **`/kickoff`** (o "empecemos"). Claude te guiará para definir la
   presentación, verificar los assets, evaluar las skills y confirmar la paleta antes
   de planear.
4. Sigue el flujo **Spec-Driven Development** con `/sdd <sección>` (encadena spec →
   plan → tasks; o sueltos `/spec` → `/planner` → `/tasks`) → implementar →
   `/verify`, una sección a la vez.

## Previsualizar

No hay build. Sirve la carpeta como estático:

```bash
python -m http.server 8000   # http://localhost:8000
# o: npx serve
```

## Qué hay dentro

```
CLAUDE.md                  políticas del proyecto (empieza por aquí)
assets/                    logo, favicons e iconos de marca
.claude/
├── settings.json          permisos y configuración de ejemplo
├── agents/                subagentes: content-auditor, design-reviewer
├── commands/              /kickoff, /sdd, /spec, /planner, /tasks
├── references/            00-02 el harness (reusable) · 03+ el contenido del tema
└── specs/                 aquí caen las specs de SDD (arranca vacía)
```

> Las skills de diseño (`frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`)
> se instalan con `npx skills find` en `.claude/skills/`.
>
> **Para reusar en otro tema:** deja `00-02` como están y reemplaza el contenido en
> `.claude/references/` (`03-content.md` y sus notas de dominio).
