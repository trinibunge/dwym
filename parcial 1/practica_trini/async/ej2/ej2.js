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


  const country = await fetchJSON("country.json");
  const div = document.getElementById("country");
  const name = document.createElement("p");
  name.textContent = country.name;
  const capital = document.createElement("p");
  capital.textContent = country.capital;
  const population = document.createElement("p");
  population.textContent = country.population;

  div.appendChild(name);
  div.appendChild(capital);
  div.appendChild(population);
  country.cities.forEach(element=> {
    const linea = document.createElement("div");
    linea.textContent = `${element.name} - ${element.population}`;
    div.appendChild(linea);
  });


  
  }
  catch (error) {
    console.error("Error al cargar la información del país:", error);
  }
}