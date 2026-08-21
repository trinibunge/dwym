export function totalDeCuenta(cuenta, productos) {
  if (!cuenta?.productos?.length) return 0
  return cuenta.productos.reduce((suma, consumo) => {
    const cantidad = Number(consumo?.cantidad) || 0
    const producto = (productos || []).find(
      (item) => item.nombre === consumo.nombre,
    )
    const precio = Number(producto?.precio) || 0
    return suma + cantidad * precio
  }, 0)
}

export function totalRecaudado(cuentas, productos) {
  if (!Array.isArray(cuentas)) return 0
  return cuentas.reduce((suma, cuenta) => suma + totalDeCuenta(cuenta, productos), 0)
}

export function formatoPrecio(valor) {
  return `$ ${Number(valor).toLocaleString('es-AR')}`
}
