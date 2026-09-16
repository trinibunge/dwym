
async function onLoad() {
  try {
    const colors = await fetchJSON("/colors");
    const div = document.getElementById("colors");
    div.innerHTML = "";
    colors.forEach(element => {
      const colorDiv = document.createElement("div");
      colorDiv.className = "color";
      colorDiv.style.backgroundColor = `rgb(${element.red}, ${element.green}, ${element.blue})`;
      colorDiv.style.color = `contrast-color(rgb(${element.red}, ${element.green}, ${element.blue}))`;
      colorDiv.textContent = `rgb(${element.red}, ${element.green}, ${element.blue})`;
      div.appendChild(colorDiv);
    });
  }
  catch (error) {
    console.error("Error al cargar la información de colores:", error);
  }
}


async function onAddColor() {
  const color = {
    red: Number(document.getElementById("red").value),
    green: Number(document.getElementById("green").value),
    blue: Number(document.getElementById("blue").value)
  };
  await fetchJSON("/colors", {
    method: "POST",
    body: JSON.stringify(color)
  });
  onLoad();
}


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