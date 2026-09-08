const formularioLogin = document.querySelector("#form-login");
const mensajeLogin = document.querySelector("#mensaje-login");

function mostrarError(id, mensaje) {
  const campo = document.querySelector(`#${id}`);
  const error = document.querySelector(`#error-${id}`);
  if (error) {
    error.textContent = mensaje;
    campo.setAttribute("aria-invalid", "true");
  }
}

function limpiarError(id) {
  const error = document.querySelector(`#error-${id}`);
  if (error) {
    error.textContent = "";
    const campo = document.querySelector(`#${id}`);
    if (campo) {
      campo.removeAttribute("aria-invalid");
    }
  }
}

function validarFormulario() {
  const usuarioInput = formularioLogin.usuario.value.trim().toLowerCase();
  const password = formularioLogin.password.value;
  
  let valido = true;

  // Validar usuario
  limpiarError("login-usuario");
  if (!usuarioInput) {
    mostrarError("login-usuario", "Ingresa tu usuario o correo electrónico.");
    valido = false;
  }

  // Validar contraseña
  limpiarError("login-password");
  if (!password) {
    mostrarError("login-password", "La contraseña es obligatoria.");
    valido = false;
  } else if (password.length < 6) {
    mostrarError("login-password", "La contraseña debe tener al menos 6 caracteres.");
    valido = false;
  }

  return valido;
}

function iniciarSesion(evento) {
  evento.preventDefault();
  
  if (!validarFormulario()) {
    mensajeLogin.textContent = "Revisa los campos marcados.";
    return;
  }

  const usuarios = window.VSM.obtenerUsuarios();
  const usuarioEncontrado = usuarios.find((u) => 
    (u.email.toLowerCase() === usuarioInput || u.usuario.toLowerCase() === usuarioInput) && u.activo
  );

  if (!usuarioEncontrado) {
    mostrarError("login-usuario", "Usuario o correo no encontrado.");
    mostrarError("login-password", "");
    mensajeLogin.textContent = "";
    return;
  }

  // Validar contraseña (⚠️ En producción usar hash)
  if (usuarioEncontrado.password !== password) {
    mostrarError("login-usuario", "");
    mostrarError("login-password", "Contraseña incorrecta.");
    mensajeLogin.textContent = "";
    return;
  }

  // Crear sesión
  const sesion = {
    codigo: usuarioEncontrado.codigo,
    nombre: `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}`,
    email: usuarioEncontrado.email,
    rol: usuarioEncontrado.rol,
    fechaInicio: new Date().toISOString()
  };

  localStorage.setItem(window.VSM.claves.sesion, JSON.stringify(sesion));

  // Redirigir según rol
  if (usuarioEncontrado.rol === "admin") {
    location.href = "roles.html";
  } else {
    location.href = "index.html";
  }
}

formularioLogin.addEventListener("submit", iniciarSesion);

// Limpiar errores al escribir
["login-usuario", "password"].forEach((id) => {
  const campo = document.querySelector(`#${id}`);
  if (campo) {
    campo.addEventListener("input", () => limpiarError(id));
    campo.addEventListener("blur", () => validarFormulario());
  }
});

// Verificar sesión al cargar
window.VSM.verificarSesion();
