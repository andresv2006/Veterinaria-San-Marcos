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
    precio.textContent = `Precio: ${window.VSM.formatearPrecio(servicio.precio)}`;
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

const formularioContacto = document.querySelector("#form-contacto");

if (formularioContacto) {
  const nombreContacto = document.querySelector("#nombre");
  const correoContacto = document.querySelector("#correo");
  const comentarioContacto = document.querySelector("#comentario");
  const mensajeContacto = document.querySelector("#mensaje-contacto");

  function mostrarError(control, idError, mensaje) {
    const salida = document.querySelector(`#${idError}`);
    salida.textContent = mensaje;
    control.classList.add("campo-invalido");
    control.setAttribute("aria-invalid", "true");
  }

  function limpiarError(control, idError) {
    const salida = document.querySelector(`#${idError}`);
    salida.textContent = "";
    control.classList.remove("campo-invalido");
    control.removeAttribute("aria-invalid");
  }

  function validarNombreContacto(valor) {
    limpiarError(nombreContacto, "error-nombre");
    if (valor === "") {
      mostrarError(nombreContacto, "error-nombre", "El nombre completo es obligatorio.");
      return false;
    }
    if (valor.length > 100) {
      mostrarError(nombreContacto, "error-nombre", "El nombre permite un máximo de 100 caracteres.");
      return false;
    }
    return true;
  }

  function validarCorreoContacto(valor) {
    limpiarError(correoContacto, "error-correo");
    if (valor === "") {
      return true;
    }

    const dominioPermitido =
      valor.endsWith("@duoc.cl") ||
      valor.endsWith("@profesor.duoc.cl") ||
      valor.endsWith("@gmail.com");

    if (!valor.includes("@") || !dominioPermitido) {
      mostrarError(correoContacto, "error-correo", "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      return false;
    }
    return true;
  }

  function validarComentarioContacto(valor) {
    limpiarError(comentarioContacto, "error-comentario");
    if (valor === "") {
      mostrarError(comentarioContacto, "error-comentario", "El comentario es obligatorio.");
      return false;
    }
    if (valor.length > 500) {
      mostrarError(comentarioContacto, "error-comentario", "El comentario permite un máximo de 500 caracteres.");
      return false;
    }
    return true;
  }

  function procesarContacto(evento) {
    const nombreValido = validarNombreContacto(nombreContacto.value.trim());
    const correoValido = validarCorreoContacto(correoContacto.value.trim().toLowerCase());
    const comentarioValido = validarComentarioContacto(comentarioContacto.value.trim());
    const formularioValido = nombreValido && correoValido && comentarioValido;

    if (!formularioValido) {
      evento.preventDefault();
      mensajeContacto.textContent = "Revisa los campos marcados.";
      return;
    }

    mensajeContacto.textContent = "Formulario válido.";
  }

  nombreContacto.addEventListener("blur", function () {
    validarNombreContacto(nombreContacto.value.trim());
  });
  nombreContacto.addEventListener("input", function () {
    limpiarError(nombreContacto, "error-nombre");
  });

  correoContacto.addEventListener("blur", function () {
    validarCorreoContacto(correoContacto.value.trim().toLowerCase());
  });
  correoContacto.addEventListener("input", function () {
    limpiarError(correoContacto, "error-correo");
  });

  comentarioContacto.addEventListener("blur", function () {
    validarComentarioContacto(comentarioContacto.value.trim());
  });
  comentarioContacto.addEventListener("input", function () {
    limpiarError(comentarioContacto, "error-comentario");
  });

  formularioContacto.addEventListener("submit", procesarContacto);
}

