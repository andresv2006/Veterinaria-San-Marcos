const nombreServicio = "Consulta veterinaria";
const capacidadConsulta = 20;
const reservasConsulta = 12;

function calcularCupos(capacidad, reservas) {
  return capacidad - reservas;
}

function obtenerEstado(cuposDisponibles) {
  if (cuposDisponibles === 0) {
    return "Completa";
  }

  if (cuposDisponibles <= 5) {
    return "Últimos cupos";
  }

  return "Disponible";
}

const cuposConsulta = calcularCupos(capacidadConsulta, reservasConsulta);
const cuposVacunacion = calcularCupos(15, 12);
const cuposDesparasitacion = calcularCupos(10, 10);

console.log(`Servicio: ${nombreServicio}`);
console.log(`Cupos disponibles: ${cuposConsulta}`);
console.log(`Estado: ${obtenerEstado(cuposConsulta)}`);
console.log(`Vacunación: ${obtenerEstado(cuposVacunacion)}`);
console.log(`Desparasitación: ${obtenerEstado(cuposDesparasitacion)}`);

const serviciosVeterinarios = [
  "Consulta veterinaria",
  "Vacunación",
  "Desparasitación",
  "Peluquería canina"
];

console.log(`La veterinaria ofrece ${serviciosVeterinarios.length} servicios destacados:`);

for (const servicio of serviciosVeterinarios) {
  console.log(servicio);
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
