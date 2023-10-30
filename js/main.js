//alert();
// Inicializar el total en 0
let total = 0;

function agregarAlCarrito() {
  let producto = prompt("Ingrese el nombre del producto:");
  let precio = prompt("Ingrese el precio del producto:");

  // Convertir el precio a un número usando parseFloat
  precio = parseFloat(precio);

  if (!isNaN(precio) && precio > 0) {
    //Se fija si el precio corresponde a un numero mayor a 0. !isNan mira si lo escrito es un numero y devuelve true/false.
    total += precio;
    console.log(producto + " ha sido agregado al carrito.");
  } else {
    console.log("Ingrese un precio válido para agrgar el producto.");
  }
}

function mostrarCarrito() {
  console.log("Total a pagar: $" + total);
}

function comprar() {
  while (true) {
    let opcion = prompt("¿Desea agregar un producto al carrito? (S/N)");
    if (opcion.toUpperCase() === "S") {
      agregarAlCarrito();
    } else if (opcion.toUpperCase() === "N") {
      mostrarCarrito();
      break;
    } else {
      console.log("Por favor, ingrese una opción válida: 'S' o 'N'.");
    }
  }
}

comprar();
