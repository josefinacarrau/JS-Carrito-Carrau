//alert();
// Inicializar el total en 0
let total = 0;

// Función para agregar productos al carrito
function agregarProducto() {
  let producto = prompt("Ingresa el servicio: 1) Ninos  2) Adultos  3) ESC");
  if ((producto = 1)) {
    let servicioNinos = prompt(
      "Ingresa el programa: 1) Guardería 2) Escuela 3) Cadetes 4) BACK"
    );
    if ((servicioNinos = 1)) {
      let guardería = prompt(
        "El costo de guardería es de $1.500 UYU/hr. Ingrese la cantidad de horas que quiera abonar:"
      );
      console.log("El total a pagar es:" + 1500 * guardería);
    }
  } else if ((producto = 2)) {
    let servicioAdultos = prompt(
      "Ingresa el programa: 1) Básico 2) Avanzado 3) Entrenamiento 4) BACK"
    );
  } else if ((producto = 3)) {
    return producto;
  } else {
    prompt("Ingrese un número válido");
  }
}
34;

agregarProducto();

//   if (!isNaN(precio)) { //Devuelve true si es un número válido y false si no lo es
//     total += precio;
//     console.log(`Añadiste "${producto}" al carrito por $${precio}`);
//     console.log(`Total en el carrito: $${total}`);
//   } else {
//     console.log("Precio no válido. El producto no se agregó al carrito.");
//   }
// }

// // Llamar a la función para agregar productos al cargar la página
// agregarProducto();
