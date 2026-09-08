const cuerpoUsuarios = document.querySelector("#cuerpo-usuarios");
const buscarUsuarios = document.querySelector("#buscar-usuarios");
const mensajeUsuarios = document.querySelector("#mensaje-usuarios");
const cantidadUsuarios = document.querySelector("#cantidad-usuarios");
const botonCrearUsuario = document.querySelector("#crear-usuario");
const botonRestaurar = document.querySelector("#restaurar-usuarios");

function renderizarUsuarios() {
  const texto = buscarUsuarios.value.trim().toLowerCase();
  const usuarios = window.VSM.obtenerUsuarios().filter((usuario) => 
    `${usuario.nombre} ${usuario.apellido} ${usuario.email} ${usuario.usuario}`.toLowerCase().includes(texto)
  );

  cuerpoUsuarios.innerHTML = usuarios.map((usuario) => {
    const esAdmin = usuario.rol === "admin";
    return `<tr class="${esAdmin ? 'fila-admin' : ''}">
      <td>${usuario.codigo}</td>
      <td><strong>${usuario.nombre} ${usuario.apellido}</strong></td>
      <td>${usuario.email}</td>
      <td>
        <span class="etiqueta">${usuario.rol === 'admin' ? 'Administrador' : 'Usuario normal'}</span>
      </td>
      <td>${usuario.activo ? '<span class="mensaje-exito">Activo</span>' : '<span class="mensaje-error">Inactivo</span>'}</td>
      <td class="acciones-tabla">
        <a href="admin-producto-form.html?codigo=${encodeURIComponent(usuario.codigo)}" class="boton-secundario">Editar</a>
        ${esAdmin ? '<button type="button" data-borrar="${usuario.codigo}" class="boton-peligro" aria-label="Eliminar usuario">Eliminar</button>' : ''}
      </td>
    </tr>`;
  }).join("");

  if (!usuarios.length) {
    cuerpoUsuarios.innerHTML = '<tr><td colspan="6" class="mensaje-vacio">No se encontraron usuarios con esos filtros.</td></tr>';
  }

  cantidadUsuarios.textContent = `${usuarios.length} usuario(s)`;
}

function eliminarUsuario(codigo) {
  if (!confirm("¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.")) {
    return;
  }

  const usuarios = window.VSM.obtenerUsuarios();
  const indices = usuarios.map((u, i) => u.codigo === codigo ? i : -1).filter((i) => i !== -1);
  
  indices.forEach((indice) => {
    usuarios.splice(indice, 1);
  });

  window.VSM.guardarUsuarios(usuarios);
  renderizarUsuarios();
  mensajeUsuarios.textContent = "Usuario eliminado correctamente.";
}

function restaurarUsuarios() {
  localStorage.removeItem(window.VSM.claves.usuarios);
  const usuariosIniciales = [
    {
      codigo: "ADMIN001",
      nombre: "Administrador",
      apellido: "Sistema",
      email: "admin@veterinaria.cl",
      usuario: "admin",
      password: "admin123",
      rol: "admin",
      activo: true
    },
    {
      codigo: "USUARIO001", 
      nombre: "Usuario Demo",
      apellido: "Demostración",
      email: "usuario@duoc.cl",
      usuario: "usuario",
      password: "usuario123",
      rol: "usuario",
      activo: true
    }
  ];
  window.VSM.guardarUsuarios(usuariosIniciales);
  mensajeUsuarios.textContent = "Se restauraron los usuarios originales.";
  renderizarUsuarios();
}

function verificarPermiso() {
  const sesion = window.VSM.verificarSesion();
  if (!sesion) {
    // No hay sesión, mostrar mensaje
    mensajeUsuarios.textContent = "Debes iniciar sesión para acceder a esta sección.";
    cuerpoUsuarios.innerHTML = '<tr><td colspan="6" class="mensaje-vacio">Acceso denegado. Inicia sesión como administrador.</td></tr>';
    return false;
  }

  if (sesion.rol !== "admin") {
    // Usuario normal intentando acceder
    mensajeUsuarios.textContent = "No tienes permisos para acceder a esta sección.";
    cuerpoUsuarios.innerHTML = '<tr><td colspan="6" class="mensaje-vacio">Acceso denegado. Solo los administradores pueden gestionar usuarios.</td></tr>';
    return false;
  }

  return true;
}

function mostrarMensajeSesion(mensaje) {
  mensajeUsuarios.textContent = mensaje;
  setTimeout(() => {
    mensajeUsuarios.textContent = "";
  }, 5000);
}

// Event listeners
buscarUsuarios.addEventListener("input", renderizarUsuarios);
botonRestaurar.addEventListener("click", restaurarUsuarios);
botonCrearUsuario.addEventListener("click", () => location.href = "admin-producto-form.html");

cuerpoUsuarios.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-borrar]");
  if (boton) {
    eliminarUsuario(boton.dataset.borrar);
  }
});

// Verificar permisos al cargar
if (!verificarPermiso()) {
  location.href = "index.html";
} else {
  renderizarUsuarios();
}

// Verificar sesión periódicamente
setInterval(() => {
  const sesion = window.VSM.verificarSesion();
  if (!sesion) {
    localStorage.removeItem(window.VSM.claves.sesion);
    location.href = "login.html";
  }
}, 60000); // Verificar cada minuto
