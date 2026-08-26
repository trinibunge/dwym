/**
 * EJERCICIO DE PARCIAL: SISTEMA DE GESTIÓN DE BIBLIOTECA UNIVERSITARIA
 *
 * OBJETIVO: Implementar un sistema que permita gestionar los préstamos de libros
 * en una biblioteca universitaria, aplicando conceptos avanzados de manipulación
 * de objetos y arrays en JavaScript.
 *
 * INSTRUCCIONES:
 * 1. Analiza la estructura de datos proporcionada
 * 2. Implementa todas las funciones requeridas
 * 3. Prueba tus funciones con los datos de ejemplo y los casos de prueba proporcionados
 * 4. NO modifiques la estructura base de los objetos, solo añade las funcionalidades solicitadas
 */

// Importamos los datos desde el archivo JSON usando ES6 import
import bibliotecaData from "./datos_biblioteca.json" assert { type: "json" };

// Creamos una copia de los datos para trabajar con ellos
const biblioteca = { ...bibliotecaData };

/**
 * FUNCIONES A IMPLEMENTAR:
 */

/**
 * 1. Función para devolver un libro
 *
 * Implementa una función que gestione el proceso de devolución de un libro por parte de un estudiante.
 * Deberás validar la información y actualizar los registros del sistema adecuadamente.
 *
 * @param {number} idLibro - ID del libro a devolver
 * @param {number} idEstudiante - ID del estudiante que devuelve
 * @param {string} fechaDevolucion - Fecha de devolución (formato YYYY-MM-DD)
 * @return {boolean|string} - true si se realizó la devolución, mensaje de error si no
 */
function devolverLibro(idLibro, idEstudiante, fechaDevolucion) {
  if (!idLibro || !idEstudiante || !fechaDevolucion) {
    return "Error: Todos los parámetros son obligatorios.";
  }
  let aux = false;
  let libroAdevolver = null;
  for (const libro of biblioteca.libros) {
    if (libro.id === idLibro) {
      aux = true;
      libroAdevolver = libro;
    }
  }
  if (!aux) {
    return "Error: El libro no existe en la biblioteca.";
  }
  let aux2 = false;
  let estudianteDevolver = null;
  for (const estudiante of biblioteca.estudiantes) {
    if (estudiante.id === idEstudiante) {
      aux2 = true;
      estudianteDevolver = estudiante;
    }
  }
  if (!aux2) {
    return "Error: El estudiante no tiene id valida.";
  }
  for (const prestamo of libroAdevolver.prestamos) {
    if (
      prestamo["estudiante"] === estudianteDevolver["nombre"] &&
      prestamo.fechaDevolucion === null
    ) {
      prestamo.fechaDevolucion = fechaDevolucion;
      const index = estudianteDevolver.librosActuales.indexOf(idLibro);
      if (index > -1) {
        estudianteDevolver.librosActuales.splice(index, 1);
      }
      if (libroAdevolver["disponible"] === false) {
        libroAdevolver["disponible"] = true;
      }
    }
  }
  return true;
}

/**
 * 2. Función para listar libros prestados actualmente
 *
 * Crea una función que genere un informe de los libros que actualmente
 * se encuentran prestados, con opción de incluir información del estudiante.
 *
 * @param {boolean} incluirDetallesEstudiante - Si es true, incluir datos del estudiante
 * @return {array} - Lista de libros prestados
 */
function listarLibrosPrestados(incluirDetallesEstudiante = false) {
  let resultado = [];
  for (const libro of biblioteca.libros) {
    if (libro.disponible === false) {
      if (incluirDetallesEstudiante) {
        let estudianteConLibro = null;
        for (const estudiante of biblioteca.estudiantes) {
          if (estudiante.librosActuales.includes(libro.id)) {
            estudianteConLibro = estudiante;
            break;
          }
        }
        resultado.push({ libro: libro, estudiante: estudianteConLibro });
      } else {
        resultado.push(libro);
      }
    }
  }
  return resultado;
}

// ALGUNOS CASOS DE PRUEBA
// Descomentar para probar tu implementación

/*

console.log("\nProbando devolución de libro:");
console.log(devolverLibro(2, 1, "2025-09-13"));

console.log("\nListando todos los libros actualmente prestados:");
console.log(listarLibrosPrestados(true));
*/
