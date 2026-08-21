# Repechaje 2026 sem 1

Prueba de repechaje del curso de Desarrollo Web y Mobile.

## Inicialización

Crear un _fork_ privado de este repositorio. Clonar el _fork_ y ejecutar `npm i` en la carpeta `/web`. La versión de desarrollo de la app se levanta haciendo `npm start` en la carpeta `/web`. La plantilla del ejercicio provee una página de inicio mínima con un _fetch_ a la API a usar.

## Aplicación

El ejercicio se trata de implementar una aplicación _web_ para mostrar cartas del juego _Magic: The Gathering_. Para esto utilizaremos la API de [Scryfall](https://scryfall.com/docs/api).

### Ruta Inicio: `/`

Mostrar un botón que navegue a la ruta `/random`.

### Ruta para carta aleatoria: `/random`

Mostrar la información de una carta aleatoria. Obtener una carta al azar usando el endpoint [https://api.scryfall.com/cards/random](https://scryfall.com/docs/api/cards/random).

Una vez obtenida la carta aleatoria, agregar a la página un enlace con la imágen de tamaño _normal_ de la carta. El enlace debe llevar a la ruta de la carta (i.e. `/card/:idCarta`).

Mostrar un botón debajo de la imagen que diga _Recargar_ para volver a obtener una carta aleatoria.

### Ruta Carta : `/card/:idCarta`

Para obtener los datos de la carta dada por el identificador de la ruta, se llama al _endpoint_ [https://api.scryfall.com/cards/:id](https://scryfall.com/docs/api/cards/id). En la página se deben mostrar:

+ un título con el nombre (`name`) de la carta.

+ un párrafo con el texto en `type_line` y otro párrafo con el texto en `oracle_text`.

+ la imágen de tamaño _large_ de la carta.

+ los links en la propiedad `related_uris`.

### Extra:

+ Dividir las líneas del texto en `oracle_text` y renderizar un párrafo separado para cada una.

_Fin_