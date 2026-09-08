// Lógica centralizada de autenticación y gestión de sesiones
window.VSM = window.VSM || {};

/**
 * Verifica si existe una sesión activa en localStorage
 * @returns {Object|null} Objeto de sesión o null si no hay sesión
 */
window.VSM.verificarSesion = function() {
  try {
    const sesionData = localStorage.getItem(window.VSM.claves.sesion);
    if (!sesionData) return null;
    
    const sesion = JSON.parse(sesionData);
    
    // Verificar si la sesión expiró (opcional: agregar fecha de expiración)
    // Por ahora, validamos que tenga los campos básicos
    if (!sesion.codigo || !sesion.email) {
      localStorage.removeItem(window.VSM.claves.sesion);
      return null;
    }
    
    return sesion;
  } catch (error) {
    console.error('Error al verificar sesión:', error);
    localStorage.removeItem(window.VSM.claves.sesion);
    return null;
  }
};

/**
 * Obtiene los usuarios registrados desde localStorage
 * @returns {Array} Array de objetos usuario
 */
window.VSM.obtenerUsuarios = function() {
  try {
    const guardados = localStorage.getItem(window.VSM.claves.usuarios);
    return guardados ? JSON.parse(guardados) : [];
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

/**
 * Guarda un array de usuarios en localStorage
 * @param {Array} usuarios - Array de objetos usuario
 */
window.VSM.guardarUsuarios = function(usuarios) {
  try {
    localStorage.setItem(window.VSM.claves.usuarios, JSON.stringify(usuarios));
  } catch (error) {
    console.error('Error al guardar usuarios:', error);
  }
};

/**
 * Inicia una sesión para un usuario
 * @param {Object} usuario - Objeto de usuario autenticado
 * @returns {boolean} true si la sesión se creó correctamente
 */
window.VSM.iniciarSesion = function(usuario) {
  try {
    const sesion = {
      codigo: usuario.codigo,
      nombre: `${usuario.nombre} ${usuario.apellido}`,
      email: usuario.email,
      rol: usuario.rol,
      fechaInicio: new Date().toISOString()
    };
    
    localStorage.setItem(window.VSM.claves.sesion, JSON.stringify(sesion));
    return true;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return false;
  }
};

/**
 * Termina la sesión actual
 */
window.VSM.terminarSesion = function() {
  try {
    localStorage.removeItem(window.VSM.claves.sesion);
    // Redirigir a login.html después de terminar sesión
    setTimeout(() => {
      location.href = 'login.html';
    }, 500);
  } catch (error) {
    console.error('Error al terminar sesión:', error);
  }
};

/**
 * Obtiene las claves de localStorage utilizadas por el sistema
 * @returns {Object} Objeto con claves definidas
 */
window.VSM.claves = window.VSM.claves || {
  productos: "vsm_productos",
  carrito: "vsm_carrito",
  sesion: "vsm_sesion",
  usuarios: "vsm_usuarios"
};

/**
 * Valida credenciales de login
 * @param {string} usuarioInput - Usuario o correo ingresado
 * @param {string} password - Contraseña ingresada
 * @returns {Object|null} Objeto de usuario encontrado o null
 */
window.VSM.validarCredenciales = function(usuarioInput, password) {
  const usuarios = window.VSM.obtenerUsuarios();
  
  for (const usuario of usuarios) {
    if (usuario.activo && 
        (usuario.email.toLowerCase() === usuarioInput || 
         usuario.usuario.toLowerCase() === usuarioInput) && 
        usuario.password === password) {
      return usuario;
    }
  }
  
  return null;
};

/**
 * Determina a dónde redirigir según el rol del usuario
 * @param {string} rol - Rol del usuario ('admin' o 'usuario')
 * @returns {string} URL de redirección
 */
window.VSM.obtenerRedireccionPorRol = function(rol) {
  if (rol === 'admin') {
    return 'roles.html';
  } else {
    return 'index.html';
  }
};

/**
 * Muestra mensaje de sesión expirada en la página actual
 * @param {string} elementoId - ID del elemento donde mostrar el mensaje
 */
window.VSM.mostrarMensajeSesionExpirada = function(elementoId) {
  const elemento = document.getElementById(elementoId);
  if (elemento) {
    elemento.textContent = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
    elemento.style.display = 'block';
    
    setTimeout(() => {
      location.href = 'login.html';
    }, 3000);
  }
};

/**
 * Inicializa verificación de sesión al cargar la página
 */
window.addEventListener('DOMContentLoaded', () => {
  // Verificar sesión periódicamente (cada 5 minutos)
  setInterval(() => {
    const sesion = window.VSM.verificarSesion();
    if (!sesion) {
      localStorage.removeItem(window.VSM.claves.sesion);
      // Si estamos en una página protegida, redirigir a login
      if (window.location.pathname.includes('admin') || 
          window.location.pathname.includes('roles') ||
          window.location.pathname.includes('login')) {
        location.href = 'login.html';
      }
    }
  }, 300000); // 5 minutos
});

// Exportar funciones para uso en otras páginas
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.VSM;
}
