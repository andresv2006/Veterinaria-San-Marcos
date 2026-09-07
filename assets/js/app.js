const botonBienvenida = document.querySelector("#boton-bienvenida");
if (botonBienvenida) {
  botonBienvenida.addEventListener("click", () => {
    alert("Bienvenido a Veterinaria San Marcos. Conoce nuestros servicios de consultas, vacunación y desparasitación en Rancagua.");
  });
}

const formContacto = document.querySelector("#form-contacto");

if (formContacto) {
  const validarRut = (rut) => {
    const rutLimpio = rut.replace(/[^0-9kK]/g, "");
    if (rutLimpio.length < 7 || rutLimpio.length > 9) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dvIngresado = rutLimpio.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperadoCalculado = 11 - (suma % 11);
    let dvEsperado = dvEsperadoCalculado.toString();
    if (dvEsperadoCalculado === 11) dvEsperado = "0";
    if (dvEsperadoCalculado === 10) dvEsperado = "K";

    return dvIngresado === dvEsperado;
  };

  const validarCorreo = (correo) => {
    const dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
    const partes = correo.trim().toLowerCase().split("@");
    if (partes.length !== 2) return false;
    return dominiosPermitidos.includes(partes[1]);
  };

  formContacto.addEventListener("submit", (e) => {
    let esValido = true;

    const inputRut = document.querySelector("#rut");
    const errorRut = document.querySelector("#error-rut");

    const inputNombre = document.querySelector("#nombre");
    const errorNombre = document.querySelector("#error-nombre");

    const inputCorreo = document.querySelector("#correo");
    const errorCorreo = document.querySelector("#error-correo");

    const inputComentario = document.querySelector("#comentario");
    const errorComentario = document.querySelector("#error-comentario");

    [errorRut, errorNombre, errorCorreo, errorComentario].forEach((el) => (el.textContent = ""));

    const valorRut = inputRut.value.trim();
    if (!valorRut) {
      errorRut.textContent = "El RUT es obligatorio.";
      esValido = false;
    } else if (!validarRut(valorRut)) {
      errorRut.textContent = "Ingresa un RUT válido (sin puntos ni guión, ej: 19011022K).";
      esValido = false;
    }

    if (!inputNombre.value.trim()) {
      errorNombre.textContent = "El nombre completo es obligatorio.";
      esValido = false;
    }

    const valorCorreo = inputCorreo.value.trim();
    if (!valorCorreo) {
      errorCorreo.textContent = "El correo es obligatorio.";
      esValido = false;
    } else if (!validarCorreo(valorCorreo)) {
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