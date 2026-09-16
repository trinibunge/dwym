export function mayoresDeEdad(edades) {
    const resultado = []
    edades.forEach(element => {
        if (element>=18){
            resultado.push(element)
        }
    });
    return resultado;
}

console.log(mayoresDeEdad([14,15,82,32]));


export function mayoresDeEdad2(personas) {
    const resultado = []
    personas.forEach(element => {
        if (element.edad>=18){
            resultado.push(element.nombre)
        }
    });
    return resultado;
}

const personas = [
    { nombre: "Ana", edad: 17 },
    { nombre: "Juan", edad: 22 },
    { nombre: "Sofía", edad: 19 },
    { nombre: "Pedro", edad: 15 }
];

console.log(mayoresDeEdad2(personas));

export function productosPorCategoria(productos, categoria) {
    const resultado = [];
    productos.forEach(element => {
        if(element.categoria === categoria){
            resultado.push(element.nombre);
        }
    });
    return resultado;
}

const productos = [
    { nombre: "Notebook", categoria: "Tecnologia", precio: 25000 },
    { nombre: "Campera", categoria: "Ropa", precio: 3000 },
    { nombre: "Celular", categoria: "Tecnologia", precio: 15000 },
    { nombre: "Pantalon", categoria: "Ropa", precio: 2500 },
    { nombre: "Auriculares", categoria: "Tecnologia", precio: 2000 }
];

console.log (productosPorCategoria(productos, "Tecnologia"));

const paises = [
    {
        nombre: "Uruguay",
        codigo: "UY",
        moneda: {
            codigo: "UYU",
            nombre: "Peso uruguayo"
        }
    },
    {
        nombre: "Argentina",
        codigo: "AR",
        moneda: {
            codigo: "ARS",
            nombre: "Peso argentino"
        }
    },
    {
        nombre: "Brasil",
        codigo: "BR",
        moneda: {
            codigo: "BRL",
            nombre: "Real brasileño"
        }
    },
    {
        nombre: "Estados Unidos",
        codigo: "US",
        moneda: {
            codigo: "USD",
            nombre: "Dólar estadounidense"
        }
    }
];

export function paisesPorMoneda(paises, moneda) {
    const resultado = [];
    paises.forEach(element => {
        if (element.moneda.codigo === moneda){
            resultado.push(element.codigo)
        }
    });
    return resultado;
}

console.log(paisesPorMoneda(paises, "USD"));


const datos = [
    { campo: "nombre", valor: "Trinidad" },
    { campo: "edad", valor: 19 },
    { campo: "ciudad", valor: "Montevideo" },
    { campo: "carrera", valor: "Informática" }
];

export function convertirAObjeto(datos) {
    const obj = {};
    datos.forEach(element =>{
        obj[element.campo] = element.valor;
    });
    return obj;
}

console.log(convertirAObjeto(datos));

const productosEj7 = [
    {
        nombre: "Notebook",
        categoria: "Tecnologia",
        stock: 5,
        precio: 25000
    },
    {
        nombre: "Mouse",
        categoria: "Tecnologia",
        stock: 0,
        precio: 1200
    },
    {
        nombre: "Teclado",
        categoria: "Tecnologia",
        stock: 8,
        precio: 3000
    },
    {
        nombre: "Campera",
        categoria: "Ropa",
        stock: 3,
        precio: 5000
    },
    {
        nombre: "Pantalon",
        categoria: "Ropa",
        stock: 0,
        precio: 3500
    }
];

export function inventarioDisponible(productos, categoria) {
    const resultado = {
        productos:[],
        cantidad:0,
        valor:0,
    }
    productos.forEach(element => {
        if (element.categoria === categoria){
            resultado.productos.push(element.nombre);
            resultado.cantidad += element.stock;
            resultado.valor += element.stock * element.precio
        }
    });
    return resultado;
}

console.log(inventarioDisponible(productosEj7, "Tecnologia"));