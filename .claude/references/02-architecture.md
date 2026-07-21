# Cómo está armado (notas)

Es HTML + CSS + JS puro, sin build. La idea es tener algo así:

```
src/index.html      → la estructura y TODO el contenido de los slides
src/css/styles.css  → estilos (las variables de color van en :root)
src/js/main.js      → la navegación, las subpestañas, el stepper .pipe y el deep-link
assets/             → logo, favicons, iconitos (en la raíz; desde src/ → ../assets/)
```

## El modelo de slides

Todo es una lista ordenada de slides. En el HTML se ve así:

```html
<section class="panel" data-topic="tema-1">       <!-- un tema = una pestaña de arriba -->
  <div class="slide cover" data-title="Portada">…  <!-- la portada del tema (fondo oscuro) -->
  <div class="slide" data-title="Sub A">…          <!-- un slide normal = una subpestaña -->
  <div class="slide" data-title="Sub B">…
</section>
```

Cosas que se me olvidan si no las anoto:

- El orden de los slides es literalmente el orden en que están en el HTML. El JS los
  recorre con un índice y se mueve con next/prev/goTo.
- Cada botón de pestaña de arriba (`.mtab`) lleva un `data-topic` que tiene que
  **coincidir** con el `data-topic` de su `.panel`, y en el mismo orden.
- **Las subpestañas no se escriben a mano** — el JS las genera solo, leyendo el
  `data-title` de cada slide del tema activo. Eso me encanta, no lo rompas.
- El primer slide de cada tema es la portada: `class="slide cover"`.

Los ids importantes que el JS busca: `#mainTabs`, `#subTabs`, `#stage`, y abajo
`#prevBtn` / `#nextBtn` / `#dots`.

## Navegación

Libre total: clic en cualquier pestaña o subpestaña te lleva ahí, sin bloqueos.
Con teclado, las flechas / espacio / avpág avanzan y retroceden (menos si estás
escribiendo en un textarea o input, ahí se ignora).

## El link a cada slide

El JS sincroniza el slide actual con el hash de la URL (`#tema-1/sub-a` por ej.), con
`replaceState` para no ensuciar el historial. Si abres esa URL, cae justo ahí. El
paso interno de un `.pipe` no se guarda en la URL, y está bien así.

## La regla de oro: nada de scroll

El body está fijo (`height:100vh; overflow:hidden`), o sea que cada slide TIENE que
caber en pantalla. Si algo no cabe, **no lo dejes desbordar** — se parte en pasos
clickeables con el componente `.pipe`:

```html
<div class="pipe">
  <div class="pipe-steps">
    <button class="pipe-tab active" data-step="0"><span class="pipe-n">1</span> Paso A</button>
    <button class="pipe-tab" data-step="1"><span class="pipe-n">2</span> Paso B</button>
  </div>
  <div class="pipe-stage">
    <div class="pipe-panel active" data-step="0"> … </div>
    <div class="pipe-panel" data-step="1"> … </div>
  </div>
</div>
```

Lo bueno: no hay que escribir JS por cada `.pipe`, el stepper es genérico y aplica a
todos. Al hacer clic reinicia las animaciones del panel (con `.pipe-panel.active.run`).
Si un paso necesita una animación propia, se engancha por su `id` desde el JS — pero
eso ya es cosa de cada slide, no del stepper. Todo respeta `prefers-reduced-motion`.
Úsalo en cualquier slide que no quepa; es el recurso de siempre.

## Componentes específicos de un tema

Algunos slides piden algo más elaborado que las tarjetas: una demo interactiva, una
calculadora, un diagrama con nodos clickeables (tipo hub-and-spoke: a la izquierda el
dibujo, a la derecha el detalle del nodo activo, con controles ‹ ›). Esos componentes
**los define el contenido** de cada tema (su spec y la referencia de contenido), no
esta nota. Aquí solo dejo la base reusable (`.pipe`, las tarjetas, etc.); lo demás se
construye sobre ella cuando el tema lo pida.

## Para agregar/editar contenido

1. Primero actualiza el temario (`03-content.md`), que es de donde sale todo.
2. Slide nuevo → agrega un `<div class="slide" data-title="…">` en el tema; la
   subpestaña aparece sola.
3. Tema nuevo → agrega el `.panel[data-topic]` y su botón `.mtab[data-topic]`
   arriba, cuidando el orden.
4. Reúsa clases antes de inventar CSS nuevo.
