const serviciosVeterinarios = [
  { codigo: "SER001", nombre: "Consulta general", categoria: "Consultas", descripcion: "Revisión general para perros y gatos.", precio: 20000, cupos: 12 },
  { codigo: "SER002", nombre: "Control preventivo", categoria: "Consultas", descripcion: "Evaluación preventiva de la mascota.", precio: 18000, cupos: 5 },
  { codigo: "SER003", nombre: "Vacuna séxtuple", categoria: "Vacunación", descripcion: "Vacunación preventiva para perros.", precio: 22000, cupos: 8 },
  { codigo: "SER004", nombre: "Vacuna triple felina", categoria: "Vacunación", descripcion: "Vacunación preventiva para gatos.", precio: 22000, cupos: 3 },
  { codigo: "SER005", nombre: "Desparasitación interna", categoria: "Desparasitación", descripcion: "Tratamiento contra parásitos internos.", precio: 12000, cupos: 10 },
  { codigo: "SER006", nombre: "Desparasitación externa", categoria: "Desparasitación", descripcion: "Tratamiento contra pulgas y garrapatas.", precio: 15000, cupos: 0 },
  { codigo: "SER007", nombre: "Baño sanitario", categoria: "Peluquería", descripcion: "Baño y limpieza para perros.", precio: 18000, cupos: 6 },
  { codigo: "SER008", nombre: "Corte de pelo", categoria: "Peluquería", descripcion: "Corte de pelo según el tamaño de la mascota.", precio: 20000, cupos: 4 }
];

const carteleraServicios = document.querySelector("#cartelera-servicios");

function crearTarjetaServicio(servicio) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const nombre = document.createElement("h3");
  nombre.textContent = servicio.nombre;

  const categoria = document.createElement("p");
  categoria.textContent = `Categoría: ${servicio.categoria}`;

  const descripcion = document.createElement("p");
  descripcion.textContent = servicio.descripcion;

  const precio = document.createElement("p");
  if (servicio.precio === 0) {
    precio.textContent = "Gratis";
  } else {
    precio.textContent = `Precio: $${servicio.precio}`;
  }

  const cupos = document.createElement("p");
  cupos.textContent = `Cupos: ${servicio.cupos}`;

  if (servicio.cupos > 0 && servicio.cupos <= 5) {
    cupos.textContent = `¡Últimos ${servicio.cupos} cupos!`;
    cupos.classList.add("aviso-cupos");
  }

  if (servicio.cupos === 0) {
    cupos.textContent = "Servicio sin cupos";
    cupos.classList.add("actividad-completa");
  }

  tarjeta.appendChild(nombre);
  tarjeta.appendChild(categoria);
  tarjeta.appendChild(descripcion);
  tarjeta.appendChild(precio);
  tarjeta.appendChild(cupos);
  carteleraServicios.appendChild(tarjeta);
}

function mostrarServicios(lista) {
  carteleraServicios.replaceChildren();

  for (const servicio of lista) {
    crearTarjetaServicio(servicio);
  }
}

function mostrarTodosLosServicios() {
  mostrarServicios(serviciosVeterinarios);
}

function mostrarServiciosDisponibles() {
  const disponibles = [];

  for (const servicio of serviciosVeterinarios) {
    if (servicio.cupos > 0) {
      disponibles.push(servicio);
    }
  }

  mostrarServicios(disponibles);
}

if (carteleraServicios) {
  const botonTodos = document.querySelector("#mostrar-todos-servicios");
  const botonDisponibles = document.querySelector("#mostrar-servicios-disponibles");

  mostrarServicios(serviciosVeterinarios);
  botonTodos.addEventListener("click", mostrarTodosLosServicios);
  botonDisponibles.addEventListener("click", mostrarServiciosDisponibles);
}

const botonBienvenida = document.querySelector("#boton-bienvenida");
if (botonBienvenida) {
  botonBienvenida.addEventListener("click", () => {
    alert("Bienvenido a Veterinaria San Marcos. Conoce nuestros servicios de consultas, vacunación y desparasitación en Rancagua.");
  });
}

const formContacto = document.querySelector("#form-contacto");

if (formContacto) {
  const validarCorreo = (correo) => {
    const dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
    const partes = correo.trim().toLowerCase().split("@");
    if (partes.length !== 2) return false;
    return dominiosPermitidos.includes(partes[1]);
  };

  formContacto.addEventListener("submit", (e) => {
    let esValido = true;

    const inputNombre = document.querySelector("#nombre");
    const errorNombre = document.querySelector("#error-nombre");

    const inputCorreo = document.querySelector("#correo");
    const errorCorreo = document.querySelector("#error-correo");

    const inputComentario = document.querySelector("#comentario");
    const errorComentario = document.querySelector("#error-comentario");

    [errorNombre, errorCorreo, errorComentario].forEach((el) => (el.textContent = ""));

    if (!inputNombre.value.trim()) {
      errorNombre.textContent = "El nombre completo es obligatorio.";
      esValido = false;
    }

    const valorCorreo = inputCorreo.value.trim();
    if (valorCorreo && !validarCorreo(valorCorreo)) {
      errorCorreo.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      esValido = false;
    }

    if (!inputComentario.value.trim()) {
      errorComentario.textContent = "El comentario es obligatorio.";
      esValido = false;
    }

    if (!esValido) {
      e.preventDefault();
    }
  });
}
