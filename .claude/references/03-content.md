# El temario (esto es lo que va en cada slide)

Esta es mi fuente de verdad del contenido: qué slides hay, en qué orden y qué dice
cada uno. Si vas a construir o revisar la landing, compárala contra esto.

## Brief del tema

- **Tema:** Inteligencia Artificial, enfocada en **Claude y Claude Code**.
- **Público:** mixto — técnicos y gente de negocio. Sin asumir que ya lo saben todo,
  pero sin explicarlo mal.
- **Idioma:** español.
- **Meta:** que cualquiera pueda clonar un repo, correr `claude`, pedir un plan y
  ejecutar cambios de forma segura y reproducible; y que entiendan qué es el harness,
  el loop y cómo se trabaja con specs.

> El formato, el diseño y la arquitectura son del harness (referencias `00`–`02`);
> esta referencia y sus notas de dominio son lo específico de este tema.

Recordatorio: cada tema es una `<section class="panel" data-topic>` y cada slide un
`.slide` con su `data-title` (el primero de cada tema es la portada, `.slide cover`).
Orden de las pestañas: `inicio · intro · claude-code · workflow · prerequisitos · caso`.

---

## 00 · Inicio (`inicio`)

**Portada** — índice `00`, título grande **"Inteligencia Artificial, enfocada en
Claude"** (la palabra "Claude" en verde). Bajada: cómo funcionan los modelos de
lenguaje y cómo trabajar con Claude Code en un flujo profesional.

**Agenda** — cinco tarjetas, una por tema:
1. Introducción — determinístico vs probabilístico, LLMs, tokens, contexto, proveedores.
2. Capacidades Agénticas — CLAUDE.md/AGENTS.md, tool calling, MCPs, subagentes, skills, permisos, hooks; más harness y loops.
3. Workflow Loop — el ciclo de desarrollo y las formas de trabajo: SDD, vibe coding y más.
4. Prerequisitos — Git, Node, Python, Claude Code y VS Code, instalados y validados.
5. Caso de estudio — todo junto, en vivo.

Y un callout con la meta: que todos puedan clonar un repo, correr `claude`, generar
un plan y ejecutar cambios de forma segura y reproducible.

---

## 01 · Introducción (`intro`)

**Intro** (portada) — "Introducción a la IA". Los conceptos base: qué es y qué no es
un LLM, cómo se le cobra, cómo se le habla.

**Det. vs Prob.** — dos tarjetas comparando:
- *Determinístico* (software de siempre): misma entrada → siempre la misma salida,
  reglas que escribió un humano, predecible. Va con una mini-animación tipo
  `2+2 → sumar → 4`.
- *Probabilístico* (los LLM): predicen el siguiente token más probable, la misma
  entrada puede variar, no "saben" — estiman patrones. Animación de `"El cielo es…"`
  con barras: azul 62%, gris 21%, claro 10%, inmenso 7%.

**¿Cómo funciona?** — este es un `.pipe` de 4 pasos (porque no cabría todo junto):
1. *Tokenización*: el texto entra y se parte en tokens. `"El cielo es azul"` → chips.
2. *Predicción*: la red calcula la probabilidad de cada siguiente token (aquí va el
   gancho `#netDiag`, la red neuronal animada).
3. *Muestreo*: se elige un token según esas probabilidades, la temperatura regula la
   variación. Las barras otra vez (azul 62, gris 21, claro 10, inmenso 7).
4. *Repetición*: el token se agrega y vuelve a empezar con la siguiente palabra.

**Tokens** — otro `.pipe`, 3 pasos. La idea general: se cobra por tokens de entrada
(lo que mandas) y de salida (lo que responde), regla de dedo ~4 caracteres ≈ 1 token.
1. *Calculadora*: un textarea donde escribes y te cuenta caracteres, palabras y
   tokens aprox (ids `#tk-input`, `#tk-chars`, `#tk-words`, `#tk-tokens`).
2. *Costos*: la salida suele costar más que la entrada (3–5×) porque se genera token
   por token; y a veces no se cobra por tokens sino por créditos/requests (ej. Copilot).
3. *Límites*: en una suscripción no pagas por token, tienes cupos por ventanas —
   uno diario (ventana corta, rolling) y uno semanal (tope global). Opus y contextos
   largos lo queman más rápido.

**Contexto** — `.pipe` de 2 pasos. Es la memoria de trabajo del modelo: todo lo que
puede ver a la vez (prompt + archivos + skills + conversación).
1. *Ventana de contexto*: cada bloque ≈ 25k tokens; el mismo trabajo llena lo mismo,
   lo que cambia por modelo es el tamaño total. Ojo: más contexto no siempre es mejor.
   Va con una rejilla visual usado/libre.
2. *Claves*: es finito, se llena, hay que cuidarlo (si se llena de ruido el agente se
   deforma y se pone lento y caro). Por eso etiquetamos archivos, cargamos skills solo
   cuando hacen falta y delegamos en subagentes.

**Proveedores** — una tabla, esto sí quiero que quede tal cual (verificado a julio 2026):

| Proveedor | Producto | Modelos | Ventana |
|---|---|---|---|
| Anthropic | Claude | Haiku 4.5 · Sonnet 5 · Opus 4.8 · Fable 5 | 200K – 1M |
| OpenAI | ChatGPT | GPT-5.6 · Sol / Terra / Luna | ~1.05M |
| Google | Gemini | 3 Flash · 3.1 Pro · 3.5 Pro | 1M – 2M |

Con un callout: cada familia balancea distinto velocidad/costo/capacidad — ligeros
(Haiku, Flash) para lo simple, grandes (Opus, Pro) para razonar.

**Plataformas** — tres tarjetas con un mockup cada una:
- *Chats*: accesible y cero setup, pero aislado del proyecto y a copiar/pegar.
- *IDEs*: autocompletado en el editor, pero visión limitada del repo completo.
- *CLIs (Claude Code)*: acceso a todo el repo, ejecuta comandos, agéntico — pero pide
  terminal y buenas prácticas.

**Markdown** — dos columnas. A la izquierda por qué Markdown para hablar con la IA
(estructura sin ruido, los modelos se entrenaron con montañas de MD, legible para
humano y máquina, por eso `CLAUDE.md` es MD). A la derecha una chuleta "Escribes /
Se ve" con títulos, negrita/cursiva, listas, cita, código, enlace y tabla.

---

## 02 · Capacidades Agénticas (`claude-code`)

**Intro** (portada) — "Capacidades Agénticas". Los bloques que convierten un modelo
en un agente que configura, actúa, escala y se controla. Lo vemos con Claude Code,
pero aplica a cualquier agente.

**Mapa** — el slide del `cap-map` (el diagrama interactivo). Cada pieza tiene su
detallito a la derecha. El texto conceptual completo de cada pieza está en la nota de
conceptos (`04-claude-concepts.md`); aquí solo la lista de piezas para no duplicar:
overview, prompt, workflow, harness, instrucciones (CLAUDE.md·AGENTS.md), tool-calling,
mcp, skills-commands, subagentes, loop (Agent Loop), hooks, permisos y contexto.
En harness van los logos de ejemplo (Claude Code, Codex, Gemini CLI, OpenCode).

---

## 03 · Workflow Loop (`workflow`)

**Intro** (portada) — "Workflow Loop". El ciclo externo que organiza todo el proceso
de desarrollo, y las formas de trabajo para conducirlo.

**Qué es** — organiza todo el proceso; puede abarcar varias sesiones y varias corridas
del harness. Ciclo: **Define → Ejecuta → Revisa → Ajusta ↻**. Dos tarjetas: muchos
participantes (personas, agentes, CI/CD, PRs, revisiones) y que dura horas/días/semanas
(al revés del Agent Loop, que es de segundos/minutos).

**Agent vs Workflow** — dos tarjetas contrastando el Agent Loop (interno, una corrida
dentro del harness, segundos) contra el Workflow Loop (externo, el proceso completo,
horas). Jerarquía: `Workflow Loop ⊃ Harness ⊃ Agent Loop`.

**Formas de trabajo** — seis tarjetas: SDD (spec-first), Vibe Coding (flujo libre),
Prototipado (explorar, código desechable), TDD (test-first), Review/PR-driven, y una
última que dice que todas usan el harness por debajo — cambia el "cómo", no el motor.

**Vibe Coding** — construir guiando por conversación e intención: describes, ves,
ajustas; rápido y sin spec formal. Tres tarjetas: rápido, conversacional, con cuidado
(menos control y trazabilidad, riesgoso para producción crítica). Regla: vibe para
explorar, SDD cuando tiene que salir correcto y mantenible.

**SDD** — la spec como fuente principal para planear, implementar y validar. Ciclo:
**Spec → Plan → Tasks → Implement → Validate → Update ↻**. Ventajas (alinea antes de
codear, plan revisable, documenta la intención) y límites (cuesta tiempo por
adelantado, menos ágil para cambios triviales, spec ambigua = plan ambiguo).

---

## 04 · Prerequisitos (`prerequisitos`)

**Intro** (portada) — todos en **Windows**. Instalar en orden: Git, Node, Python,
Claude Code, VS Code. Cada uno se valida con su `--version`.

Cada paso lleva "Paso N", el enlace de descarga y un bloque de terminal:

**Git** (control de versiones, para clonar y que Claude vea el historial):
```
winget install Git.Git
git --version
git config --global user.name "Tu Nombre"
git config --global user.email "tu@correo.com"
```

**Node.js** (prerequisito de Claude Code, trae `npm`; usar LTS):
```
winget install OpenJS.NodeJS.LTS
node --version
npm --version
```

**Python** (en Windows lo usa Claude Code para buscar dentro del repo):
```
winget install Python.Python.3.12
python --version
```
Ojo: si lo instalas con el .exe de python.org, marca "Add python.exe to PATH".

**Claude Code** (la CLI, se instala con npm):
```
npm install -g @anthropic-ai/claude-code
claude --version
claude doctor
```

**VS Code** (editor recomendado, tiene extensión oficial):
```
winget install Microsoft.VisualStudioCode
code --version
```
Y un callout de cierre: si los cinco `--version` responden, ya estamos listos.

---

## 05 · Caso de estudio (`caso`)

**Intro** (portada) — ponemos todo junto: del entorno listo a ejecutar cambios reales
con Claude Code, cuidando modelos y contexto.

**Guion en vivo** — seis pasos: verificar instalación → clonar el repo →
`claude init` → explorar los modos (plan/auto/manual/accept edits) → generar un plan
(SDD) y aprobarlo → ejecutar el código y ver el loop.

**Comandos** — un `.pipe` de 7 grupos, la referencia de comandos de Claude Code:
1. *Configuración*: `/init`, `/memory`, `/permissions`, `/config`.
2. *Contexto*: `/context`, `/compact`, `/clear`, `/btw`, `/usage`, `/model`, `/effort`.
3. *Sesiones*: `/rename`, `/resume`, `/branch`, `/rewind`, `/export`, `/exit`.
4. *Planeación*: `/plan`, `/tasks`, `/background`.
5. *Revisión*: `/diff`, `/simplify`, `/code-review`, `/security-review`, `/verify`.
6. *Extensibilidad*: `/skills`, `/reload-skills`, `/plugin`, `/reload-plugins`, `/mcp`, `/hooks`, `/agents`.
7. *Diagnóstico*: `/doctor`. Con la regla de oro: los comandos no sustituyen el proceso
   de ingeniería (`/plan` no es una spec, `/verify` no es un pipeline, `/rewind` no es
   Git, `/code-review` no reemplaza la revisión humana).

**Instalar skills** — cómo extender Claude Code con `npx skills find`. A la izquierda
los pasos (corres el buscador, buscas, seleccionas con espacio, instalas con enter en
`.claude/skills/`) y que luego `/reload-skills`. A la derecha un mock del buscador.

**Modos** — tabla:

| Modo | Qué hace | Cuándo |
|---|---|---|
| Plan | Investiga y propone, no edita | Tareas complejas o de riesgo |
| Manual | Pide permiso en cada acción | Aprender o zonas sensibles |
| Accept edits | Aplica ediciones sin confirmar cada una | Cambios acotados y confiables |
| Auto | Corre el loop con mínima intervención | Tareas bien definidas y verificables |

**Modelos** — tabla:

| Modelo | Perfil | Ideal para |
|---|---|---|
| Haiku | Rápido y económico | Tareas simples, alto volumen |
| Sonnet | Equilibrado | Desarrollo del día a día |
| Opus | Máximo razonamiento | Problemas complejos y arquitectura |

Con la idea de: planear con uno capaz y bajar a uno rápido para lo mecánico.

**Cuidado del contexto** — tres tarjetas: etiquetar archivos con `@ruta`, llamar
skills solo cuando hacen falta, y delegar búsquedas amplias en subagentes que te
devuelven solo la conclusión.

**Inspección** — la lista de lo que vamos a mostrar en vivo: leer el `CLAUDE.md`, los
subagentes configurados, las skills, generar un plan (SDD), ejecutar código, ver un
hook en acción y mandar a llamar una skill.
