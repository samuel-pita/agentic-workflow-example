# De qué va esto

Estoy armando una **landing que en realidad es una presentación**. O sea: el deck de
una charla, pero como página web. Se maneja como slides dentro del navegador.

Esto es una **plantilla reutilizable**: el formato y las reglas de abajo valen para
cualquier tema. Lo que cambia de una presentación a otra es el **contenido**, que vive
en las referencias de contenido (`03-content.md` y las notas de dominio que la
acompañen), no aquí.

## El formato

- Arriba, pestañas grandes = los temas (secciones de la charla).
- Debajo, subpestañas = los slides de cada tema.
- Uno puede saltar a donde quiera, o ir con Anterior/Siguiente y las flechas.
- Cada slide queda enganchado a la URL (`#tema/slide`) para compartir el punto exacto.

El público y el idioma los define el brief del tema (arriba de `03-content.md`). Por
defecto pienso en algo entendible para gente **mixta** (técnica y no técnica): sin
asumir que ya lo saben todo, pero sin explicarlo mal.

## Lo que quiero que quede claro al final

Que el deck cuente su historia solo: que cualquiera pueda recorrerlo, entender cada
tema en su slide y llegar al mensaje principal sin que alguien se los explique.

## Cosas que NO quiero que se me olviden

- Es HTML + CSS + JS puro. Nada de frameworks ni build, por favor.
- Los colores y los assets salen de la marca (ver la nota de diseño).
- **Cada slide tiene que caber en pantalla sin scroll.** Si no cabe, se parte en pasos.
- Rutas relativas y sin dependencias raras; lo único externo son las fuentes de Google.
