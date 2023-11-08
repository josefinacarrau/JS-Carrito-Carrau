const productos = [
  {
    nombre: "Producto 1",
    precio: 19.99,
  },
  {
    nombre: "Producto 2",
    precio: 24.99,
  },
  // Agrega más productos aquí
];

function mostrarProductos() {
  console.log("Productos disponibles:");
  productos.forEach((producto, index) => {
    console.log(
      `${index + 1}. ${producto.nombre} - Precio: $${producto.precio}`
    );
  });
}

function calcularTotal(carrito) {
  let total = 0;
  carrito.forEach((item) => {
    total += item.precio;
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
    const numeroOpcion = parseInt(opcion);

    if (numeroOpcion >= 1 && numeroOpcion <= productos.length) {
      const productoElegido = productos[numeroOpcion - 1];
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
    console.log(`${index + 1}. ${item.nombre} - Precio: $${item.precio}`);
  });

  const total = calcularTotal(carrito);
  console.log(`Total: $${total.toFixed(2)}`);
}

main();
