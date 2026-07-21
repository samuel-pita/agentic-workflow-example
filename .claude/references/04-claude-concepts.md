# Conceptos de Claude Code

Estas son mis notas para tener el modelo mental correcto al escribir el copy de las
secciones 02 (mapa de capacidades) y 03 (workflow). Me costó entenderlo bien, así
que lo dejo aquí para no volver a confundirlo.

La jerarquía que importa:

```
Workflow Loop  ⊃  Harness  ⊃  Agent Loop
```

Un Workflow Loop usa una o varias corridas del harness; cada corrida del harness
tiene dentro un Agent Loop; y cada Agent Loop hace varias llamadas al modelo y a
herramientas.

## CLAUDE.md y AGENTS.md

Son las **políticas** del proyecto: le dicen al agente *cómo* trabajar. NO son el
"orquestador" ni ejecutan nada. Traen contexto, reglas, restricciones, cuándo
delegar y referencias. La frase que me lo aclara:

> el archivo define la política · el agente decide · el harness ejecuta · el
> subagente hace el trabajo.

CLAUDE.md es la convención de Claude Code; AGENTS.md es el formato portable que
entienden otros agentes. Y evitar llamarlo "memoria" — no es que el modelo aprenda
para siempre, es un archivo que se vuelve a cargar.

## Harness

El entorno completo que rodea al modelo y lo hace funcionar. Prepara (instrucciones y
contexto), conecta (herramientas y sistemas) y controla (permisos y hooks). Dentro
de él ocurre el loop. Claude Code, Codex, Gemini CLI y OpenCode son ejemplos.

## Agent Loop

El ciclo con el que el agente resuelve **una** tarea, dentro del harness:

```
Entiende → Decide → Actúa → Observa → Valida ↻
```

Entiende/Decide (interpreta y elige el siguiente paso), Actúa/Observa (ejecuta y ve
el resultado), Valida (¿sigo, corrijo, termino?). Dura segundos o minutos. No es una
feature completa ni un sprint — eso es el workflow.

## Las piezas del harness (el copy del mapa sale de aquí)

- **Tool Calling** — el modelo pide que una herramienta haga algo (grep, glob, read,
  edit, bash, fetch). Es *ejecutar acciones*.
- **MCP** — un protocolo estándar para conectar sistemas externos (GitHub, Jira,
  Slack, DBs, APIs). Tool Calling es hacer la llamada; MCP es el conector.
- **Skills · Commands** — procedimientos reusables. Una skill enseña *cómo*; un
  command (`/review`, `/deploy`) *arranca* un flujo.
- **Subagentes** — especialistas con su propio contexto, herramientas y permisos; el
  principal delega y luego junta los resultados.
- **Hooks** — reacciones automáticas a eventos del ciclo (después de una tool, al
  cerrar sesión, ante un error…). No envuelven ni controlan todo, solo reaccionan.
- **Permisos** — capa transversal: qué se puede, qué no y qué pide aprobación. Toca
  todas las capacidades.
- **Contexto** — la ventana de contexto, también transversal: es finita, se llena,
  hay que cuidarla.

## Workflow Loop

El ciclo de afuera, el proceso completo: personas, agentes, varias sesiones, CI/CD,
PRs, revisiones, aprobaciones, cambios de requisitos.

```
Define → Ejecuta → Revisa → Ajusta ↻
```

Puede contener varias corridas del harness. Dura horas, días o semanas.

## SDD (Spec-Driven Development)

Es un Workflow Loop guiado por specs: la especificación es el artefacto central.

```
Spec → Plan → Tasks → Implement → Validate → Update ↻
```

SDD no es un harness, ni el Agent Loop, ni una herramienta o un archivo — es la forma
de organizar el trabajo. (Spec Kit es un toolkit que lo operacionaliza, por si sale.)

## La frase que quiero que se lleve la gente

> CLAUDE.md y AGENTS.md son políticas · el agente las interpreta · el harness pone el
> entorno · el Agent Loop resuelve una tarea · el Workflow Loop organiza todo · y SDD
> es un Workflow Loop guiado por specs.
