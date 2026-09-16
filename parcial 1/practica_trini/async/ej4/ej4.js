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
console.log("afuera")

  const productos = await fetchJSON("products.json");
  const div = document.getElementById("products");
  productos.forEach(element=>{
        const name = document.createElement("p");
        name.textContent = `Nombre: ${element.name}`;
        const precio = document.createElement("p");
        precio.textContent = `Precio: ${element.price}`;
        const categoria = document.createElement("p");
        categoria.textContent = `Categoria: ${element.category.name}(${element.category.code})`;

  div.appendChild(name);
  div.appendChild(precio);
  div.appendChild(categoria);
    });
  
  }
  catch (error) {
    console.error("Error al cargar la información del país:", error);
  }
}