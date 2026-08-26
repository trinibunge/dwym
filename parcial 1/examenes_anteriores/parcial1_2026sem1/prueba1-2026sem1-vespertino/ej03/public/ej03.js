/*
# Ejercicio 03.

Reemplazar este código con lo necesario para implementar lo solicitado en el
ejercicio.
*/
async function onLoad() {
  try {
    generarCombo();
    const combos = await fetchJSON("/combos");
    const contenedorDeCombos = document.getElementById("history");
    contenedorDeCombos.innerHTML = "";
    for (const combo of combos) {
      const div = document.createElement("div");
      div.classList.add("combo");
      div.style.backgroundColor = combo.backgroundColor;
      div.style.color = combo.textColor;
      div.innerHTML = `
      <span class="combo-colors">${combo.backgroundColor} / ${combo.textColor}</span>
      <span class="combo-verdict">${combo.approved ? "👍" : "👎"}</span>
      `;
      contenedorDeCombos.appendChild(div);
    }
  } catch (error) {
    console.error("Error al cargar los combos:", error);
    const contenedorDeCombos = document.getElementById("history");
    contenedorDeCombos.innerHTML = "<p>Error al cargar los combos.</p>";
  }
}
let comboGenerado = null;

function generarCombo() {
  const backgroundColor = randomColor();
  const textColor = randomColor();
  comboGenerado = { backgroundColor, textColor };
  const preview = document.getElementById("preview");
  preview.style.backgroundColor = backgroundColor;
  preview.style.color = textColor;
}

async function onApprove() {
  try {
    await fetchJSON("/combos", {
      method: "POST",
      body: JSON.stringify({ ...comboGenerado, approved: true }),
    });
    await onLoad();
  } catch (error) {
    console.error("Error al aprobar el combo:", error);
  }
}

async function onReject() {
  try {
    await fetchJSON("/combos", {
      method: "POST",
      body: JSON.stringify({ ...comboGenerado, approved: false }),
    });
    await onLoad();
  } catch (error) {
    console.error("Error al rechazar el combo:", error);
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

function randomColor() {
  return `#${Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0"),
  ).join("")}`;
}
