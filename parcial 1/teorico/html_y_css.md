# HTML y CSS — Teórico Parcial 1 (Programación Web y Mobile)


## 1. HTML

### 1.1 ¿Qué es?

- **HTML** = *HyperText Markup Language* (Lenguaje de Marcado de Hipertexto).
- **No es un lenguaje de programación**: es un lenguaje de **marcado**.
- Define la **estructura** de la página, de forma **jerárquica**, y le da **significado** (semántica) al contenido.
- Se compone de **tags/etiquetas**: empiezan con `<`, terminan con `>`, y contienen el nombre del tag + sus atributos. Ej: `<p class="intro">`.
- HTML **no distingue mayúsculas de minúsculas**, pero la buena práctica es escribir todo en **minúsculas**.
- Una app web típica está compuesta por **HTML (estructura) + CSS (estilo) + JS (comportamiento)**: son los tres tipos de archivo que el navegador interpreta de forma nativa.

### 1.2 Estructura básica de un documento

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título de la página</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- contenido visible -->
</body>
</html>
```

- **`<!DOCTYPE html>`**: le indica al navegador que el documento usa HTML5. No es un tag, va siempre primero.
- **`<html>`**: etiqueta raíz. Indica al navegador que el documento contiene markup HTML. Guardar el archivo con extensión `.html` no alcanza, el tag debe estar presente. `</html>` cierra el documento completo.
- **`<head>`**: contiene toda la información para el funcionamiento de la página y **metadata** (autor, descripción, charset, ícono, título, hojas de estilo, scripts externos). **Nada de lo que está en `<head>` es visible** para el usuario en el body de la página.
  - `<title>`: título que aparece en la pestaña del navegador.
  - `<meta charset="UTF-8">`: define la codificación de caracteres (permite usar tildes, ñ, emojis, etc).
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: fundamental para el diseño **responsive**, hace que la página use el ancho real del dispositivo.
  - `<link rel="stylesheet" href="...">`: vincula una hoja de estilos externa.
- **`<body>`**: contiene **todos los elementos visibles** del sitio (texto, imágenes, videos, tablas, formularios, etc). También puede incluir `<style>` o `<script>`.

### 1.3 Etiquetas y atributos

- Las **etiquetas (tags)** se usan para crear **elementos** HTML.
- Los **atributos** van "dentro" de la etiqueta de apertura, con sintaxis `nombreAtributo="valorAtributo"`.
- No todos los atributos son válidos para todas las etiquetas (ej: `href` es de `<a>`, `src` es de `<img>`).
- La mayoría de los elementos tienen apertura y cierre (`<p>...</p>`); algunos son **de un solo tag / vacíos** (no se cierran): `<img>`, `<br>`, `<hr>`, `<input>`, `<meta>`, `<link>`.

**Atributos globales relevantes** (aplican a casi cualquier elemento):

| Atributo | Para qué sirve |
|---|---|
| `id` | Identificar de forma **única** un elemento en la página |
| `class` | Aplicarle una o más clases CSS a un elemento (se pueden repetir en varios elementos) |
| `style` | Aplicar CSS **inline** directamente sobre el elemento |
| `alt` | Texto alternativo de una imagen (accesibilidad / si la imagen no carga) |
| `src` | Origen de un recurso: imagen, script, etc. |
| `href` | Destino de un link (`<a>`) o de una hoja de estilos (`<link>`) |
| `onclick` | Qué hacer cuando se hace click sobre el elemento (JS inline) |
| `data-*` | Atributos personalizados para guardar datos propios (ej: `data-id="5"`) |
| `target="_blank"` | Abrir un link en una pestaña nueva |

### 1.4 Comentarios

```html
<!-- esto es un comentario, no se muestra en pantalla -->
```

### 1.5 Etiquetas de texto

```html
<h1>Título principal</h1>
<h2>Subtítulo</h2>
<!-- ... hasta h6, van bajando de jerarquía/importancia -->

<p>Un párrafo de texto.</p>

<span>Texto en línea, sin significado semántico especial.</span>

<strong>Texto importante (negrita)</strong>
<em>Texto enfatizado (cursiva)</em>
<br> <!-- salto de línea -->
<hr> <!-- línea horizontal divisoria -->
```

- `h1`–`h6`: títulos, jerárquicos (`h1` el más importante). Conviene usar solo **un `h1`** por página.
- `p`: párrafo, es un elemento de **bloque**.
- `span`: contenedor **en línea**, sin semántica, útil para aplicar estilos a una porción de texto.
- `div`: contenedor genérico **en bloque**, sin semántica, se usa para agrupar y organizar el layout.

### 1.6 Listas

```html
<ul> <!-- lista no ordenada -->
  <li>Ítem 1</li>
  <li>Ítem 2</li>
</ul>

<ol> <!-- lista ordenada -->
  <li>Primero</li>
  <li>Segundo</li>
</ol>

<dl> <!-- lista de definiciones -->
  <dt>HTML</dt>
  <dd>Lenguaje de marcado</dd>
</dl>
```

### 1.7 Links e imágenes

```html
<a href="https://example.org" target="_blank">Ir al sitio</a>

<img src="imagen.png" alt="Descripción de la imagen" width="200" height="100">
```

- `alt` es obligatorio por buenas prácticas: describe la imagen cuando no se puede ver (accesibilidad, SEO, error de carga).
- Se puede fijar `width`/`height` en el tag o (mejor) por CSS.

### 1.8 Tablas

Muy común en los parciales para mostrar datos tabulares.

```html
<table>
  <thead>
    <tr>
      <th>Columna 1</th>
      <th>Columna 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Dato A</td>
      <td>Dato B</td>
    </tr>
  </tbody>
</table>
```

- `<table>`: contenedor de la tabla.
- `<thead>` / `<tbody>` / `<tfoot>`: agrupan filas de encabezado / cuerpo / pie (semántico, ayuda a estilar con CSS, ej. `thead th`).
- `<tr>`: fila (*table row*).
- `<th>`: celda de encabezado (texto en negrita y centrado por defecto).
- `<td>`: celda de datos.
- `colspan="n"` / `rowspan="n"`: hacen que una celda ocupe varias columnas/filas.

### 1.9 Formularios

```html
<form action="/enviar" method="post">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <input type="password" name="clave">
  <input type="checkbox" name="acepto"> Acepto términos
  <input type="radio" name="opcion" value="a"> Opción A
  <input type="radio" name="opcion" value="b"> Opción B

  <select name="pais">
    <option value="uy">Uruguay</option>
    <option value="ar">Argentina</option>
  </select>

  <textarea name="comentario"></textarea>

  <button type="submit">Enviar</button>
</form>
```

- `<label for="id">`: asocia un texto a un input por su `id` (mejora accesibilidad, y al clickear el label se enfoca el input).
- Tipos de `<input>` comunes: `text`, `password`, `email`, `number`, `checkbox`, `radio`, `date`, `file`, `submit`.
- Atributos útiles: `name` (clave del dato al enviar), `placeholder`, `required`, `value`, `disabled`, `maxlength`.
- `<button>`: puede ser `type="submit"`, `type="reset"` o `type="button"`.

### 1.10 Etiquetas semánticas (HTML5)

Aportan significado a las distintas partes de la página (útil para SEO y accesibilidad), en vez de usar `<div>` para todo:

| Etiqueta | Uso |
|---|---|
| `<header>` | Encabezado de la página o de una sección |
| `<nav>` | Bloque de navegación / menú |
| `<main>` | Contenido principal (uno por página) |
| `<section>` | Sección temática dentro de la página |
| `<article>` | Contenido autocontenido (una noticia, un post) |
| `<aside>` | Contenido secundario/relacionado (sidebar) |
| `<footer>` | Pie de página o de sección |
| `<figure>` / `<figcaption>` | Imagen/contenido con su leyenda |

### 1.11 Entidades y caracteres especiales

- Para mostrar caracteres reservados de HTML: `&lt;` (`<`), `&gt;` (`>`), `&amp;` (`&`), `&nbsp;` (espacio no separable).
- Con `<meta charset="UTF-8">` se pueden escribir directamente tildes, ñ y **emojis** (🔥📅🚀) en el texto sin problema, muy usados en los ejercicios de parcial.

---

## 2. CSS

### 2.1 ¿Qué es?

- **CSS** = *Cascading Style Sheets* (Hoja de Estilos en Cascada).
- Sin CSS, lo que se ve en una página HTML son los **estilos por defecto del navegador**.
- Con CSS controlamos **exactamente** cómo se ven los elementos.
- Es un lenguaje **basado en reglas**: cada regla decide **qué** grupo de estilos aplicar y **a quién**.

**Sintaxis de una regla:**

```css
selector {
  propiedad: valor;
  propiedad2: valor2;
}
```

- **Selector**: a qué elemento(s) aplica la regla.
- **Propiedad**: qué característica se modifica (`background-color`, `border`, etc).
- **Valor**: con qué se modifica.

Si se repite la misma propiedad dentro de una regla, **gana la última declarada**:

```css
.clase {
  background-color: darkblue;
  background-color: orange; /* esta es la que se aplica */
}
```

### 2.2 Formas de utilizar CSS

1. **Externo** (la más recomendada): archivo `.css` separado, vinculado con `<link>` en el `<head>`.
   ```html
   <link rel="stylesheet" href="styles.css">
   ```
2. **Interno**: dentro de un tag `<style>` en el `<head>` del documento.
   ```html
   <style>
     div { background-color: tomato; }
   </style>
   ```
3. **En línea (inline)**: con el atributo `style` directo sobre el elemento.
   ```html
   <div style="background-color: gold;">...</div>
   ```

### 2.3 Tipos de selectores

| Tipo | Sintaxis | Ejemplo |
|---|---|---|
| De tipo (elemento) | `tag` | `h1`, `div`, `p` |
| Por id | `#id` | `#titulo`, `#contenido` |
| Por clase | `.clase` | `.container`, `.header` |
| Por atributo | `tag[attr="valor"]` | `a[href="https://example.org"]` |
| Universal | `*` | selecciona todos los elementos |

### 2.4 Combinadores

Combinan selectores para expresar relaciones entre elementos según su ubicación en el documento.

| Combinador | Sintaxis | Selecciona |
|---|---|---|
| Descendiente | `A B` | Todo `B` que esté **dentro** de `A` (a cualquier nivel de profundidad, no necesariamente hijo directo) |
| Hijo directo | `A > B` | `B` que sea **hijo directo** de `A` |
| Hermano adyacente | `A + B` | El `B` que está **justo después** de `A`, mismo nivel |
| Hermanos generales | `A ~ B` | Todos los `B` que sean hermanos de `A` y vengan **después** de él, aunque no sean adyacentes |

```css
body article p { color: red; }   /* descendiente */
ul > li { border-top: 5px solid red; } /* hijo directo */
p + p { color: red; }            /* hermano adyacente */
h1 ~ p { color: red; }           /* hermanos generales */
```

### 2.5 Pseudo-clases y pseudo-elementos

- **Pseudo-clase** (`:`): palabra clave que especifica un **estado especial** del elemento seleccionado. No depende solo del contenido de la página, sino de factores externos como el historial (`:visited`), interacción (`:hover`), o el estado (`:checked`).
  ```css
  selector:pseudoclase { propiedad: valor; }
  ```
  Ejemplos: `:hover`, `:focus`, `:visited`, `:checked`, `:first-child`, `:last-child`, `:nth-child(n)`, `:not(...)`.

- **Pseudo-elemento** (`::`): permite aplicar estilos a una **parte concreta** del contenido de un elemento.
  ```css
  selector::pseudo-elemento { propiedad: valor; }
  ```
  Ejemplos: `::before`, `::after`, `::marker` (estilo de los indicadores de listas), `::placeholder` (estilo del placeholder de un input).

### 2.6 Especificidad

- Es la forma en que el navegador decide **qué valores de una propiedad son más relevantes** para un elemento y por lo tanto se aplican, cuando hay reglas en conflicto.
- Es un **peso/importancia** asignado a cada declaración CSS.
- Si dos declaraciones tienen la **misma especificidad**, gana la **última** que aparece en el CSS.

**De menor a mayor especificidad:**

1. Selectores de **tipo** (`h1`, `p`) y **pseudo-elementos** (`::before`, `::after`).
2. Selectores de **clase** (`.contenedor`), de **atributo** (`a[href="..."]`) y **pseudo-clases** (`:hover`, `:focus`).
3. Selectores de **id** (`#titulo`).
4. **Estilos inline** (`style="..."`): siempre sobrescriben cualquier otra declaración, tienen la mayor especificidad.

> Extra (no está en las diapos pero suele preguntarse): `!important` tiene la máxima prioridad de todas, por encima incluso de inline, y debería evitarse salvo casos muy puntuales.

### 2.7 Unidades de medida

**Absolutas** (no cambian según el contexto):

| Unidad | Nombre | Ejemplo |
|---|---|---|
| `px` | píxel | `font-size: 16px;` |
| `pt` | punto | `font-size: 12pt;` |
| `pc` | pica | `font-size: 1pc;` |
| `in` | pulgadas | `font-size: 1in;` |
| `cm` | centímetro | `font-size: 1cm;` |
| `mm` | milímetro | `font-size: 10mm;` |
| `q` | cuarto de mm | `font-size: 16q;` |

**Relativas** (dependen de otro valor: el elemento, el padre, la raíz, o el viewport):

| Unidad | Es relativa a... |
|---|---|
| `em` | El `font-size` del elemento actual |
| `ex` | La altura de la "x" de la fuente |
| `%` | El elemento padre contenedor (en porcentaje) |
| `ch` | El ancho del carácter "0" |
| `rem` | El `font-size` del elemento **raíz** (`<html>`) |
| `vw` | 1% del **ancho** del viewport |
| `vh` | 1% de la **altura** del viewport |
| `vmin` | 1% del más chico entre `vw` y `vh` |
| `vmax` | 1% del más grande entre `vw` y `vh` |

- Las unidades **relativas** son clave para diseño **responsive**: por ejemplo, dos columnas con `width: 50%` se adaptan automáticamente al ancho disponible, mientras que con `width: 400px` quedan fijas sin importar el tamaño de pantalla.
- `rem` suele preferirse sobre `em` para tamaños de fuente porque no se "acumula" con el anidamiento (siempre se basa en el `html`, no en el padre inmediato).

### 2.8 Modelo de caja (Box Model)

- Todo elemento en CSS tiene una **caja** alrededor.
- De afuera hacia adentro: **margin → border → padding → content**.

```
┌──────────────── margin ────────────────┐
│ ┌──────────── border ─────────────┐    │
│ │ ┌──────── padding ──────────┐   │    │
│ │ │        content (0x0)       │   │    │
│ │ └────────────────────────────┘   │    │
│ └───────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

- `margin`: espacio **exterior**, fuera del borde (separa un elemento de otros).
- `border`: el borde del elemento.
- `padding`: espacio **interior**, entre el borde y el contenido.
- `content`: el contenido real (texto, imagen, etc).
- Se puede definir cada lado por separado: `margin-top`, `padding-left`, etc, o combinado: `margin: 10px 20px;` (vertical horizontal), `margin: 10px 20px 5px 0;` (top right bottom left).
- `box-sizing: border-box;` (muy usado en la práctica) hace que `width`/`height` incluyan el padding y el border, en vez de sumarse aparte (facilita mucho el maquetado).

**Dos tipos de caja según su comportamiento:**

- **Caja en bloque (`block`)**: ocupa **todo el ancho disponible** si no se define uno, y genera **salto de línea** antes y después (ej: `div`, `p`, `h1`, `table`).
- **Caja en línea (`inline`)**: ocupa **solo el espacio necesario**, **no** genera salto de línea, y **no se le puede fijar** `width`/`height` (ej: `span`, `a`, `strong`).
- **`inline-block`**: combina ambos: no hace salto de línea, pero sí respeta `width`/`height` y todos los márgenes/paddings.

| | `block` | `inline` | `inline-block` |
|---|---|---|---|
| Márgenes/paddings | Todos | Solo horizontales | Todos |
| Salto de línea | Sí | No | No |
| Ancho | Todo el disponible si no se define | No se puede fijar (ni alto) | Todo el disponible si no se define |

Esto se controla con la propiedad **`display`**: `display: block | inline | inline-block | none | flex | grid;` (`none` oculta el elemento del flujo del documento).

### 2.9 Flexbox (`display: flex`)

- Antes de Flexbox/Grid se usaba solo posicionamiento (`static`, `relative`, `absolute`) o cajas en bloque/línea, lo cual es limitado para layouts complejos y responsivos.
- **Flex** es un sistema **unidimensional** (una fila o una columna) de elementos flexibles, que se adaptan y acomodan automáticamente.

**Conceptos:**
- **Contenedor** (`display: flex`): el padre.
- **Ítems**: los hijos directos del contenedor.
- **Eje principal** (*main axis*): definido por `flex-direction`.
- **Eje secundario** (*cross axis*): perpendicular al principal.

```css
.contenedor {
  display: flex;
}
```

**Propiedades del contenedor:**

| Propiedad | Valores | Qué hace |
|---|---|---|
| `flex-direction` | `row` (default) \| `row-reverse` \| `column` \| `column-reverse` | Orientación del eje principal (horizontal / horizontal invertido / vertical / vertical invertido) |
| `flex-wrap` | `nowrap` (default) \| `wrap` | Si los ítems pueden pasar a otra línea cuando no entran |
| `justify-content` | `start \| end \| center \| space-between \| space-around \| space-evenly` | Alinea los ítems en el **eje principal** |
| `align-items` | `start \| end \| center \| stretch \| baseline` | Alinea los ítems en el **eje secundario** |
| `align-content` | `start \| end \| center \| space-between \| space-around \| space-evenly \| stretch` | Alinea **líneas** de ítems en el eje secundario (con `wrap`) |
| `gap` | `<size>` | Espacio entre ítems |

**Valores de alineación:**

| Valor | Descripción |
|---|---|
| `start` | Agrupa los ítems al **inicio** del eje |
| `end` | Agrupa los ítems al **final** del eje |
| `center` | Agrupa los ítems al **centro** del eje |
| `space-between` | Distribuye dejando espacio **entre** los ítems |
| `space-around` | Distribuye dejando espacio **alrededor** de cada ítem |
| `space-evenly` | Como `space-around` pero con espacio **exactamente igual** entre todos |

**Propiedades de los ítems (hijos):**
- `flex-grow`: cuánto "crece" un ítem respecto a los demás para ocupar espacio libre.
- `flex-shrink`: cuánto se "achica" si no entra.
- `flex-basis`: tamaño base antes de repartir espacio.
- `flex: 1;` (shorthand común para "ocupar todo el espacio disponible por igual").
- `align-self`: sobrescribe `align-items` para un ítem puntual.

### 2.10 Grid (`display: grid`)

- Si Flex organiza en **una dimensión**, **Grid** organiza en **dos dimensiones** (filas y columnas) simultáneamente.

**Conceptos:**
- **Contenedor** (`grid`): el padre.
- **Ítem**: cada hijo directo.
- **Línea** (*grid line*): las líneas que separan filas/columnas.
- **Celda** (*grid cell*): la intersección de una fila y una columna.
- **Banda** (*grid track*): una fila o columna completa.
- **Área** (*grid area*): un rectángulo formado por una o más celdas.

```css
.contenedor {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 columnas iguales */
  grid-template-rows: auto;
  gap: 1rem;
}
```

- `grid-template-columns` / `grid-template-rows`: definen la cantidad y tamaño de columnas/filas. La unidad `fr` reparte el espacio disponible en fracciones (muy usada).
- `repeat(3, 1fr)` es equivalente a `1fr 1fr 1fr`.
- `grid-template-areas`: permite nombrar áreas del layout y ubicar elementos por nombre.
- `grid-column` / `grid-row`: ubican un ítem en columnas/filas específicas (ej: `grid-column: 1 / 3;`).
- `gap` (o `row-gap` / `column-gap`): separación entre celdas.
- Muy usado para **grillas de tarjetas responsivas**, por ejemplo:
  ```css
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  ```
  Esto hace que la cantidad de columnas se ajuste sola según el ancho disponible (clave para "la grilla debe ajustarse automáticamente" que suele pedirse en el parcial).

### 2.11 Posicionamiento (`position`)

Otros valores de `display`/mecanismo aparte de flex/grid/block/inline/inline-block/none: se usa la propiedad **`position`** para anclar o desplazar elementos de formas muy concretas.

| Valor | Significado |
|---|---|
| `static` | Posicionamiento **por defecto**. Usa el orden natural del documento; `top/left/right/bottom` no tienen efecto. |
| `relative` | El elemento se mueve **ligeramente respecto a su posición estática original** (el espacio original queda "reservado"). |
| `absolute` | El elemento se saca del flujo normal y se posiciona respecto a su **contenedor posicionado más cercano** (el ancestro más próximo que tenga `position` distinto de `static`; si no hay ninguno, respecto al `<html>`). |
| `fixed` | Se posiciona respecto a la **ventana del navegador** (viewport); no se mueve aunque se haga scroll. |
| `sticky` | Mezcla entre `relative` y `fixed`: se comporta como `relative` hasta que al hacer scroll llega al offset indicado (ej: `top: 20px`), y ahí se "pega" y se comporta como `fixed` dentro de su contenedor. Muy usado para menús o headers que se pegan al hacer scroll. |

**Modificando la posición**, al usar cualquier valor distinto de `static`:

| Propiedad | Efecto |
|---|---|
| `top` | Empuja el elemento desde arriba hacia abajo |
| `bottom` | Empuja el elemento desde abajo hacia arriba |
| `left` | Empuja el elemento desde la izquierda hacia la derecha |
| `right` | Empuja el elemento desde la derecha hacia la izquierda |
| `inset` | Atajo para setear las 4 anteriores a la vez |

**`z-index`**: al usar un `position` distinto de `static`, permite establecer **profundidad** (eje Z) entre elementos posicionados: valores más altos quedan **por encima** de valores más bajos.

### 2.12 Diseño responsivo

- Una app **responsiva** ofrece el **mismo sitio** a cualquier dispositivo, con la fluidez necesaria para cambiar su organización y apariencia según el **tamaño y orientación** del dispositivo.
- Se logra combinando: unidades relativas (`%`, `vw`, `rem`), Flexbox/Grid, y **media queries**.

**Media Queries:** permiten aplicar CSS condicionalmente según características del dispositivo (ancho del viewport, resolución, orientación, etc).

```css
div {
  width: 100px;
}

@media (width > 425px) {
  div {
    width: 300px;
  }
}
```

**Breakpoints:** puntos de quiebre (anchos definidos) donde el diseño cambia de organización para adaptarse mejor a distintos tamaños de pantalla.

```css
/* Pantallas chicas (celulares) */
@media (max-width: 767px) {
  body { background-color: lightblue; }
}

/* Pantallas medianas (tablets) */
@media (min-width: 768px) and (max-width: 1023px) {
  body { background-color: lightgreen; }
}
```

> Importante: para que las media queries funcionen bien en mobile hace falta el meta tag de viewport en el `<head>`:
> `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

**Mobile first:**
- Implica **diseñar primero pensando en dispositivos móviles**, y luego hacer los ajustes de CSS/estructura necesarios para adaptar el diseño a tablets, laptops y pantallas grandes (generalmente con `min-width` en las media queries, sumando estilos a medida que crece la pantalla).
- Es importante porque **fuerza a enfocarse en lo esencial** (hay menos espacio disponible en mobile).
- Luego, al expandir el diseño para pantallas más grandes, ya se sabe qué es lo importante y no se pierde el foco.

**Valores máximos / mínimos útiles para responsive:**
- `max-width`: evita que un elemento crezca más de cierto tamaño (pero sí se puede achicar), muy usado en vez de un `width` fijo para que el contenido no se estire demasiado en pantallas grandes pero sí se adapte en chicas.
- `min-width` / `min-height`: análogo, pero como piso.

### 2.13 Fuentes personalizadas (`@font-face`)

Muy usado en los ejercicios de parcial para reproducir un diseño con tipografías específicas (ej: fuentes `.ttf` provistas como asset).

```css
@font-face {
  font-family: "MiFuente";
  src: url("assets/fonts/MiFuente-Regular.ttf") format("truetype");
  font-weight: normal;
}

@font-face {
  font-family: "MiFuente";
  src: url("assets/fonts/MiFuente-Bold.ttf") format("truetype");
  font-weight: bold;
}

body {
  font-family: "MiFuente", Arial, sans-serif; /* con fallback */
}
```

- Se define una vez por cada variante (regular, bold, italic, etc), usando el mismo `font-family` y distinto `font-weight`/`font-style`.
- Siempre conviene dejar una fuente de **fallback** (ej: `Arial, sans-serif`) por si la personalizada no carga.

### 2.14 Otras propiedades comunes (para maquetar los ejercicios de parcial)

Aunque no siempre están explícitas en las diapositivas, aparecen todo el tiempo al reproducir diseños:

- **Tipografía**: `font-family`, `font-size`, `font-weight`, `font-style`, `line-height`, `text-align`, `text-decoration`, `letter-spacing`, `color`.
- **Fondo**: `background-color`, `background-image`, `background-size`, `background-position`, `background-repeat`.
- **Bordes y esquinas**: `border`, `border-radius` (bordes redondeados), `box-shadow` (sombra).
- **Dimensiones**: `width`, `height`, `max-width`, `min-height`, `overflow` (`hidden`, `auto`, `scroll`).
- **Cursor**: `cursor: pointer;` (útil en botones/links).
- **Transiciones simples**: `transition: all 0.2s ease;` para animar cambios de estado (ej: en `:hover`).

---

## 3. Tips prácticos para el parcial

A partir de los ejercicios de parciales/simulacros anteriores, el ejercicio 1 típicamente pide:

1. **Reproducir un diseño dado** (imagen de referencia) con HTML semántico y CSS, a partir de un HTML/CSS base casi vacío.
2. Que la página sea **responsiva**: normalmente una grilla de tarjetas que se reacomoda sola al cambiar el tamaño de la ventana → usar **Flexbox con `flex-wrap: wrap`** o **Grid con `repeat(auto-fit, minmax(...))`**.
3. Incorporar **emojis** directamente como texto (gracias a `UTF-8`).
4. Mostrar **datos tabulares** con `<table>` + `thead`/`tbody`, estilada con `border-collapse: collapse`, bordes en `th`/`td`, y `text-align: left`.
5. Usar **fuentes propias** provistas como archivos `.ttf` vía `@font-face`.
6. Trabajar con **imágenes** (`<img>` con `alt`, ajustadas con CSS).
7. Mantener el CSS organizado por selectores de **clase** (evitar IDs para estilos generales, usar `class` para reutilizar estilos entre elementos similares) y aprovechar los **combinadores** cuando sea más simple que agregar clases nuevas.

