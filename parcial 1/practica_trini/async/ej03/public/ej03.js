/*
# Ejercicio 03.

Reemplazar este código con lo necesario para implementar lo solicitado en el
ejercicio.
*/
function onLoad() {
  const preview = document.getElementById("preview");
  
  backgroundColor = randomColor();
  textColor = randomColor();
  
  preview.style.backgroundColor = backgroundColor;
  preview.style.color = textColor;
}

async function onApprove() {
  try{
  const combo = {
    textColor: document.getElementById("preview").style.color,
    backgroundColor: document.getElementById("preview").style.backgroundColor,
    approved: true
  };
  await fetchJSON("/combos", {
    method: "POST",
    body: JSON.stringify(combo)
  });
  updateHistory("Aprobado");
  onLoad();
  }
  catch (error) {
    console.error("Error al cargar la información de colores:", error);
  }
  
  
}


async function onReject() {
  try{
  const combo = {
    textColor: document.getElementById("preview").style.color,
    backgroundColor: document.getElementById("preview").style.backgroundColor,
    approved: true
  };
  await fetchJSON("/combos", {
    method: "POST",
    body: JSON.stringify(combo)
  });
  updateHistory("Rechazado");
  onLoad();
  }
  catch (error) {
    console.error("Error al cargar la información de colores:", error);
  }
  
}

function updateHistory(veredicto){
  const historial = document.getElementById("history");
  const div = document.createElement("div");
  div.className = "combo";
  div.style.backgroundColor = backgroundColor;
  div.style.color = textColor;
  div.textContent = `${textColor} / ${backgroundColor}`;

  const veredict = document.createElement("div");
  veredict.className = "combo-verdict";
  if (veredicto === "Aprobado") {
    veredict.textContent = "👍"
  }
  else {
    veredict.textContent = "👎"
  }
  div.appendChild(veredict);

  historial.appendChild(div);
  
}


async function fetchJSON(path, options) {
  const resource = new URL(path, window.location);
  const response = await window.fetch(resource, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}

function randomColor() {
  return `#${Array.from(
    { length: 3 },
    () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0'),
  ).join('')}`;
}
