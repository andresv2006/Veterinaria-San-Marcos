/* Veterinaria San Marcos — auth.js (Integrante 3)
   ⚠️ DEMOSTRACIÓN FRONTEND NO SEGURA ⚠️
   Esta autenticación es ÚNICAMENTE para demostración de evaluación.
   NO proporciona seguridad real y no debe usarse en producción.
   
   Simulación frontend: los usuarios se guardan en localStorage.
   CONTRASEÑAS: nunca se almacenan. Se guarda únicamente un hash simulado
   (cadena no reversible) para demostración. La autenticación real con backend
   se implementará en una fase posterior. */
"use strict";

const CLAVE_USUARIOS = "vsm_usuarios";
const CLAVE_SESION = "vsm_sesion";
const TIEMPO_EXPIRACION_SESION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
  } catch {
    return [];
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

/**
 * ⚠️ DEMOSTRACIÓN FRONTEND NO SEGURA ⚠️
 * Esta función es solo para demostración. No usa tokens ni JWT reales.
 */
function obtenerSesion() {
  try {
    const sesion = JSON.parse(localStorage.getItem(CLAVE_SESION));
    // Validar que la sesión no haya expirado
    if (sesion && sesion.inicioSesion) {
      const ahora = Date.now();
      const inicioSesion = new Date(sesion.inicioSesion).getTime();
      if (ahora - inicioSesion < TIEMPO_EXPIRACION_SESION) {
        return sesion;
      }
    }
    // Sesión expirada o inválida
    eliminarSesion();
    return null;
  } catch {
    return null;
  }
}

function guardarSesion(sesion) {
  const ahora = new Date().toISOString();
  sesion.inicioSesion = ahora;
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

/**
 * ⚠️ DEMOSTRACIÓN FRONTEND NO SEGURA ⚠️
 * Cierra sesión y redirige a auth.html si existe.
 */
function eliminarSesion() {
  localStorage.removeItem(CLAVE_SESION);
  
  // Redirigir a auth si estamos en una página protegida
  const rutaActual = window.location.pathname;
  if (rutaActual.includes('/admin') || rutaActual === '/auth.html') {
    return;
  }
  
  // Redirigir solo si no estamos ya en auth
  if (!rutaActual.includes('auth')) {
    window.location.href = 'auth.html';
  }
}

/**
 * ⚠️ DEMOSTRACIÓN FRONTEND NO SEGURA ⚠️
 * Genera un hash simulado para demostración.
 * NO es criptográfico y no debe usarse en producción.
 */
function crearHashSimulado(texto) {
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    const char = texto.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return "sim_hash_" + Math.abs(hash).toString(36);
}

function crearUsuariosDePrueba() {
  if (obtenerUsuarios().length > 0) return;

  guardarUsuarios([
    {
      id: "ADMIN001",
      nombre: "Administrador",
      apellido: "Sistema",
      correo: "admin@veterinaria.cl",
      usuario: "admin",
      hashContrasena: crearHashSimulado("admin123"),
      rol: "admin",
      activo: true,
      creadoEn: new Date().toISOString()
    },
    {
      id: "USUARIO001",
      nombre: "Usuario",
      apellido: "Demostración",
      correo: "usuario@duoc.cl",
      usuario: "usuario",
      hashContrasena: crearHashSimulado("usuario123"),
      rol: "usuario",
      activo: true,
      creadoEn: new Date().toISOString()
    }
  ]);
}

/**
 * ⚠️ DEMOSTRACIÓN FRONTEND NO SEGURA ⚠️
 * Inicia sesión con usuario y contraseña.
 * Valida contra usuarios almacenados en localStorage.
 */
function iniciarSesion(usuario, contrasena) {
  const usuarios = obtenerUsuarios();
  
  // Buscar usuario por nombre de usuario o correo
  const usuarioEncontrado = usuarios.find((u) => 
    u.usuario.toLowerCase() === usuario.toLowerCase() || 
    u.correo.toLowerCase() === usuario.toLowerCase()
  );
  
  if (!usuarioEncontrado) {
    mostrarError("error-login-usuario", "Usuario no encontrado.");
    return false;
  }
  
  // Validar contraseña (comparar hash simulado)
  const hashCalculado = crearHashSimulado(contrasena);
  if (usuarioEncontrado.hashContrasena !== hashCalculado) {
    mostrarError("error-login-contrasena", "Contraseña incorrecta.");
    return false;
  }
  
  // Verificar si usuario está activo
  if (!usuarioEncontrado.activo) {
    mostrarError("error-login-usuario", "Cuenta desactivada.");
    return false;
  }
  
  // Crear objeto de sesión
  const sesion = {
    id: usuarioEncontrado.id,
    nombre: usuarioEncontrado.nombre,
    apellido: usuarioEncontrado.apellido,
    usuario: usuarioEncontrado.usuario,
    correo: usuarioEncontrado.correo,
    rol: usuarioEncontrado.rol,
    inicioSesion: new Date().toISOString()
  };
  
  guardarSesion(sesion);
  
  // Limpiar campos y mostrar éxito
  document.getElementById("form-login").reset();
  mostrarError("error-login-usuario", "");
  mostrarError("error-login-contrasena", "");
  mostrarError("error-login-mensaje", "");
  
  const mensaje = document.getElementById("mensaje-login");
  if (mensaje) {
    mensaje.textContent = "¡Bienvenido/a, " + sesion.nombre + "!";
    mensaje.style.color = "#2a7f62";
  }
  
  return true;
}

/**
 * ⚠️ DEMOSTRACIÓN FRONTEND NO SEGURA ⚠️
 * Valida si el usuario tiene sesión activa y rol válido.
 */
function validarSesion() {
  const sesion = obtenerSesion();
  
  if (!sesion) {
    // No hay sesión, redirigir a auth
    window.location.href = 'auth.html';
    return false;
  }
  
  return true;
}

/**
 * ⚠️ DEMOSTRACIÓN FRONTEND NO SEGURA ⚠️
 * Verifica si el usuario tiene permisos para acceder a una ruta.
 */
function verificarPermiso(rutaRequerida) {
  const sesion = obtenerSesion();
  
  if (!sesion) {
    return false;
  }
  
  // Solo admin puede acceder a rutas administrativas
  if (rutaRequerida.includes('/admin')) {
    return sesion.rol === 'admin';
  }
  
  // Acceso público para otras rutas
  return true;
}

/**
 * ⚠️ DEMOSTRACIÓN FRONTEND NO SEGURA ⚠️
 * Verifica si el usuario es administrador.
 */
function esAdmin() {
  const sesion = obtenerSesion();
  return sesion && sesion.rol === 'admin';
}

/**
 * ⚠️ DEMOSTRACIÓN FRONTEND NO SEGURA ⚠️
 * Verifica si el usuario es usuario normal.
 */
function esUsuario() {
  const sesion = obtenerSesion();
  return sesion && sesion.rol === 'usuario';
}

function mostrarError(id, mensaje) {
  const el = document.getElementById(id);
  if (el) el.textContent = mensaje || "";
}

function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo);
}

function rutValido(rut) {
  if (!rut) return false;
  const limpio = rut.replace(/[.\-]/g, "").toUpperCase();
  return /^\d{7,9}[0-9K]$/.test(limpio);
}

function telefonoValido(telefono) {
  if (!telefono || !telefono.trim()) return true; // opcional
  const limpio = telefono.replace(/[\s\-\(\)]/g, "");
  return /^\d{8,9}$/.test(limpio);
}

function cargarRegiones(selRegion) {
  if (!selRegion) return;
  selRegion.replaceChildren();
  const base = document.createElement("option");
  base.value = "";
  base.textContent = "Selecciona una región";
  selRegion.appendChild(base);
  if (window.VSM_REGIONES) {
    for (const region of window.VSM_REGIONES.obtenerRegiones()) {
      const op = document.createElement("option");
      op.value = region.id;
      op.textContent = region.nombre;
      selRegion.appendChild(op);
    }
  } else {
    selRegion.innerHTML = '<option value="">Sin datos de región</option>';
  }
}

function cargarComunas(regionId, selComuna) {
  if (!selComuna) return;
  selComuna.replaceChildren();
  const base = document.createElement("option");
  base.value = "";
  if (!regionId || !window.VSM_REGIONES) {
    base.textContent = "Primero selecciona una región";
    selComuna.appendChild(base);
    selComuna.disabled = true;
    return;
  }
  const comunas = window.VSM_REGIONES.obtenerComunas(regionId);
  if (comunas.length === 0) {
    base.textContent = "Sin comunas disponibles";
    selComuna.appendChild(base);
    selComuna.disabled = true;
    return;
  }
  base.textContent = "Selecciona una comuna";
  selComuna.appendChild(base);
  for (const comuna of comunas) {
    const op = document.createElement("option");
    op.value = comuna;
    op.textContent = comuna;
    selComuna.appendChild(op);
  }
  selComuna.disabled = false;
}

function validarRegistro(d) {
  const errores = {};
  if (!d.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  else if (d.nombre.trim().length < 2) errores.nombre = "El nombre debe tener al menos 2 caracteres.";
  if (!d.apellido.trim()) errores.apellido = "El apellido es obligatorio.";
  else if (d.apellido.trim().length < 2) errores.apellido = "El apellido debe tener al menos 2 caracteres.";
  if (!d.correo.trim()) errores.correo = "El correo es obligatorio.";
  else if (!correoValido(d.correo.trim())) errores.correo = "Ingresa un correo válido.";
  if (!d.usuario.trim()) errores.usuario = "El usuario es obligatorio.";
  else if (d.usuario.trim().length < 3) errores.usuario = "El usuario debe tener al menos 3 caracteres.";
  if (!d.contrasena) errores.contrasena = "La contraseña es obligatoria.";
  else if (d.contrasena.length < 6) errores.contrasena = "La contraseña debe tener mínimo 6 caracteres.";
  if (!d.confirmar) errores.confirmar = "Debes confirmar la contraseña.";
  else if (d.contrasena !== d.confirmar) errores.confirmar = "Las contraseñas no coinciden.";
  if (!d.region) errores.region = "Selecciona una región.";
  if (!d.comuna) errores.comuna = "Selecciona una comuna.";

  const usuarios = obtenerUsuarios();
  const correo = d.correo.trim().toLowerCase();
  const nick = d.usuario.trim().toLowerCase();
  if (!errores.correo && usuarios.some((u) => u.correo.toLowerCase() === correo)) {
    errores.correo = "Ese correo ya está registrado.";
  }
  if (!errores.usuario && usuarios.some((u) => u.usuario.toLowerCase() === nick)) {
    errores.usuario = "Ese nombre de usuario ya está en uso.";
  }
  return errores;
}

document.addEventListener("DOMContentLoaded", () => {
  crearUsuariosDePrueba();
  const selRegion = document.getElementById("region");
  const selComuna = document.getElementById("comuna");
  const formRegistro = document.getElementById("form-registro");
  const formLogin = document.getElementById("form-login");
  
  // Manejo del formulario de registro (solo si existe)
  if (formRegistro) {
    cargarRegiones(selRegion);

    selRegion.addEventListener("change", () => {
      cargarComunas(selRegion.value, selComuna);
      mostrarError("error-region", "");
      mostrarError("error-comuna", "");
    });

    selComuna.addEventListener("change", () => {
      mostrarError("error-comuna", "");
    });

    // Manejo del formulario de registro
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();
      const datos = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        correo: document.getElementById("correo").value,
        usuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
        confirmar: document.getElementById("confirmar").value,
        region: document.getElementById("region").value,
        comuna: document.getElementById("comuna").value
      };
      const errores = validarRegistro(datos);
      mostrarError("error-nombre", errores.nombre);
      mostrarError("error-apellido", errores.apellido);
      mostrarError("error-correo", errores.correo);
      mostrarError("error-usuario", errores.usuario);
      mostrarError("error-contrasena", errores.contrasena);
      mostrarError("error-confirmar", errores.confirmar);
      mostrarError("error-region", errores.region);
      mostrarError("error-comuna", errores.comuna);

      const mensaje = document.getElementById("mensaje-registro");
      if (Object.keys(errores).length > 0) {
        mensaje.textContent = "Revisa los errores del formulario.";
        return;
      }
      const usuarios = obtenerUsuarios();
      usuarios.push({
        id: "usr_" + Date.now(),
        nombre: datos.nombre.trim(),
        apellido: datos.apellido.trim(),
        correo: datos.correo.trim(),
        usuario: datos.usuario.trim(),
        region: datos.region,
        comuna: datos.comuna,
        hashContrasena: crearHashSimulado(datos.contrasena),
        rol: "usuario",
        activo: true,
        creadoEn: new Date().toISOString()
      });
      guardarUsuarios(usuarios);
      mensaje.textContent = "Cuenta creada correctamente (demostración local).";
      formRegistro.reset();
      cargarComunas("", selComuna);
    });
  }

  // Manejo independiente del formulario de inicio de sesión
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Limpiar mensajes de error anteriores
      mostrarError("error-login-usuario", "");
      mostrarError("error-login-contrasena", "");
      mostrarError("error-login-mensaje", "");
      
      // Obtener valores del formulario
      const usuario = document.getElementById("usuario-login").value.trim();
      const contrasena = document.getElementById("contrasena-login").value;
      
      // Validar que ambos campos estén completos
      if (!usuario || !contrasena) {
        mostrarError("error-login-usuario", "Por favor ingresa tu usuario o correo.");
        mostrarError("error-login-contrasena", "Por favor ingresa tu contraseña.");
        return;
      }
      
      // Usar la función existente iniciarSesion()
      const resultado = iniciarSesion(usuario, contrasena);
      
      // Si devuelve true, redirigir a index.html
      if (resultado) {
        window.location.href = 'index.html';
      }
      // Si devuelve false, mantener al usuario en auth.html para ver los errores
    });
  }
});

// API pública para reutilizar en login, admin y otros módulos.
window.VSM_AUTH = {
  obtenerUsuarios,
  guardarUsuarios,
  obtenerSesion,
  guardarSesion,
  eliminarSesion,
  crearHashSimulado,
  iniciarSesion,
  validarSesion,
  verificarPermiso,
  esAdmin,
  esUsuario,
  correoValido,
  rutValido
};
