async function fetchJSON(path, options) {
  const resource = new URL(path, window.location);

  const response = await window.fetch(resource, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}

async function onLoad() {
  try {



  const students = await fetchJSON("students.json");
  const div = document.getElementById("students");
  
  students.forEach(element=> {
    const nombre = document.createElement("p");
    nombre.textContent = element.name;
    const edad = document.createElement("p");
    edad.textContent = `Edad: ${element.age}`;
    const carrera = document.createElement("p");
    carrera.textContent = `Carrera: ${element.course.name}`;
    const anio = document.createElement("p");
    anio.textContent = `Año: ${element.course.year}`;

    div.appendChild(nombre);
    div.appendChild(edad);
    div.appendChild(carrera);
    div.appendChild(anio);



  });


  
  }
  catch (error) {
    console.error("Error al cargar la información del país:", error);
  }
}