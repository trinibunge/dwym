# JavaScript — Teórico Parcial 1 (Programación Web y Mobile)

Este documento reúne todos los conceptos teóricos y prácticos de **JavaScript (ES6+)** necesarios para resolver con éxito los ejercicios de programación en el **Parcial 1**.

---

## 1. Fundamentos de JavaScript

### 1.1 Variables y Constantes
En JavaScript moderno (ES6+) declaramos variables con `const` y `let`. La palabra reservada `var` se considera obsoleta por su alcance de función (*function scope*) y *hoisting* propenso a errores.

- **`const`**: Para valores que no serán reasignados. Es la opción por defecto.
  > **Ojo:** Si la constante es un Objeto o Array, sus propiedades o elementos **sí se pueden modificar** (mutar), lo que no se puede es reasignar la variable a otro objeto/valor.
- **`let`**: Para variables cuyo valor cambiará a lo largo del programa (ej. contadores, acumuladores). Tiene alcance de bloque (*block scope* `{}`).

```js
const maxIntentos = 3;
let contador = 0;
contador++; // OK

const usuario = { nombre: "Ana" };
usuario.nombre = "María"; // OK (mutación de propiedad)
// usuario = { nombre: "Pedro" }; // Error: Assignment to constant variable.
```

### 1.2 Tipos de Datos y Operadores

- **Primitivos**: `number`, `string`, `boolean`, `undefined`, `null`, `symbol`, `bigint`.
- **Objetos**: `Object`, `Array`, `Function`, `Date`, etc.
- **Igualdad estricta (`===` y `!==`)**: **SIEMPRE** usar igualdad estricta (`===`) en lugar de igualdad débil (`==`). La igualdad estricta compara **valor y tipo de dato** sin realizar coerción implícita.

```js
5 == "5"  // true  (evitar!)
5 === "5" // false (correcto)
```

- **Operador Nulish Coalescing (`??`) y Optional Chaining (`?.`)**:
```js
// Optional Chaining: evita errores de "Cannot read properties of undefined"
const pais = datos?.ubicacion?.pais;

// Nullish Coalescing: asigna valor por defecto si es null o undefined (no si es 0 o "")
const limite = opciones.limite ?? 10;
```

---

## 2. Funciones

### 2.1 Declaración vs Expresión y Arrow Functions

```js
// 1. Declaración de Función (tiene hoisting)
function sumar(a, b) {
  return a + b;
}

// 2. Expresión de Función
const restar = function(a, b) {
  return a - b;
};

// 3. Función Flecha (Arrow Function) - Sintaxis concisa y sin 'this' propio
const multiplicar = (a, b) => a * b;

// Retorno implícito de objeto en arrow function (se envuelve en paréntesis):
const crearUsuario = (nombre) => ({ id: Date.now(), nombre });
```

### 2.2 Parámetros por Defecto y Rest/Spread

```js
// Parámetros por defecto
function saludar(nombre = "Invitado") {
  return `Hola, ${nombre}`;
}

// Parámetro Rest (...rest): agrupa argumentos restantes en un Array
function sumarTodos(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
```

---

## 3. Manipulación de Objetos y Arrays (Clave Ejercicio 2)

El Ejercicio 2 del parcial típicamente requiere procesar colecciones de datos JSON (listas de libros, usuarios, países, productos, etc.).

### 3.1 Métodos de Array de Alto Orden (*Iteradores*)

| Método | Retorno | Propósito | Ejemplo |
|---|---|---|---|
| `forEach(cb)` | `undefined` | Recorrer sin retornar un nuevo array | `arr.forEach(x => console.log(x))` |
| `map(cb)` | `Array` | Transformar cada elemento en uno nuevo | `arr.map(x => x.nombre)` |
| `filter(cb)` | `Array` | Filtrar elementos que cumplan una condición (booleano) | `arr.filter(x => x.activo)` |
| `find(cb)` | `Elemento \| undefined` | Devuelve el **primer** elemento que cumpla la condición | `arr.find(x => x.id === 5)` |
| `findIndex(cb)` | `number` (`-1` si no está) | Posición del primer elemento que cumple condición | `arr.findIndex(x => x.id === 5)` |
| `some(cb)` | `boolean` | `true` si **al menos un** elemento cumple | `arr.some(x => x.edad >= 18)` |
| `every(cb)` | `boolean` | `true` si **todos** los elementos cumplen | `arr.every(x => x.stock > 0)` |
| `reduce(cb, init)` | `Cualquiera` | Acumular/reducir el array a un único valor (número, objeto, etc.) | `arr.reduce((acc, x) => acc + x.precio, 0)` |
| `includes(elem)` | `boolean` | Verifica si un elemento primitivo o valor está presente | `[1, 2, 3].includes(2)` |

#### Ejemplos Prácticos de Búsqueda y Filtrado Flexible:

```js
// Buscar libros por múltiples criterios dinámicos
function buscarLibros(libros, criterios = {}) {
  return libros.filter(libro => {
    // Si el criterio existe, el libro debe coincidir
    if (criterios.categoria && libro.categoria.toLowerCase() !== criterios.categoria.toLowerCase()) {
      return false;
    }
    if (criterios.disponible !== undefined && libro.disponible !== criterios.disponible) {
      return false;
    }
    if (criterios.titulo && !libro.titulo.toLowerCase().includes(criterios.titulo.toLowerCase())) {
      return false;
    }
    return true;
  });
}
```

```js
// Filtrar países que utilicen una moneda específica (ejercicio de parcial)
export function countriesForCurrency(data, currency) {
  if (!Array.isArray(data)) {
    throw new Error("Datos inválidos");
  }

  return data
    .filter(country => {
      // Validaciones de estructura requerida
      if (!country.cca2 || !country.currencies) {
        throw new Error("Estructura de país inválida");
      }
      // country.currencies es un objeto cuyas claves son los códigos de moneda (ej: { EUR: { name: "Euro" } })
      return Object.keys(country.currencies).includes(currency);
    })
    .map(country => country.cca2);
}
```

### 3.2 Desestructuración (Destructuring) y Operador Spread (`...`)

```js
// Desestructuración de Objetos
const persona = { id: 1, nombre: "Juan", rol: "Admin" };
const { nombre, rol } = persona;

// Desestructuración de Arrays
const coordenadas = [10, 20];
const [x, y] = coordenadas;

// Operador Spread (...) para clonar/fusionar sin mutar el original
const original = [1, 2, 3];
const copia = [...original, 4]; // [1, 2, 3, 4]

const objetoBase = { a: 1, b: 2 };
const objetoExtendido = { ...objetoBase, c: 3, b: 99 }; // { a: 1, b: 99, c: 3 }
```

### 3.3 Métodos Útiles de `Object` y `String`

- **`Object.keys(obj)`**: Arreglo con las claves del objeto.
- **`Object.values(obj)`**: Arreglo con los valores del objeto.
- **`Object.entries(obj)`**: Arreglo de pares `[clave, valor]`.
- **`str.toLowerCase()` / `str.toUpperCase()`**: Convertir a minúsculas/mayúsculas para comparaciones no sensibles a mayúsculas.
- **`str.includes(sub)`**: Comprobar si una subcadena está contenida.
- **`str.trim()`**: Eliminar espacios en blanco al inicio y final.

---

## 4. Manipulación del DOM y Eventos (Clave Ejercicio 3)

El Ejercicio 3 evalúa la capacidad de interactuar dinámicamente con la interfaz visual (HTML) utilizando JavaScript.

### 4.1 Selección de Elementos

```js
// Métodos preferidos
const elementoUnico = document.querySelector("#mi-id");
const todosLosElementos = document.querySelectorAll(".mi-clase"); // Retorna NodeList (iterable)

// Otros métodos
const porId = document.getElementById("mi-id");
```

### 4.2 Modificación de Elementos y Estilos

```js
const caja = document.querySelector(".caja");

// Texto y Contenido
caja.textContent = "Nuevo texto seguro"; // Recomendado para texto plano
caja.innerHTML = "<span>Texto con HTML</span>"; // Para insertar markup

// Atributos
caja.setAttribute("src", "imagen.png");
const src = caja.getAttribute("src");
caja.removeAttribute("disabled");

// Clases CSS
caja.classList.add("activa");
caja.classList.remove("oculto");
caja.classList.toggle("destacado"); // Agrega si no está, quita si está
const tieneClase = caja.classList.contains("activa");

// Estilos directos
caja.style.backgroundColor = "blue";
caja.style.display = "flex";
```

### 4.3 Creación e Inserción Dinámica de Elementos

```js
// Crear un nuevo elemento
const nuevoLi = document.createElement("li");
nuevoLi.textContent = "Nuevo ítem";
nuevoLi.classList.add("item-lista");

// Agregar al DOM
const lista = document.querySelector("#mi-lista");
lista.appendChild(nuevoLi); // Lo agrega al final

// Limpiar un contenedor antes de renderizar
lista.innerHTML = "";
```

### 4.4 Manejo de Eventos (`addEventListener`)

```js
const boton = document.querySelector("#btn-enviar");

boton.addEventListener("click", (event) => {
  console.log("¡Click detectado!");
  console.log("Elemento clickeado:", event.target);
});

// Formularios y evitación del comportamiento por defecto (refresh)
const formulario = document.querySelector("#mi-formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Detiene el envío predeterminado del formulario HTML

  const inputNombre = document.querySelector("#nombre");
  console.log("Nombre ingresado:", inputNombre.value);
});
```

**Eventos comunes:** `click`, `submit`, `input` (al escribir en un campo), `change` (al seleccionar un opción/checkbox), `keydown` / `keyup`.

---

## 5. JavaScript Asíncrono, API Fetch y REST (Clave Ejercicio 4)

El Ejercicio 4 habitualmente implica interactuar con una **API REST** (ej. simulada con `json-server` o en un backend Node.js) consumiendo o modificando recursos vía HTTP.

### 5.1 Promesas y `async` / `await`

Un flujo asíncrono se maneja de forma limpia y legible usando sintaxis `async / await`.

```js
async function obtenerDatos() {
  try {
    const respuesta = await fetch("http://localhost:3000/productos");

    // Verificar si la respuesta HTTP fue exitosa (status 200-299)
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    const datos = await respuesta.json(); // Parsea la respuesta JSON
    return datos;
  } catch (error) {
    console.error("Ocurrió un error al cargar datos:", error);
  }
}
```

### 5.2 Operaciones CRUD con `fetch`

#### GET (Obtener datos)
```js
async function getUsuarios() {
  const res = await fetch("http://localhost:3000/users");
  const users = await res.json();
  return users;
}
```

#### POST (Crear nuevo recurso)
```js
async function crearUsuario(nuevoUsuario) {
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoUsuario) // Convierte el objeto JS a String JSON
  });

  const usuarioCreado = await res.json();
  return usuarioCreado;
}
```

#### PUT / PATCH (Actualizar recurso existente)
- `PUT`: Reemplaza el objeto completo.
- `PATCH`: Modifica parcialmente solo las propiedades enviadas.

```js
async function actualizarUsuario(id, datosActualizados) {
  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datosActualizados)
  });

  return await res.json();
}
```

#### DELETE (Eliminar recurso)
```js
async function eliminarUsuario(id) {
  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}
```

---

## 6. Manejo de Errores y Validaciones

En los parciales es común que las consignas soliciten **lanzar un error** (`throw new Error(...)`) si los parámetros ingresados o los datos no cumplen con la estructura esperada.

### 6.1 Lanzar Errores Explícitos (`throw`)

```js
function procesarPago(monto) {
  if (typeof monto !== "number" || monto <= 0) {
    throw new Error("El monto debe ser un número mayor a cero.");
  }
  // Lógica del pago...
}
```

### 6.2 Capturar Errores con `try...catch`

```js
try {
  procesarPago(-50);
} catch (error) {
  console.error("Capturado:", error.message); // "El monto debe ser un número mayor a cero."
}
```

---

## 7. Resumen y Estrategias por Ejercicio para el Parcial

### Ejercicio 2: Lógica pura, Arrays y Objetos
- **Qué se evalúa:** Algoritmos, métodos iterativos de arrays (`map`, `filter`, `reduce`, `find`), manejo de objetos y validaciones de errores.
- **Tip:** Lee con atención las condiciones y restricciones. Recuerda retornar los valores requeridos y lanzar `Error` si falta algún campo obligatorio.
- **Ejemplo:** Filtrar elementos según criterios o acumular/mapear transformando estructuras JSON.

### Ejercicio 3: Manipulación del DOM e Interactividad
- **Qué se evalúa:** Selección de elementos (`querySelector`), eventos (`click`, `submit`), manipulación de clases (`classList`), actualización de textos o creación de nodos dinámicos.
- **Tip:** Al trabajar con eventos de formulario (`submit`), recuerda siempre ejecutar `e.preventDefault()`. Verifica tener vinculados correctamente el script JS con la etiqueta `<script src="..."></script>` en el HTML.

### Ejercicio 4: Asincronismo y Conexión con API (`fetch` / `json-server`)
- **Qué se evalúa:** Consumo de endpoints REST con `async/await` y `fetch`, envío de payloads en formato JSON con headers adecuados (`Content-Type: application/json`), renderizado de la respuesta en la interfaz.
- **Tip:** Recuerda convertir tus objetos JS a String con `JSON.stringify(...)` en peticiones `POST`/`PUT`/`PATCH` y siempre parsear la respuesta con `await response.json()`.
