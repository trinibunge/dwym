# React + Router + Context + json-server — Desde cero

Este apunte explica desde cero los conceptos necesarios para el Parcial 2 de React, siguiendo el orden en que conviene aprenderlos.

La idea no es memorizar código aislado, sino entender **qué problema resuelve cada cosa** y cómo se conectan.

---

# 1. ¿Qué vamos a construir?

Imaginemos una aplicación para un bar.

Tenemos dos tipos principales de datos:

## Productos

```json
[
  {
    "id": 1,
    "nombre": "Cerveza",
    "precio": 2000
  },
  {
    "id": 2,
    "nombre": "Pizza",
    "precio": 5000
  }
]
```

## Cuentas

```json
[
  {
    "id": 1,
    "cliente": "Juan",
    "productos": [
      {
        "nombre": "Cerveza",
        "cantidad": 2
      }
    ]
  }
]
```

La aplicación podría mostrar:

```text
CUENTAS

Juan
2 x Cerveza       $4000
-----------------------
TOTAL             $4000
```

Y también podríamos tener una página para crear una cuenta:

```text
NUEVA CUENTA

Cliente: [___________]

Producto: [Cerveza ▼]
Cantidad: [2]

[ CREAR CUENTA ]
```

Para construir esto necesitamos:

1. JavaScript → manipular los datos.
2. React → mostrar esos datos.
3. fetch → comunicarnos con el backend.
4. json-server → simular un backend.
5. React Router → tener distintas páginas.
6. Formularios → crear nuevas cuentas.
7. Context → compartir información entre componentes.

---

# 2. JavaScript: objetos

Un objeto guarda información relacionada.

```js
const producto = {
  nombre: "Cerveza",
  precio: 2000
}
```

Pensalo como una ficha:

```text
producto
 ├── nombre → "Cerveza"
 └── precio → 2000
```

Para acceder a una propiedad:

```js
producto.nombre
```

da:

```text
"Cerveza"
```

Y:

```js
producto.precio
```

da:

```text
2000
```

---

# 3. JavaScript: arrays

Un array es una lista.

```js
const productos = [
  {
    nombre: "Cerveza",
    precio: 2000
  },
  {
    nombre: "Pizza",
    precio: 5000
  }
]
```

Visualmente:

```text
productos
   │
   ├── posición 0 → Cerveza
   │
   └── posición 1 → Pizza
```

Podemos acceder al primer elemento:

```js
productos[0]
```

Y a su precio:

```js
productos[0].precio
```

Resultado:

```text
2000
```

---

# 4. `.map()`

`map()` sirve para recorrer un array y crear otro array a partir de sus elementos.

Por ejemplo:

```js
const nombres = ["Ana", "Juan", "Pedro"]

const mayusculas = nombres.map(
  nombre => nombre.toUpperCase()
)
```

Resultado:

```js
["ANA", "JUAN", "PEDRO"]
```

La pregunta mental para `map()` es:

> **¿Qué quiero hacer con cada elemento?**

## ¿Por qué se usa tanto en React?

Porque normalmente tenemos una lista de datos y queremos mostrar un componente por cada elemento.

```jsx
{productos.map(producto => (
  <p>{producto.nombre}</p>
))}
```

Esto significa:

> "Por cada producto, dibujame un `<p>` con su nombre."

---

# 5. `.filter()`

`filter()` sirve para quedarse solamente con los elementos que cumplen una condición.

```js
const numeros = [1, 2, 3, 4, 5]

const resultado = numeros.filter(
  numero => numero > 3
)
```

Resultado:

```js
[4, 5]
```

La pregunta mental para `filter()` es:

> **¿Cuáles quiero conservar?**

---

# 6. `.find()`

`find()` busca un solo elemento.

```js
const productos = [
  { nombre: "Cerveza", precio: 2000 },
  { nombre: "Pizza", precio: 5000 }
]

const producto = productos.find(
  p => p.nombre === "Cerveza"
)
```

Resultado:

```js
{
  nombre: "Cerveza",
  precio: 2000
}
```

Si no encuentra nada, devuelve:

```js
undefined
```

La pregunta mental:

> **¿Quiero encontrar UN elemento? → find()**

---

# 7. `.reduce()`

`reduce()` sirve para convertir muchos elementos en un único resultado.

Por ejemplo:

```js
const numeros = [10, 20, 30]

const total = numeros.reduce(
  (suma, numero) => suma + numero,
  0
)
```

Resultado:

```text
60
```

Pensalo paso a paso:

```text
suma = 0

entra 10 → suma = 10
entra 20 → suma = 30
entra 30 → suma = 60
```

La pregunta mental:

> **¿Quiero juntar muchos elementos en un solo resultado? → reduce()**

En el parcial se puede usar para calcular el total de una cuenta.

Por ejemplo:

```text
2 cervezas
2 × $2000 = $4000

1 pizza
1 × $5000 = $5000

TOTAL = $9000
```

---

# 8. Resumen de métodos de array

| Método | Qué hace | Pregunta mental |
|---|---|---|
| `map()` | transforma todos | ¿Qué hago con cada uno? |
| `filter()` | conserva algunos | ¿Cuáles quiero? |
| `find()` | busca uno | ¿Cuál es el que necesito? |
| `reduce()` | junta todo en un valor | ¿Cuál es el resultado final? |

---

# 9. Destructuring de objetos

Tenemos:

```js
const producto = {
  nombre: "Cerveza",
  precio: 2000
}
```

Sin destructuring:

```js
const nombre = producto.nombre
const precio = producto.precio
```

Con destructuring:

```js
const { nombre, precio } = producto
```

Esto significa:

> "Sacame las propiedades `nombre` y `precio` del objeto."

Ahora podemos usar directamente:

```js
nombre
precio
```

---

# 10. Destructuring de arrays

Si tenemos:

```js
const datos = ["Juan", 25]
```

podemos hacer:

```js
const [nombre, edad] = datos
```

Entonces:

```text
nombre → "Juan"
edad   → 25
```

La diferencia importante:

```js
// Objeto
const { nombre } = persona

// Array
const [nombre] = datos
```

---

# 11. Spread `...`

El spread sirve para copiar las propiedades de un objeto dentro de otro.

Tenemos:

```js
const persona = {
  nombre: "Juan",
  edad: 20
}
```

Podemos crear otra persona:

```js
const nuevaPersona = {
  ...persona,
  edad: 21
}
```

El resultado es:

```js
{
  nombre: "Juan",
  edad: 21
}
```

`...persona` significa:

> "Copiá todas las propiedades de persona."

---

# 12. ¿Por qué React usa tanto spread?

Porque en React no queremos modificar directamente el estado.

Mal:

```js
persona.edad = 21
```

Bien:

```js
setPersona({
  ...persona,
  edad: 21
})
```

La idea fundamental es:

> **En React, en lugar de modificar directamente el dato anterior, creamos una copia nueva.**

---

# 13. React: ¿qué es?

React sirve para crear interfaces de usuario a partir de componentes.

Un componente puede ser:

```jsx
function Producto() {
  return <h1>Cerveza</h1>
}
```

Y después podemos usarlo:

```jsx
<Producto />
```

En pantalla aparecerá:

```text
Cerveza
```

---

# 14. JSX

JSX permite escribir una sintaxis parecida a HTML dentro de JavaScript.

```jsx
<h1>Hola</h1>
```

Pero JSX tiene algunas diferencias con HTML.

Por ejemplo:

```jsx
<div className="card">
```

en lugar de:

```html
<div class="card">
```

También:

```jsx
<label htmlFor="nombre">
```

en lugar de:

```html
<label for="nombre">
```

Y los eventos usan camelCase:

```jsx
onClick
onChange
onSubmit
```

---

# 15. Expresiones JavaScript dentro de JSX

Dentro de JSX usamos `{}` para insertar expresiones de JavaScript.

```jsx
const nombre = "Juan"

return (
  <h1>Hola {nombre}</h1>
)
```

Muestra:

```text
Hola Juan
```

También podemos hacer:

```jsx
<p>{producto.precio}</p>
```

---

# 16. Componentes

Un componente es una función que devuelve JSX.

```jsx
function ProductoCard() {
  return (
    <div>
      <h2>Cerveza</h2>
      <p>$2000</p>
    </div>
  )
}
```

Los nombres de componentes deben empezar con mayúscula:

```jsx
ProductoCard
```

No:

```jsx
productoCard
```

Porque React interpreta los nombres que empiezan en minúscula como etiquetas HTML.

---

# 17. Props

Las props permiten pasar información de un componente padre a un componente hijo.

Por ejemplo:

```jsx
<ProductoCard producto={producto} />
```

Estamos pasando una prop llamada:

```text
producto
```

El hijo puede recibirla:

```jsx
function ProductoCard({ producto }) {
  return (
    <div>
      <h2>{producto.nombre}</h2>
      <p>${producto.precio}</p>
    </div>
  )
}
```

Pensalo como:

```text
PADRE
  │
  │ producto
  ↓
HIJO
```

Las props son de solo lectura.

El hijo no debería modificar directamente:

```js
producto.precio = 3000
```

---

# 18. `useState`

`useState` sirve para guardar datos que pueden cambiar y hacer que React vuelva a renderizar cuando cambian.

```js
const [cantidad, setCantidad] = useState(0)
```

Tenemos:

```text
cantidad
   ↓
valor actual

setCantidad
   ↓
función para cambiarlo
```

Al principio:

```text
cantidad = 0
```

Si hacemos:

```js
setCantidad(1)
```

React vuelve a renderizar y ahora:

```text
cantidad = 1
```

---

# 19. Ejemplo de useState

```jsx
function Contador() {
  const [cantidad, setCantidad] = useState(0)

  return (
    <>
      <p>{cantidad}</p>

      <button onClick={() => setCantidad(cantidad + 1)}>
        +
      </button>
    </>
  )
}
```

Inicialmente:

```text
0
```

Después de un click:

```text
1
```

Después:

```text
2
```

---

# 20. Algo importante sobre setState

Esto:

```js
setCantidad(5)

console.log(cantidad)
```

no significa que el `console.log` necesariamente vaya a mostrar `5`.

`setCantidad` pide un nuevo render.

La idea mental:

```text
setCantidad(5)
       ↓
"React, en el próximo render quiero 5"
```

---

# 21. Cuando el nuevo estado depende del anterior

Si el nuevo valor depende del anterior, podemos usar:

```js
setCantidad(prev => prev + 1)
```

`prev` representa el valor anterior.

Por ejemplo:

```js
setCantidad(prev => prev + 1)
```

significa:

> "Tomá el valor anterior y sumale 1."

---

# 22. Nunca mutar el estado

Mal:

```js
productos.push(nuevoProducto)
```

Bien:

```js
setProductos([
  ...productos,
  nuevoProducto
])
```

De nuevo:

> **No modificamos directamente el array viejo. Creamos uno nuevo.**

---

# 23. `useEffect`

`useEffect` sirve para ejecutar código relacionado con algo externo a React.

Un caso típico es pedir datos a una API.

```js
useEffect(() => {
  cargarProductos()
}, [])
```

El `[]` significa:

> Ejecutar una vez después del primer render.

---

# 24. Dependencias de useEffect

## `[]`

```js
useEffect(() => {
  ...
}, [])
```

Corre una vez al montar el componente.

## `[x]`

```js
useEffect(() => {
  ...
}, [x])
```

Corre cuando cambia `x`.

## Sin array

```js
useEffect(() => {
  ...
})
```

Corre después de cada render.

Esto puede provocar problemas si dentro hacemos `setState`.

Por ejemplo:

```text
render
 ↓
useEffect
 ↓
setState
 ↓
render
 ↓
useEffect
 ↓
setState
 ↓
...
```

Puede convertirse en un loop infinito.

---

# 25. useEffect y async

No hacemos:

```js
useEffect(async () => {
  ...
}, [])
```

Lo habitual es:

```js
useEffect(() => {

  async function cargar() {
    const respuesta = await fetch(...)
  }

  cargar()

}, [])
```

Para el parcial, recordá:

> **La función directamente pasada a `useEffect` no se declara `async`.**

---

# 26. Cleanup de useEffect

Si el efecto devuelve una función:

```js
useEffect(() => {

  ...

  return () => {
    // limpieza
  }

}, [])
```

React ejecuta esa función de limpieza cuando corresponde, por ejemplo al desmontar el componente.

Se usa para cosas como:

- timers
- listeners
- suscripciones

---

# 27. StrictMode

En desarrollo, React puede ejecutar efectos dos veces intencionalmente cuando usamos StrictMode.

Por eso podrías ver dos peticiones en Network aunque hayas escrito:

```js
useEffect(() => {
  cargar()
}, [])
```

No significa necesariamente que hayas cometido un error.

---

# 28. Listas y `key`

Si usamos:

```jsx
{productos.map((p) => (
  <ProductoCard
    key={p.id}
    producto={p}
  />
))}
```

`key` sirve para que React identifique cada elemento de la lista.

Debe ser:

- estable
- único entre hermanos

Lo ideal es:

```jsx
key={p.id}
```

Evitar el índice del array si la lista puede cambiar de orden, agregar o borrar elementos.

---

# 29. Renderizado condicional

Podemos decidir qué mostrar.

Por ejemplo:

```jsx
if (cargando) {
  return <p>Cargando...</p>
}
```

También:

```jsx
if (error) {
  return <p>{error}</p>
}
```

O:

```jsx
{productos.length > 0 && (
  <ul>
    ...
  </ul>
)}
```

Y:

```jsx
{ok ? <A /> : <B />}
```

---

# 30. Cuidado con `&&`

No conviene hacer:

```jsx
{productos.length && <ul>...</ul>}
```

Porque si:

```js
productos.length === 0
```

React puede mostrar:

```text
0
```

Mejor:

```jsx
{productos.length > 0 && <ul>...</ul>}
```

---

# 31. Estados de una página que carga datos

Una página que pide datos normalmente necesita tres cosas:

```text
datos
cargando
error
```

Por ejemplo:

```js
const [productos, setProductos] = useState([])
const [cargando, setCargando] = useState(true)
const [error, setError] = useState("")
```

Conceptualmente:

```text
           cargar datos
               ↓
          ¿qué pasó?
          /    |    \
         /     |     \
      datos  cargando  error
```

Esto aparece mucho en ejercicios de API.

---

# 32. HTTP y REST

Ahora conectamos React con el backend.

Tenemos:

```text
React
  │
  │ HTTP
  ↓
json-server
  │
  ↓
db.json
```

HTTP tiene distintos métodos.

| Acción | Método |
|---|---|
| Leer | GET |
| Crear | POST |
| Reemplazar | PUT |
| Modificar parcialmente | PATCH |
| Eliminar | DELETE |

Esto es CRUD:

```text
C → Create
R → Read
U → Update
D → Delete
```

---

# 33. json-server

`json-server` toma un archivo `db.json` y crea una API REST.

Por ejemplo, si tenemos:

```json
{
  "productos": [],
  "cuentas": []
}
```

podemos acceder a:

```text
GET /productos
GET /cuentas
```

También podemos:

```text
POST /productos
POST /cuentas

PUT /productos/1
PATCH /productos/1

DELETE /productos/1
```

---

# 34. GET

Para obtener productos:

```js
const respuesta = await fetch(
  "http://localhost:3000/productos"
)
```

Esto hace:

```text
GET /productos
```

---

# 35. `response.json()`

`fetch()` primero nos da una respuesta HTTP.

```js
const respuesta = await fetch(url)
```

Después necesitamos convertir el JSON de la respuesta a un objeto/array JavaScript:

```js
const datos = await respuesta.json()
```

Por eso muchas veces vemos:

```js
const respuesta = await fetch(url)
const datos = await respuesta.json()
```

Son dos pasos:

```text
fetch()
  ↓
respuesta HTTP
  ↓
response.json()
  ↓
datos JavaScript
```

---

# 36. `response.ok`

Un detalle muy importante:

`fetch` no tira automáticamente un error de JavaScript cuando recibe un 404 o 500.

Por eso conviene:

```js
if (!respuesta.ok) {
  throw new Error("Error al cargar datos")
}
```

---

# 37. POST

Para crear algo usamos POST.

```js
fetch("http://localhost:3000/productos", {
  method: "POST",

  headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    nombre: "Cerveza",
    precio: 2000
  })
})
```

---

# 38. `JSON.stringify()`

El objeto JavaScript:

```js
{
  nombre: "Cerveza",
  precio: 2000
}
```

se transforma en JSON:

```text
{"nombre":"Cerveza","precio":2000}
```

Eso es lo que mandamos en el `body`.

---

# 39. POST y el `id`

Al crear un recurso normalmente no mandamos el `id`:

```js
{
  nombre: "Cerveza",
  precio: 2000
}
```

El servidor genera el ID.

---

# 40. PUT vs PATCH

### PUT

Reemplaza el recurso entero.

```text
PUT → reemplazar todo
```

### PATCH

Modifica solamente determinados campos.

```text
PATCH → modificar una parte
```

---

# 41. CORS y puertos

Durante el desarrollo podemos tener:

```text
React / Vite
localhost:5173

json-server
localhost:3000
```

Como tienen puertos distintos, son orígenes distintos.

El navegador aplica reglas de CORS.

Si el backend no está levantado, es común ver:

```text
Failed to fetch
```

---

# 42. Formularios controlados

Un formulario controlado es un formulario cuyo valor está guardado en el estado de React.

Ejemplo:

```jsx
const [nombre, setNombre] = useState("")

<input
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
/>
```

El flujo es:

```text
usuario escribe
      ↓
onChange
      ↓
setNombre(...)
      ↓
estado cambia
      ↓
React renderiza
      ↓
input muestra el valor
```

React es la fuente de verdad.

---

# 43. `e.target.value`

Si tenemos:

```jsx
<input />
```

y el usuario escribe:

```text
Juan
```

entonces:

```js
e.target.value
```

vale:

```text
"Juan"
```

---

# 44. `name` en formularios

Podemos usar un único estado para varios inputs:

```js
const [formulario, setFormulario] = useState({
  cliente: "",
  cantidad: ""
})
```

Inputs:

```jsx
<input
  name="cliente"
  value={formulario.cliente}
  onChange={handleChange}
/>

<input
  name="cantidad"
  value={formulario.cantidad}
  onChange={handleChange}
/>
```

Y un solo handler:

```js
function handleChange(e) {
  const { name, value } = e.target

  setFormulario(prev => ({
    ...prev,
    [name]: value
  }))
}
```

---

# 45. ¿Qué significa `[name]: value`?

Supongamos:

```text
name = "cliente"
value = "Juan"
```

Entonces:

```js
[name]: value
```

se convierte en:

```js
cliente: "Juan"
```

Si:

```text
name = "cantidad"
```

se convierte en:

```js
cantidad: "2"
```

Por eso `[name]` es una **clave computada**.

---

# 46. `preventDefault()`

Cuando mandamos un formulario:

```jsx
<form onSubmit={handleSubmit}>
```

el navegador normalmente intenta recargar la página.

Para evitarlo:

```js
function handleSubmit(e) {
  e.preventDefault()
}
```

Significa:

> "No hagas el comportamiento predeterminado del navegador; yo me encargo."

Esto es muy importante en el parcial.

---

# 47. Los inputs devuelven strings

Incluso:

```jsx
<input type="number" />
```

entrega el valor como string.

Por ejemplo:

```text
"3500"
```

no:

```text
3500
```

Si necesitamos un número:

```js
Number(value)
```

Por ejemplo:

```js
const precio = Number(formulario.precio)
```

---

# 48. React Router

React Router permite tener diferentes páginas dentro de la aplicación.

Por ejemplo:

```text
/cuentas
/cuentas/nueva
```

---

# 49. BrowserRouter

Normalmente tenemos:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

Esto habilita el sistema de rutas.

Los hooks del router necesitan estar dentro de `BrowserRouter`.

---

# 50. Routes y Route

```jsx
<Routes>

  <Route
    path="/cuentas"
    element={<CuentasPage />}
  />

  <Route
    path="/cuentas/nueva"
    element={<NuevaCuentaPage />}
  />

</Routes>
```

Esto significa:

```text
URL                    COMPONENTE

/cuentas           →   CuentasPage

/cuentas/nueva     →   NuevaCuentaPage
```

---

# 51. `element`

En React Router usamos:

```jsx
element={<CuentasPage />}
```

No:

```jsx
element={CuentasPage}
```

Porque `element` espera un elemento JSX.

---

# 52. Parámetros dinámicos

Podemos tener:

```jsx
<Route
  path="/cuentas/:id"
  element={<CuentaDetail />}
/>
```

`:id` es un parámetro dinámico.

Si entramos a:

```text
/cuentas/15
```

podemos obtener:

```js
const { id } = useParams()
```

Y:

```text
id = "15"
```

Entonces podemos pedir:

```text
GET /cuentas/15
```

---

# 53. Link

Para navegar al hacer click:

```jsx
<Link to="/cuentas">
  Cuentas
</Link>
```

React Router cambia la ruta sin hacer una recarga completa de la página.

---

# 54. NavLink

`NavLink` es parecido a `Link`, pero además sabe si la ruta está activa.

```jsx
<NavLink to="/cuentas">
  Cuentas
</NavLink>
```

Podemos usar:

```jsx
className={({ isActive }) =>
  isActive ? styles.active : ""
}
```

Así podemos darle un estilo diferente a la página actual.

---

# 55. `useNavigate`

`useNavigate` sirve para navegar desde JavaScript.

```js
const navigate = useNavigate()
```

Después:

```js
navigate("/cuentas")
```

Un caso típico:

```text
usuario completa formulario
        ↓
POST
        ↓
cuenta creada
        ↓
navigate("/cuentas")
        ↓
volver a la lista
```

También:

```js
navigate(-1)
```

vuelve a la página anterior.

Y:

```js
navigate("/cuentas", {
  replace: true
})
```

reemplaza la entrada actual del historial.

---

# 56. No usar `<a href>` para rutas internas

Para rutas internas de React Router usamos:

```jsx
<Link to="/cuentas">
```

No:

```html
<a href="/cuentas">
```

El `<a>` hace una navegación tradicional y puede recargar la aplicación completa.

---

# 57. Catch-all 404

Podemos tener:

```jsx
<Route
  path="*"
  element={<NotFound />}
/>
```

`*` significa:

> "Cualquier ruta que no haya coincidido antes."

---

# 58. Context API

Ahora viene una parte más difícil.

Supongamos esta estructura:

```text
App
 │
 ├── NavBar
 │
 └── Routes
      │
      ├── CuentasPage
      │
      └── NuevaCuentaPage
```

Queremos mostrar en `NavBar`:

```text
Recaudación total: $25000
```

Pero los datos de las cuentas se manejan en otras partes.

Podríamos pasar props por muchos componentes:

```text
App
 ↓
Routes
 ↓
CuentasPage
 ↓
...
```

Eso se llama:

**prop drilling**

---

# 59. ¿Qué problema resuelve Context?

Context permite compartir información entre componentes sin pasar props manualmente por todos los niveles.

Pensalo así:

```text
             CONTEXT
             /     \
            ↓       ↓
         NavBar   Page
```

Ambos pueden acceder al mismo dato.

---

# 60. Las tres piezas de Context

Las tres cosas principales son:

```text
createContext
Provider
useContext
```

---

# 61. `createContext`

Creamos el contexto:

```js
const RecaudacionContext = createContext({
  total: 0
})
```

Es como crear un espacio compartido llamado:

```text
RecaudacionContext
```

---

# 62. Provider

El Provider proporciona los datos.

```jsx
<RecaudacionContext.Provider value={{ total }}>
  {children}
</RecaudacionContext.Provider>
```

Los componentes que estén dentro del Provider pueden consumir el contexto.

Visualmente:

```text
Provider
   │
   ├── NavBar
   ├── CuentasPage
   └── NuevaCuentaPage
```

---

# 63. `children`

Si hacemos:

```jsx
<Provider>
  <App />
</Provider>
```

lo que está dentro:

```jsx
<App />
```

es:

```js
children
```

Por eso un Provider suele ser:

```jsx
function RecaudacionProvider({ children }) {
  return (
    <RecaudacionContext.Provider>
      {children}
    </RecaudacionContext.Provider>
  )
}
```

---

# 64. `useContext`

Para consumir el contexto:

```js
const { total } = useContext(RecaudacionContext)
```

Ahora ese componente puede utilizar:

```js
total
```

---

# 65. Hook personalizado

Es común crear:

```js
export function useRecaudacion() {
  return useContext(RecaudacionContext)
}
```

Entonces en otro componente:

```js
const { total } = useRecaudacion()
```

Esto hace que el uso sea más cómodo.

Un hook personalizado es una función cuyo nombre empieza con `use` y que puede utilizar otros hooks.

---

# 66. Provider: detalle MUY importante

El componente que consume el contexto debe estar dentro del Provider.

Correcto:

```text
Provider
 ├── NavBar
 └── App
```

Incorrecto:

```text
NavBar

Provider
 └── App
```

Si `NavBar` está afuera, no recibe el valor proporcionado por ese Provider.

---

# 67. Reglas de los hooks

Los hooks como:

```js
useState()
useEffect()
useContext()
useNavigate()
useParams()
```

deben llamarse:

1. En el nivel superior del componente.
2. Desde componentes de React o hooks personalizados.

No:

```js
if (algo) {
  useState()
}
```

No:

```js
for (...) {
  useEffect(...)
}
```

La razón es que React identifica los hooks por el orden en que se llaman.

---

# 68. CSS Modules

Un CSS Module suele tener un nombre como:

```text
CuentasPage.module.css
```

En el componente:

```js
import styles from "./CuentasPage.module.css"
```

Y usamos:

```jsx
<div className={styles.card}>
```

Si el CSS tiene:

```css
.card {
  border: 1px solid black;
}
```

entonces:

```jsx
className={styles.card}
```

aplica esa clase.

---

# 69. CSS Modules como objeto

Pensalo así:

```text
styles
  │
  ├── card
  ├── client
  └── total
```

Por eso:

```jsx
styles.card
```

funciona.

Si una clase tiene guiones:

```css
.mi-clase {
}
```

podemos usar:

```jsx
styles["mi-clase"]
```

---

# 70. Estructura de datos del parcial

Este punto es especialmente importante.

Productos:

```text
{
  id,
  icono,
  nombre,
  precio
}
```

Cuentas:

```text
{
  id,
  cliente,
  productos: [
    {
      icono,
      nombre,
      cantidad
    }
  ]
}
```

La cuenta **no guarda el ID del producto**.

Guarda una copia de:

```text
nombre
icono
cantidad
```

Por eso necesitamos las dos listas:

```text
productos
cuentas
```

---

# 71. ¿Cómo encontramos el precio?

Supongamos que una cuenta tiene:

```js
{
  nombre: "Cerveza",
  cantidad: 2
}
```

Pero el precio está en:

```js
productos
```

Entonces buscamos:

```js
const producto = productos.find(
  p => p.nombre === consumo.nombre
)
```

Estamos diciendo:

> "Buscá el producto cuyo nombre sea igual al nombre del producto consumido."

Después:

```text
cantidad × precio
```

Por ejemplo:

```text
2 × 2000 = 4000
```

---

# 72. Funciones que ya puede proporcionar el parcial

Si el proyecto tiene funciones como:

```js
totalDeCuenta(cuenta, productos)
totalRecaudado(cuentas, productos)
formatoPrecio(valor)
```

y ya están implementadas en `utils/cuentas.js`, lo correcto es importarlas:

```js
import {
  totalDeCuenta,
  totalRecaudado,
  formatoPrecio
} from "../utils/cuentas"
```

No hace falta reimplementarlas si el ejercicio ya las proporciona.

---

# 73. Cómo se conecta TODO cuando abrimos `/cuentas`

Cuando abrimos:

```text
/cuentas
```

ocurre algo parecido a esto:

```text
1. React muestra CuentasPage
          ↓
2. useEffect se ejecuta
          ↓
3. fetch pide cuentas y productos
          ↓
4. json-server responde
          ↓
5. guardamos los datos con useState
          ↓
6. React vuelve a renderizar
          ↓
7. cuentas.map(...)
          ↓
8. se crea una CuentaCard por cuenta
          ↓
9. buscamos los productos con find()
          ↓
10. calculamos cantidad × precio
          ↓
11. mostramos el total
```

---

# 74. Cómo se conecta TODO al crear una cuenta

Cuando el usuario completa el formulario:

```text
usuario escribe
      ↓
onChange
      ↓
setFormulario
      ↓
estado actualizado
      ↓
onSubmit
      ↓
preventDefault()
      ↓
POST
      ↓
json-server
      ↓
cuenta creada
      ↓
navigate("/cuentas")
      ↓
lista de cuentas
```

---

# 75. El mapa completo

```text
                         APLICACIÓN
                             │
             ┌───────────────┴───────────────┐
             │                               │
           React                           Router
             │                               │
      ┌──────┴──────┐              ┌─────────┴─────────┐
      │             │              │                   │
   Componentes   Estado         /cuentas          /cuentas/nueva
      │          useState
      │
      ├── Props
      ├── JSX
      └── useEffect
              │
              ↓
            fetch
              │
              ↓
         json-server
              │
              ↓
           db.json
```

Y Context:

```text
                Context
               /       \
              ↓         ↓
           NavBar     Pages
```

---

# 76. Orden recomendado para estudiar

No intentes aprender todo junto.

Estudialo en este orden:

## NIVEL 1 — JavaScript

Primero:

```text
objetos
arrays
map
filter
find
reduce
destructuring
spread
```

Tenés que poder entender:

```js
const productos = [
  { id: 1, nombre: "Cerveza", precio: 2000 },
  { id: 2, nombre: "Pizza", precio: 5000 }
]
```

y:

```js
productos[0]
productos[0].nombre

productos.map(...)
productos.filter(...)
productos.find(...)
productos.reduce(...)
```

---

## NIVEL 2 — React básico

Después:

```text
componentes
JSX
props
useState
useEffect
```

---

## NIVEL 3 — API

Después:

```text
fetch
GET
POST
PUT
PATCH
DELETE
JSON.stringify
response.json()
response.ok
```

---

## NIVEL 4 — Formularios

Después:

```text
value
onChange
e.target
name
preventDefault
Number()
```

---

## NIVEL 5 — Router

Después:

```text
BrowserRouter
Routes
Route
Link
NavLink
useNavigate
useParams
```

---

## NIVEL 6 — Context

Por último:

```text
createContext
Provider
children
useContext
```

---

# 77. Tabla final para memorizar

| Concepto | Pensalo como... |
|---|---|
| objeto | ficha con propiedades |
| array | lista |
| `map()` | hacer algo con todos |
| `filter()` | quedarse con algunos |
| `find()` | buscar uno |
| `reduce()` | juntar todo en un resultado |
| destructuring | sacar datos de un objeto/array |
| spread `...` | copiar datos |
| componente | una parte de la interfaz |
| JSX | HTML dentro de JavaScript |
| props | datos que el padre pasa al hijo |
| `useState` | guardar datos que cambian |
| `useEffect` | ejecutar efectos externos |
| `fetch` | comunicarse con una API |
| GET | obtener |
| POST | crear |
| PUT | reemplazar |
| PATCH | modificar |
| DELETE | borrar |
| formulario controlado | input conectado al estado |
| `preventDefault()` | evitar la recarga del formulario |
| `BrowserRouter` | habilitar Router |
| `Route` | relacionar URL con página |
| `Link` | navegar haciendo click |
| `NavLink` | Link que sabe si está activo |
| `useNavigate` | navegar desde código |
| `useParams` | obtener parámetros de la URL |
| Context | compartir datos sin prop drilling |
| Provider | proporcionar los datos del Context |
| `useContext` | consumir el Context |
| CSS Module | CSS aislado por componente |

---

# 78. Lo más importante

No necesitás memorizar cada línea.

Tenés que poder mirar código y traducirlo mentalmente.

Por ejemplo:

```jsx
{productos.map((p) => (
  <ProductoCard
    key={p.id}
    producto={p}
  />
))}
```

y entender:

> "Recorro todos los productos y creo una `ProductoCard` para cada uno. Le paso el producto como prop y uso su ID como key."

O:

```js
useEffect(() => {
  cargarProductos()
}, [])
```

y entender:

> "Cuando se monta la página, cargo los productos una vez."

O:

```js
const { id } = useParams()
```

y entender:

> "Estoy sacando el `id` de la URL."

O:

```js
setFormulario(prev => ({
  ...prev,
  [name]: value
}))
```

y entender:

> "Copio el formulario anterior y cambio solamente el campo que modificó el usuario."

Cuando puedas hacer esa traducción, ya no estás memorizando React: **lo estás entendiendo**.
