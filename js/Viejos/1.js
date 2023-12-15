// Define el URL del JSON
const URL_PROGRAMAS = "../programas.json";

const listadoProgramas = document.getElementById("listaProgramas");

// Imprime los programas en la home
function imprimirProgramas(listadoProgramas, programas) {
  listadoProgramas.innerHTML = "";
  for (const programa of programas) {
    let contenedorPrograma = document.createElement("div");
    contenedorPrograma.className = "col";
    
    // Dynamic HTML structure based on the provided code
    contenedorPrograma.innerHTML = `
      <div class="box" id="listaProgramas">
        <img
          src="${programa.imagen}"
          alt="${programa.nombre}"
          class="imgCarrito img-fluid p-2"
        />
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
                <h3 class="h3Carrito">
                  ${programa.sku}. ${programa.nombre}
                  <i class="fas fa-chevron-down fa-xs" style="color: #83d1d2"></i>
                </h3>
              </button>
            </h2>
            <div id="flush-collapse-${programa.sku}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body justify-content-between text-center">
                <div class="parent2">
                  ${programa.subProductos
                    .map(
                      (subProducto) => `
                        <div class="div1"><p>${subProducto.subSku}</p></div>
                        <div class="div2 tituloPrograma"><p>${subProducto.nombre}</p></div>
                        <div class="div3 precio"><p>${subProducto.precio} UYU/${subProducto.porHora ? 'hr' : 'per'}</p></div>
                        <div class="div4">
                          <button class="btn btnCarrito btnPrograma">
                            <i class="fas fa-shopping-cart fa-xs" data-id="${subProducto.sku}"></i>
                          </button>
                        </div>
                      `
                    )
                    .join("")}
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
  try {
    const resp = await fetch(URL_PROGRAMAS);
    const programas = await resp.json();
    return programas;
  } catch (error) {
    throw new Error("Error al obtener los programas: " + error.message);
  }
};

// Verifica que el elemento "listaProgramas" existe antes de ejecutar el script
if (listadoProgramas) {
  pedirProgramas()
    .then((programas) => imprimirProgramas(listadoProgramas, programas))
    .catch((error) => console.error(error));
} else {
  console.error("Elemento con ID 'listaProgramas' no encontrado.");
}