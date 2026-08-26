/*
# Ejercicio 02.

Implementar la función que toma una lista de datos de países como los del
archivo `americas.json` y retorna los códigos CCA2 de los países que usan una
moneda dada. Por ejemplo:

```js
import americas from "./americas.json";

countriesForCurrency(americas, "EUR") // Euro
```

debería devolver:

```js
["BL", "GF", "MF", "GP", "PM", "MQ"]
```

Si un elemento no tiene alguna de las propiedades requeridas, se debe arrojar un
error.
*/
export function countriesForCurrency(data, currency) {
  const resultado = [];
  if (data === undefined || data === null) {
    throw new Error("El primer argumento no puede ser undefined o null");
  }
  if (currency === undefined || currency === null) {
    throw new Error("El segundo argumento no puede ser undefined o null");
  }
  for (const pais of data) {
    if (currency in pais.currencies) {
      resultado.push(pais.cca2);
    }
  }
  return resultado;
}
