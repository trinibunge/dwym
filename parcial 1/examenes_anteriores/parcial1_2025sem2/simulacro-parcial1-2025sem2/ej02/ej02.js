/*
# Ejercicio 02.

Se necesita generar expresiones aritméticas simples aleatorias para una app web
de matemáticas. Las expresiones pueden ser sumas, restas, multiplicaciones o
divisiones entre números.

Se debe implementar la función de generación genExp, que toma un resultado y
retorna una expresión aleatoria.

Por ejemplo:

+ genExp(5) = { operator: '+', left: 2, right: 3 }
+ genExp(6) = { operator: '*', left: 2, right: 3 }
+ genExp(11) = { operator: '-', left: 20, right: 9 }
+ genExp(2) = { operator: '/', left: 8, right: 4 }
+ genExp(2) = { operator: '-', left: 5, right: 3 }
+ genExp(7) = { operator: '+', left: 2, right: 5 }

Sugerencia: Usar `Math.random()` para generar números aleatorios.
*/

export function genExp(resultado) {
  let expresion = {};
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  if (operator === "+") {
    const left = Math.floor(Math.random() * resultado);
    const right = resultado - left;
    expresion = { operator, left, right };
  } else if (operator === "-") {
    const right = Math.floor(Math.random() * resultado);
    const left = right + resultado;
    expresion = { operator, left, right };
  } else if (operator === "*") {
    const left = Math.floor(Math.random() * resultado);
    const right = resultado / left;
    expresion = { operator, left, right };
  } else if (operator === "/") {
    const right = Math.floor(Math.random() * resultado);
    const left = resultado * right;
    expresion = { operator, left, right };
  }

  return expresion;
}

console.log(genExp());
