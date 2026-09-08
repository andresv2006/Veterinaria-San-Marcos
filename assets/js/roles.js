"use strict";

const cuerpoUsuarios = document.querySelector("#cuerpo-usuarios");
const buscarUsuarios = document.querySelector("#buscar-usuarios");
const mensajeUsuarios = document.querySelector("#mensaje-usuarios");
const cantidadUsuarios = document.querySelector("#cantidad-usuarios");
const botonCrearUsuario = document.querySelector("#crear-usuario");
const botonRestaurar = document.querySelector("#restaurar-usuarios");

function renderizarUsuarios() {
  const texto = buscarUsuarios.value.trim().toLowerCase();
  const usuarios = window.VSM_AUTH.obtenerUsuarios().filter((usuario) =>
    `${usuario.nombre} ${usuario.apellido} ${usuario.correo} ${usuario.usuario}`.toLowerCase().includes(texto)
  );

  cuerpoUsuarios.innerHTML = usuarios.map((usuario) => {
    const esAdmin = usuario.rol === "admin";
    return `<tr class="${esAdmin ? "fila-admin" : ""}">
      <td>${usuario.id}</td>
      <td><strong>${usuario.nombre} ${usuario.apellido}</strong></td>
      <td>${usuario.correo}</td>
      <td><span class="etiqueta" aria-label="${esAdmin ? "Administrador" : "Usuario"}">${esAdmin ? "Administrador" : "Usuario normal"}</span></td>
      <td>${usuario.activo ? "Activo" : "Inactivo"}</td>
      <td><button type="button" data-borrar="${usuario.id}" class="boton-peligro">Eliminar</button></td>
    </tr>`;
  }).join("");

  if (usuarios.length === 0) {
    cuerpoUsuarios.innerHTML = '<tr><td colspan="6">No se encontraron usuarios.</td></tr>';
  }

  cantidadUsuarios.textContent = `${usuarios.length} usuario(s)`;
}

function eliminarUsuario(id) {
  if (!confirm("¿Deseas eliminar este usuario?")) return;
  const usuarios = window.VSM_AUTH.obtenerUsuarios().filter((usuario) => usuario.id !== id);
  window.VSM_AUTH.guardarUsuarios(usuarios);
  mensajeUsuarios.textContent = "Usuario eliminado correctamente.";
  renderizarUsuarios();
}

function restaurarUsuarios() {
  window.VSM_AUTH.guardarUsuarios([]);
  location.reload();
}

const sesion = window.VSM_AUTH.obtenerSesion();
if (!sesion || sesion.rol !== "admin") {
  mensajeUsuarios.textContent = "Acceso denegado. Inicia sesión como administrador.";
  cuerpoUsuarios.innerHTML = '<tr><td colspan="6">Solo los administradores pueden gestionar usuarios.</td></tr>';
  buscarUsuarios.disabled = true;
  botonRestaurar.disabled = true;
  botonCrearUsuario.disabled = true;
} else {
  renderizarUsuarios();
  buscarUsuarios.addEventListener("input", renderizarUsuarios);
  botonRestaurar.addEventListener("click", restaurarUsuarios);
  botonCrearUsuario.addEventListener("click", () => location.href = "registro.html");
  cuerpoUsuarios.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-borrar]");
    if (boton) eliminarUsuario(boton.dataset.borrar);
  });
}
