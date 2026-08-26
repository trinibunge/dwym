/*
# Ejercicio 03.

Reemplazar este código con lo necesario para implementar lo solicitado en el
ejercicio.
*/
async function onLoad() {
  try {
    const colores = await fetchJSON("/colors");
    const contenedorDeColores = document.getElementById("colors");
    contenedorDeColores.innerHTML = "";
    for (const color of colores) {
      const div = document.createElement("div");
      div.classList.add("color");
      div.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
      div.textContent = `rgb(${color.red}, ${color.green}, ${color.blue})`;
      contenedorDeColores.appendChild(div);
    }
  } catch (error) {
    console.error("Error al cargar los colores:", error);
    const contenedorDeColores = document.getElementById("colors");
    contenedorDeColores.innerHTML = "<p>Error al cargar los colores.</p>";
  }
}

async function onAddColor() {
  try {
    let red = Number(document.getElementById("red").value);
    let green = Number(document.getElementById("green").value);
    let blue = Number(document.getElementById("blue").value);
    await fetchJSON("/colors", {
      method: "POST",
      body: JSON.stringify({ red, green, blue }),
    });
    await onLoad();
  } catch (error) {
    console.error("Error al agregar el color:", error);
  }
}

async function fetchJSON(path, options) {
  const resource = new URL(path, window.location);
  const response = await window.fetch(resource, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}
