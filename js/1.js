// Define el URL del JSON
const URL_PROGRAMAS = "programas.json";

const listadoProgramas = document.getElementById("listaProgramas");

// Imprime los programas en la home
function imprimirProgramas(listadoProgramas, programas) { // Accede al array 'programas' dentro del objeto 'programas'
  listadoProgramas.innerHTML = "";
  for (const programa of programas.programas) { // Accede al array 'programas' dentro del objeto 'programas'
    let contenedorPrograma = document.createElement("div");
    contenedorPrograma.className = "programas";
    contenedorPrograma.id = programa.sku; // Accede a la propiedad 'sku' de cada programa
    contenedorPrograma.innerHTML = `
      <div class="imgCarrito">
        <img src="${programa.imagen}" alt="${programa.nombre}">
      </div>
      <div class="accordion accordion-flush" id="accordionFlushExample1">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapse-${programa.sku}"
              aria-expanded="false"
              aria-controls="flush-collapse-${programa.sku}"
            >
              <h3 class="h3Carrito">${programa.nombre}
                <i class="fas fa-chevron-down fa-xs" style="color: #83d1d2"></i>
              </h3>
            </button>
          </h2>
          <div id="flush-collapse-${programa.sku}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body justify-content-between text-center">
              <div class="parent2">
                <div class="div1"><p>${programa.subProductos.subSku}</p></div>
                <div class="div2 tituloPrograma"><p>${programa.subProductos.nombre}</p></div>
                <div class="div3 precio"><p>${programa.subProductos.precio}</p></div>
                <div class="div4">
                  <button class="btn btnCarrito btnPrograma">
                    <i class="fas fa-shopping-cart fa-xs" data-id="7"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    listadoProgramas.appendChild(contenedorPrograma);
  }
}

// Fetch de los programas
const pedirProgramas = async () => {
  const resp = await fetch(URL_PROGRAMAS);
  const programas = await resp.json();
  return programas;
};

// Verifica que el elemento "listaProgramas" existe antes de ejecutar el script
if (listadoProgramas) {
  pedirProgramas()
    .then((programas) => imprimirProgramas(listadoProgramas, programas))
    .catch((error) => console.error("Error al obtener los programas:", error));
} else {
  console.error("Elemento con ID 'listaProgramas' no encontrado.");
}