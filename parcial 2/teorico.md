# Guía de estudio — Parcial 2 DWYM

*Basada en el análisis de 6 exámenes/simulacros anteriores (2025 sem1, 2025 sem2, 2026 sem1) y en un apunte teórico de repaso. El foco principal es 2026sem1 (Prueba 2 y su simulacro), por ser el antecedente más reciente y similar.*

**Índice:**
0. [Resumen teórico — lo esencial para entender](#0-resumen-teórico--lo-esencial-para-entender-no-memorizar)
1. [Panorama general: qué NO cambia nunca](#1-panorama-general-qué-no-cambia-nunca)
2. [El antecedente más importante: 2026 sem1](#2-el-antecedente-más-importante-2026-sem1-prueba-2-y-simulacro)
3. [Patrones que se repiten entre TODOS los años](#3-patrones-que-se-repiten-entre-todos-los-años-no-solo-2026)
4. [Diferencias según el semestre](#4-diferencias-a-tener-en-cuenta-según-el-semestre)
5. [Checklist de repaso técnico](#5-checklist-de-repaso-técnico-por-si-tenés-que-practicar-antes-del-examen)
6. [Estrategia para el día del examen](#6-estrategia-para-el-día-del-examen)

---

## 0. Resumen teórico — lo esencial para entender (no memorizar)

Antes de mirar los patrones de examen, esto es la base conceptual mínima. La idea no es memorizar sintaxis sino poder **traducir código a lenguaje humano** con solo mirarlo.

### 0.1 JavaScript base

| Concepto | Qué es | Pregunta mental |
|---|---|---|
| Objeto `{ }` | Ficha con propiedades (`producto.precio`) | "¿qué datos tiene?" |
| Array `[ ]` | Lista de elementos, accesible por posición (`productos[0]`) | "¿qué colección es?" |
| `.map()` | Transforma **todos** los elementos en otro array | "¿qué hago con cada uno?" |
| `.filter()` | Se queda solo con los que cumplen una condición | "¿cuáles quiero?" |
| `.find()` | Busca **un único** elemento (o `undefined` si no hay) | "¿cuál es el que necesito?" |
| `.reduce()` | Junta todos los elementos en **un solo resultado** (ej. un total) | "¿cuál es el resultado final?" |
| Destructuring `{ a, b }` / `[a, b]` | Sacar propiedades de un objeto o valores de un array a variables sueltas | "sacame esto de ahí" |
| Spread `...` | Copiar las propiedades de un objeto/array dentro de otro nuevo | "copiá todo esto acá" |

**Regla de oro de React con el spread:** nunca modificar el estado directamente (`persona.edad = 21` ❌). Siempre crear una copia nueva: `setPersona({ ...persona, edad: 21 })` ✅.

### 0.2 Componentes, props y estado

- **Componente** = función que devuelve JSX (HTML dentro de JS).
- **Props** = datos que un padre le pasa a un hijo (`<ProductoCard producto={producto} />`). Son de **solo lectura**: el hijo no debe modificarlas.
- **`useState`** = variable que "recuerda" su valor entre renders y hace que React vuelva a dibujar la pantalla cuando cambia (`const [cantidad, setCantidad] = useState(0)`).
  - Si el nuevo valor depende del anterior, usar la forma funcional: `setCantidad(prev => prev + 1)`.
- **`useEffect`** = ejecutar código relacionado con algo "externo" a React (típicamente, pedir datos a una API).
  - `useEffect(fn, [])` → corre **una sola vez**, al montar el componente. Es el patrón típico para el `fetch` inicial de una página.
  - `useEffect(fn, [x])` → corre cada vez que cambia `x`.
  - `useEffect(fn)` sin array → corre en **cada** render (cuidado: puede generar loops infinitos si adentro hay un `setState`).
- **Listas con `key`**: al usar `.map()` para renderizar, cada elemento necesita una `key` estable y única (idealmente `p.id`, no el índice del array).
- **Renderizado condicional**: `if (cargando) return <p>Cargando...</p>`, o `{condicion && <Algo/>}`, o `{ok ? <A/> : <B/>}`.

### 0.3 HTTP, REST y json-server

- CRUD = **C**reate/**R**ead/**U**pdate/**D**elete, mapeado a métodos HTTP:

| Acción | Método |
|---|---|
| Leer | `GET` |
| Crear | `POST` |
| Reemplazar entero | `PUT` |
| Modificar parcialmente | `PATCH` |
| Eliminar | `DELETE` |

- `json-server` convierte un `db.json` en una API REST automáticamente (`GET /productos`, `POST /productos`, etc.).
- El flujo típico de una llamada:
  1. `const respuesta = await fetch(url)` → devuelve una respuesta HTTP (todavía no los datos).
  2. **Siempre chequear** `if (!respuesta.ok) throw new Error(...)` — `fetch` **no** tira error automáticamente ante un 404/500.
  3. `const datos = await respuesta.json()` → recién ahí se obtiene el objeto/array de JS.
- Para `POST`/`PUT`/`PATCH` hay que mandar `headers: { "Content-Type": "application/json" }` y `body: JSON.stringify(objeto)`. Al crear, normalmente **no se manda el `id`** (lo genera el servidor).
- `PUT` reemplaza el recurso completo; `PATCH` solo los campos que se envían.

### 0.4 Formularios controlados

- Un input "controlado" tiene su valor guardado en el estado de React: `<input value={nombre} onChange={e => setNombre(e.target.value)} />`. React es la "fuente de verdad", no el DOM.
- **Todos** los inputs (incluso `type="number"`) devuelven strings — si se necesita un número, convertir con `Number(valor)`.
- Para manejar varios campos con un solo estado (objeto), se usa el atributo `name` del input + una clave computada:
  ```js
  function handleChange(e) {
    const { name, value } = e.target
    setFormulario(prev => ({ ...prev, [name]: value }))
  }
  ```
  `[name]: value` arma dinámicamente la propiedad a actualizar (ej. si `name="cliente"`, actualiza `cliente`).
- `onSubmit={handleSubmit}` con `e.preventDefault()` dentro es obligatorio para que el navegador no recargue la página al enviar el formulario.

### 0.5 React Router

- `<BrowserRouter>` envuelve la app y habilita el sistema de rutas (los hooks de router necesitan estar dentro).
- `<Routes>` + `<Route path="/x" element={<X/>} />` asocian una URL con un componente. Ojo: `element={<X/>}` (JSX), no `element={X}`.
- Rutas dinámicas: `path="/cuentas/:id"` + `const { id } = useParams()` para leer el parámetro y pedir el detalle a la API.
- `<Link to="/cuentas">` navega sin recargar la página (nunca usar `<a href>` para rutas internas). `<NavLink>` es igual pero sabe si la ruta está activa (útil para resaltar el ítem de menú actual).
- `useNavigate()` sirve para navegar **desde código JS**, no desde un click directo — el caso típico es redirigir después de un `POST`/`PUT` exitoso: `navigate("/cuentas")`.
- `<Route path="*" element={<NotFound/>} />` captura cualquier ruta no encontrada (404).

### 0.6 Context API (el tema que más cuesta)

- Problema que resuelve: evitar el **"prop drilling"** (pasar una prop manualmente por muchos niveles de componentes que no la usan, solo para que llegue al que sí la necesita).
- Tres piezas:
  1. `createContext(valorPorDefecto)` — crea el "espacio compartido".
  2. `<MiContext.Provider value={...}>{children}</MiContext.Provider>` — provee el valor a todo lo que esté **adentro** (`children` = lo que se pasa entre las etiquetas del Provider).
  3. `useContext(MiContext)` — lo consume cualquier componente que esté dentro del Provider.
- Es muy común envolver esto en un **hook personalizado** (`useRecaudacion()` que internamente hace `useContext(...)`) para que el uso sea más prolijo.
- **Error clásico:** un componente que está **fuera** del `<Provider>` en el árbol no puede consumir ese contexto — hay que revisar bien dónde se coloca el Provider en `App.jsx`.

### 0.7 Reglas de los hooks

- Los hooks (`useState`, `useEffect`, `useContext`, `useNavigate`, `useParams`, etc.) se llaman **siempre** en el nivel superior del componente — nunca dentro de un `if`, un `for` ni una función anidada. React los identifica por el orden en que se llaman, así que ese orden no puede variar entre renders.

### 0.8 CSS Modules

- Un archivo `Componente.module.css` se importa como objeto: `import styles from "./Componente.module.css"`.
- Cada clase CSS pasa a ser una propiedad de ese objeto: `.card { }` → se usa como `className={styles.card}`.
- Si una clase tiene guiones (`.mi-clase`), se accede como `styles["mi-clase"]`.
- Esto aísla los estilos por componente (no hay colisión de nombres de clases entre componentes distintos).

### 0.9 El "mental model" completo de una pantalla típica

Flujo de **listar datos** (ej. entrar a `/cuentas`):
```
se monta la página → useEffect → fetch(GET) → json-server responde
→ se guarda con useState → React re-renderiza → .map() sobre los datos
→ se arma un componente por ítem (con su key) → si hace falta, .find()/.reduce()
  para cruzar con otra lista (ej. precios) y calcular totales
```

Flujo de **crear/editar** (ej. enviar un formulario):
```
usuario escribe → onChange → setFormulario({...prev, [name]: value})
→ onSubmit → preventDefault() → fetch(POST/PUT/PATCH) con JSON.stringify(body)
→ json-server confirma → navigate(...) de vuelta al listado
```

Con estos dos flujos (leer y escribir) se resuelve la enorme mayoría de los ejercicios de todos los exámenes analizados — son, en esencia, siempre la misma receta aplicada a distintos datos (tareas, cuentas, países, comidas).

---

## 1. Panorama general: qué NO cambia nunca

En **todos** los exámenes analizados (mobile o web) se repite el mismo esqueleto:

1. Es una app de **CRUD** sobre **un recurso principal** (tareas, comidas, cuentas, países) consumido desde un **backend fake** (`json-server`).
2. Hay **navegación entre 2 y 4 vistas** con un router (`React Router` en web, `expo-router` en mobile).
3. Siempre hay que:
   - **Listar** un recurso (`GET` + `.map()`).
   - **Ver el detalle** de un ítem por `id`/`:param` de la URL.
   - **Crear** un ítem nuevo con un formulario (`POST`).
   - En varios casos, **editar/actualizar** (`PUT`/`PATCH`) y a veces **borrar** (`DELETE`).
4. El código entregado **siempre viene con parte hecha y parte con `// TODO`** — nunca se arranca de cero. Hay que leer bien qué ya está resuelto antes de reescribir.
5. Se evalúa por **ejercicios independientes** (típicamente 6), cada uno con criterios de corrección explícitos, y la regla recurrente es **"5 de 6 = 100%"**. Conviene resolver en orden y no trabarse en uno.
6. Siempre hay un archivo de **diseño/bosquejo** (`.excalidraw`, `.png`, `.svg`) que muestra la UI esperada — mirar eso antes de codear.
7. Siempre hay una **colección de Postman/Bruno** o instrucciones de endpoints para probar la API sin depender del frontend.

---

## 2. El antecedente más importante: 2026 sem1 (Prueba 2 y Simulacro)

Ambos exámenes de 2026 comparten la **misma arquitectura de carpetas**, que es casi seguro el molde para el próximo examen:

```
src/
├── components/
│   └── NombreComponente/
│       ├── NombreComponente.jsx
│       └── NombreComponente.module.css
├── pages/
│   └── NombrePage/
│       ├── NombrePage.jsx
│       └── NombrePage.module.css
├── context/
│   └── AlgoContext.jsx
├── api/ (o services/)
│   └── cliente.js
├── utils/
│   └── helpers.js
├── App.jsx
├── App.module.css
├── index.css
└── main.jsx

BE/db.json          # base de datos de json-server
```

### Conceptos que SÍ o SÍ hay que dominar (aparecen en los dos exámenes 2026)

| Concepto | Dónde se usa | Detalle |
|---|---|---|
| **CSS Modules** | Todos los componentes | Cada componente tiene su `.module.css` propio, importado como `import styles from './X.module.css'` y usado como `className={styles.algo}`. Es obligatorio, no opcional, en 2026. |
| **React Router** | Ejercicio de "rutas" | `BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useParams`. Suele venir el router *a medio completar* — falta agregar 1-2 `<Route>`. |
| **fetch a json-server** | Listado y detalle | Servidor corre en `localhost:3000` o `3001`. Endpoints REST estándar (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`). |
| **Capa de servicios/API centralizada** | `services/taskService.js` o `api/client.js` | Todas las llamadas HTTP se centralizan en un módulo aparte, no sueltas en los componentes. Suele venir con algunas funciones ya hechas (de referencia) y otras en `// TODO`. |
| **Formularios controlados** | Crear/editar | `useState` por campo o por objeto, `onChange`, `onSubmit` con `e.preventDefault()`, luego llamada a la API y `navigate(...)`. |
| **Edición con datos precargados** | Página de editar | Leer `id` con `useParams()`, hacer `GET` al montar (`useEffect`), poblar el formulario, y al guardar hacer `PUT`/`PATCH`. |
| **Context API** | Último ejercicio (vale como "el difícil") | Se pide compartir un estado global (ej. lista de tareas, total recaudado) entre componentes que no son padre-hijo directo, usando `createContext` + `useContext` + un Provider. Casi siempre es el ejercicio que menos gente llega a completar — practicarlo bien. |
| **Cálculos derivados con `.reduce()`** | Barras de progreso, totales, gráficos simples | Ej: sacar % de tareas completadas, o sumar precio×cantidad de un carrito. Aparece en 2025sem2 y en ambos 2026. |
| **Redirección tras acción** | Después de crear/guardar | `useNavigate()` para volver al listado tras un POST/PUT exitoso. |

### Patrón del "TODO guiado"
En 2026 el código no está vacío: te dan el layout/JSX armado y comentarios `// TODO: implementar X` marcando **exactamente** qué falta. Ejemplos reales encontrados:
- `// TODO: implementar listado de cuentas` (falta el `useEffect` + `.map()`, el JSX del `<ul>` ya está).
- `{/* todo add the edit and create task routes */}` (falta agregar `<Route>`, el resto del router ya está).
- Funciones del "cliente API" que están completas para un recurso (`productosApi`) pero vacías para otro (`cuentasApi.listar`, `cuentasApi.crear`) — el patrón a copiar ya está a la vista, solo hay que replicarlo.

**Estrategia:** buscar todos los `// TODO` / `// todo` apenas abrís el proyecto, y usar el código ya resuelto (de otro componente/recurso análogo) como plantilla para completar el resto.

---

## 3. Patrones que se repiten entre TODOS los años (no solo 2026)

- **Un dato con estados/categorías** que definen cómo se agrupa o colorea algo:
  - 2025sem1: tareas con estado `pending | blocked | completed` (colores distintos).
  - 2026sem1 (Prueba 2): tareas con estado `To Do | In Progress | Done` (columnas tipo Trello).
  - Pensar siempre: "¿hay que filtrar o agrupar por un campo tipo enum?"
- **Relación maestro-detalle**: lista → click en ítem → página de detalle por `id`/código (`:cca3`, `:task_id`, `:id`). En casi todos los años hay una ruta de detalle.
- **Filtros vía query string o rutas dinámicas**: 2025sem2 usa `?currency=EUR`, `?language=fra`, o rutas dedicadas como `/currencies/:currencyCode`. Repasar cómo armar la URL con `URLSearchParams` o simplemente interpolando el query string.
- **Vistas "análogas" para reducir código repetido**: el enunciado suele decirlo explícitamente ("estas vistas son idénticas, reusá componentes"). Conviene armar un componente genérico de lista reutilizable en vez de copiar/pegar JSX.
- **Datos anidados** (arrays dentro de objetos): en el simulacro 2026, `cuentas.productos[]` no referencia por `id` sino que embebe nombre/cantidad directamente — hay que tener cuidado de no asumir que todo se relaciona por `id`. Leer bien el modelo de datos de la consigna, no asumir.
- **Formularios con validación simple**: no crear con campos vacíos (aparece como ejercicio bonus en 2026, y como requisito directo en 2025sem1).
- **Trivia/juego con estado de sesión** (solo en simulacros de 2025sem2, menos probable pero posible): random pick, contador de errores/puntaje, useState para trackear progreso del juego.

---

## 4. Checklist de repaso técnico (por si tenés que practicar antes del examen)

- [ ] `useState` + `useEffect` para hacer un `fetch` al montar un componente y guardar el resultado.
- [ ] Renderizado de listas con `.map()` y `key`.
- [ ] `useParams()` para leer un id/código de la URL y pedir el detalle a la API.
- [ ] `useNavigate()` para redirigir después de crear/guardar/borrar.
- [ ] Definir rutas con `<Routes>` / `<Route path="..." element={...} />`, incluyendo rutas dinámicas (`:id`).
- [ ] Armar un formulario controlado (inputs con `value` + `onChange`) y mandarlo por `POST`/`PUT`/`PATCH` con `fetch`.
- [ ] `createContext` + `Provider` + `useContext` para compartir estado entre componentes no emparentados directamente.
- [ ] Cálculos con `.reduce()` / `.filter()` / `.find()` sobre arrays de objetos (totales, contadores, agrupar por estado).
- [ ] CSS Modules: crear un archivo `.module.css` por componente e importarlo como objeto `styles`.
- [ ] Centralizar las llamadas a la API en un módulo separado (`services/` o `api/`) en vez de hacer `fetch` directo en cada componente.
- [ ] Manejo básico de errores de `fetch` (chequear `response.ok`).



