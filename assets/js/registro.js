const formularioRegistro = document.querySelector("#form-registro");
const mensajeRegistro = document.querySelector("#mensaje-registro");

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
  const nombre = formularioRegistro.nombre.value.trim();
  const apellido = formularioRegistro.apellido.value.trim();
  const correo = formularioRegistro.correo.value.trim().toLowerCase();
  const region = formularioRegistro.region.value;
  const comuna = formularioRegistro.comuna.value;
  const usuario = formularioRegistro.usuario.value.trim();
  const password = formularioRegistro.password.value;
  const confirmPassword = formularioRegistro.confirmPassword.value;
  const rol = formularioRegistro.rol.value;
  
  let valido = true;

  // Validar nombre
  limpiarError("nombre");
  if (!nombre) {
    mostrarError("nombre", "El nombre es obligatorio.");
    valido = false;
  } else if (nombre.length > 50) {
    mostrarError("nombre", "El nombre no puede superar los 50 caracteres.");
    valido = false;
  }

  // Validar apellido
  limpiarError("apellido");
  if (!apellido) {
    mostrarError("apellido", "El apellido es obligatorio.");
    valido = false;
  } else if (apellido.length > 50) {
    mostrarError("apellido", "El apellido no puede superar los 50 caracteres.");
    valido = false;
  }

  // Validar correo
  limpiarError("correo");
  if (!correo) {
    mostrarError("correo", "El correo electrónico es obligatorio.");
    valido = false;
  } else if (!correo.includes("@") || !correo.includes(".")) {
    mostrarError("correo", "Ingresa un correo electrónico válido.");
    valido = false;
  }

  // Validar región y comuna (dependencia)
  limpiarError("region");
  limpiarError("comuna");
  if (!region) {
    mostrarError("region", "Selecciona una región.");
    valido = false;
  } else if (!comuna) {
    mostrarError("comuna", "Selecciona una comuna.");
    valido = false;
  }

  // Validar usuario
  limpiarError("usuario");
  if (!usuario) {
    mostrarError("usuario", "El usuario es obligatorio.");
    valido = false;
  } else if (usuario.length < 3 || usuario.length > 20) {
    mostrarError("usuario", "El usuario debe tener entre 3 y 20 caracteres.");
    valido = false;
  }

  // Validar contraseña
  limpiarError("password");
  if (!password) {
    mostrarError("password", "La contraseña es obligatoria.");
    valido = false;
  } else if (password.length < 6) {
    mostrarError("password", "La contraseña debe tener al menos 6 caracteres.");
    valido = false;
  }

  // Validar confirmación de contraseña
  limpiarError("confirmPassword");
  if (!confirmPassword) {
    mostrarError("confirmPassword", "Debes confirmar la contraseña.");
    valido = false;
  } else if (password !== confirmPassword) {
    mostrarError("confirmPassword", "Las contraseñas no coinciden.");
    valido = false;
  }

  // Validar rol
  limpiarError("rol");
  if (!rol) {
    mostrarError("rol", "Selecciona un rol.");
    valido = false;
  }

  return valido;
}

function registrarUsuario(evento) {
  evento.preventDefault();
  
  if (!validarFormulario()) {
    mensajeRegistro.textContent = "Revisa los campos marcados.";
    return;
  }

  const usuarioExistente = window.VSM.obtenerUsuarios().find((u) => 
    u.email.toLowerCase() === correo || 
    u.usuario.toLowerCase() === usuario.toLowerCase()
  );

  if (usuarioExistente) {
    mostrarError("correo", "Este correo ya está registrado.");
    mostrarError("usuario", "Este usuario ya existe.");
    mensajeRegistro.textContent = "";
    return;
  }

  const nuevoUsuario = {
    codigo: `USUARIO${String(window.VSM.obtenerUsuarios().length + 1).padStart(3, '0')}`,
    nombre: nombre,
    apellido: apellido,
    email: correo,
    usuario: usuario,
    password: password, // ⚠️ En producción NO guardar en texto plano
    region: region,
    comuna: comuna,
    rol: rol,
    activo: true
  };

  const usuarios = window.VSM.obtenerUsuarios();
  usuarios.push(nuevoUsuario);
  window.VSM.guardarUsuarios(usuarios);

  mensajeRegistro.textContent = "¡Registro exitoso! Redirigiendo al login...";
  
  setTimeout(() => {
    location.href = "login.html";
  }, 2000);
}

formularioRegistro.addEventListener("submit", registrarUsuario);

// Limpiar errores al escribir
["nombre", "apellido", "correo", "region", "comuna", "usuario", "password", "confirmPassword", "rol"].forEach((id) => {
  const campo = document.querySelector(`#${id}`);
  if (campo) {
    campo.addEventListener("input", () => limpiarError(id));
    campo.addEventListener("blur", () => validarFormulario());
  }
});

// Validar región-comuna dependiente
const selectRegion = document.querySelector("#region");
const selectComuna = document.querySelector("#comuna");

if (selectRegion && selectComuna) {
  const comunasPorRegion = {
    "RM": ["Santiago", "Puente Alto", "Maipú", "Concón", "San Bernardo"],
    "VAL": ["Valparaíso", "Viña del Mar", "Quintero"],
    "BIOB": ["Concepción", "Talcahuano", "Hualqui"],
    "ARA": ["Temuco", "Angol", "Cautín"],
    "LIB": ["Rancagua", "Chillán", "Curicó"]
  };

  selectRegion.addEventListener("change", () => {
    const regionSeleccionada = selectRegion.value;
    const comunasDisponibles = comunasPorRegion[regionSeleccionada] || [];
    
    // Limpiar opciones actuales
    selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
    
    if (regionSeleccionada) {
      comunasDisponibles.forEach((comuna) => {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        selectComuna.appendChild(option);
      });
    }
  });
}

// Verificar sesión al cargar
window.VSM.verificarSesion();
