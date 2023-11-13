const productos = [
  {
    nombre: "Programas para niños",
    subProductos: [
      { nombre: "Guardería de hockey", precio: 1500, porHora: true },
      { nombre: "Escuela", precio: 22000, porHora: false },
      { nombre: "Cadetes", precio: 19500, porHora: false },
    ],
  },
  {
    nombre: "Programas para adultos",
    subProductos: [
      { nombre: "Básico", precio: 18500, porHora: true },
      { nombre: "Avanzadas", precio: 2500, porHora: true },
      { nombre: "Entrenamiento", precio: 20000, porHora: false },
    ],
  },
  {
    nombre: "Clases Privadas",
    subProductos: [
      { nombre: "Básico", precio: 20500, porHora: false },
      { nombre: "Avanzadas", precio: 2500, porHora: true },
    ],
  },
  {
    nombre: "Entrenamiento Alto Rendimeinto",
    subProductos: [
      { nombre: "Grupal", precio: 17500, porHora: false },
      { nombre: "Individual", precio: 20750, porHora: false },
    ],
  },
];

console.log("Productos disponibles:");

function mostrarProductos() {
  productos.forEach((producto, index) => {
    console.log(`${index + 1}. ${producto.nombre}`);
    producto.subProductos.forEach((subProducto, subIndex) => {
      console.log(
        `   ${index + 1}.${subIndex + 1} ${subProducto.nombre} - Precio: ${
          subProducto.porHora ? "$ por hora" : `$${subProducto.precio}`
        }`
      );
    });
  });
}

function calcularTotal(carrito) {
  let total = 0;
  carrito.forEach((item) => {
    if (item.porHora) {
      const horasContratadas = prompt(
        `Ingrese la cantidad de horas para ${item.nombre}:`
      );
      total += item.precio * parseFloat(horasContratadas);
    } else {
      total += item.precio;
    }
  });
  return total;
}

function main() {
  const carrito = [];
  let seguirComprando = true;

  while (seguirComprando) {
    mostrarProductos();
    const opcion = prompt(
      "Elija un producto por su número (0 para finalizar):"
    );
    const [numeroOpcion, subNumeroOpcion] = opcion.split(".").map(Number);

    if (
      numeroOpcion >= 1 &&
      numeroOpcion <= productos.length &&
      subNumeroOpcion >= 1 &&
      subNumeroOpcion <= productos[numeroOpcion - 1].subProductos.length
    ) {
      const productoElegido =
        productos[numeroOpcion - 1].subProductos[subNumeroOpcion - 1];
      carrito.push(productoElegido);
      console.log(`${productoElegido.nombre} ha sido añadido al carrito.`);
    } else if (numeroOpcion === 0) {
      seguirComprando = false;
    } else {
      console.log("Opción no válida. Intente de nuevo.");
    }
  }

  console.log("Carrito de compras:");
  carrito.forEach((item, index) => {
    if (item.porHora) {
      const horasContratadas = prompt(
        `Ingrese la cantidad de horas para ${item.nombre}:`
      );
      console.log(
        `${index + 1}. ${item.nombre} - Precio: $${
          item.precio
        }/hora - Horas: ${horasContratadas} - Total: $${
          item.precio * parseFloat(horasContratadas)
        }`
      );
    } else {
      console.log(`${index + 1}. ${item.nombre} - Precio: $${item.precio}`);
    }
  });

  const total = calcularTotal(carrito);
  console.log(`Total: $${total.toFixed(2)}`);
}

main();
