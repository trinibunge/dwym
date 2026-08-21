# Repechaje 2025 sem 2

Prueba de repechaje del curso de Desarrollo Web y Mobile.

## Inicialización

Crear un _fork_ privado de este repositorio. Clonar el _fork_ y ejecutar `npm i` en la carpeta `/web`. La versión de desarrollo de la app se levanta haciendo `npm start` en la carpeta `/web`. La plantilla del ejercicio provee una página de inicio mínima con un _fetch_ a la API a usar.

## Aplicación

El ejercicio se trata de implementar una aplicación _web_ para mostrar cartas del juego _Magic: The Gathering_. Para esto utilizaremos la API de [Scryfall](https://scryfall.com/docs/api).

### Ruta Inicio: `/`

Mostrar un botón para agregar una carta aleatoria a la pantalla. El botón debe tener un signo de más. Al presionar el botón, se debe:

+ Obtener una carta al azar usando el endpoint [https://api.scryfall.com/cards/random](https://scryfall.com/docs/api/cards/random).

+ Agregar a la página un enlace con la imágen de tamaño _normal_ de la carta.

+ El enlace debe llevar a la ruta de la carta.

### Ruta Carta : `/:idCarta`

Mostrar la imágen de tamaño _large_ de la carta dada por el identificador de la ruta. Para obtener los datos de una carta específica se llama al _endpoint_ [https://api.scryfall.com/cards/:id](https://scryfall.com/docs/api/cards/id).

_Fin_