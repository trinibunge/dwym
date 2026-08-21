const BASE = 'http://localhost:3000'

export async function fetchJson(ruta, opciones = {}) {
  const respuesta = await fetch(`${BASE}${ruta}`, {
    headers: { 'Content-Type': 'application/json', ...opciones.headers },
    ...opciones,
  })
  if (!respuesta.ok) {
    const texto = await respuesta.text()
    throw new Error(texto || `Error HTTP ${respuesta.status}`)
  }
  if (respuesta.status === 204) return null
  return respuesta.json()
}

export const cuentasApi = {
  listar: async () => {
    // TODO: implementar listado de cuentas
  },

  obtener: (id) => fetchJson(`/cuentas/${id}`),

  crear: async (cuerpo) => {
    // TODO: implementar creación de cuenta
  },

  reemplazar: (id, cuerpo) =>
    fetchJson(`/cuentas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cuerpo),
    }),

  actualizar: (id, cuerpo) =>
    fetchJson(`/cuentas/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(cuerpo),
    }),

  borrar: (id) =>
    fetchJson(`/cuentas/${id}`, {
      method: 'DELETE',
    }),
}
export const productosApi = {
  listar: () => fetchJson('/productos'),
  obtener: (id) => fetchJson(`/productos/${id}`),
  crear: (cuerpo) =>
    fetchJson('/productos', { method: 'POST', body: JSON.stringify(cuerpo) }),
  reemplazar: (id, cuerpo) =>
    fetchJson(`/productos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cuerpo),
    }),
  actualizar: (id, cuerpo) =>
    fetchJson(`/productos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(cuerpo),
    }),
  borrar: (id) =>
    fetchJson(`/productos/${id}`, { method: 'DELETE' }),
}
