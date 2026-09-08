/* Veterinaria San Marcos — auth.js (Integrante 3)
   Simulación frontend: los usuarios se guardan en localStorage.
   CONTRASEÑAS: nunca se almacenan. Se guarda únicamente un hash simulado
   (cadena no reversible) para demostración. La autenticación real con backend
   se implementará en una fase posterior. */
"use strict";

const CLAVE_USUARIOS = "vsm_usuarios";
const CLAVE_SESION = "vsm_sesion";

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

function obtenerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION));
  } catch {
    return null;
  }
}

function guardarSesion(sesion) {
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

function eliminarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

function crearHashSimulado(texto) {
  /*
   * DEMOSTRACIÓN FRONTEND únicamente.
   * No es un hash criptográfico real ni seguro.
   * En producción se usará bcrypt/argon2 en el backend.
   */
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    const char = texto.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return "sim_hash_" + Math.abs(hash).toString(36);
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
  const selRegion = document.getElementById("region");
  const selComuna = document.getElementById("comuna");
  const form = document.getElementById("form-registro");
  if (!form) return;

  cargarRegiones(selRegion);

  selRegion.addEventListener("change", () => {
    cargarComunas(selRegion.value, selComuna);
    mostrarError("error-region", "");
    mostrarError("error-comuna", "");
  });

  selComuna.addEventListener("change", () => {
    mostrarError("error-comuna", "");
  });

  form.addEventListener("submit", (e) => {
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
    form.reset();
    cargarComunas("", selComuna);
  });
});

// API pública para reutilizar en login, admin y otros módulos.
window.VSM_AUTH = {
  obtenerUsuarios,
  guardarUsuarios,
  obtenerSesion,
  guardarSesion,
  eliminarSesion,
  crearHashSimulado,
  correoValido,
  rutValido
};
