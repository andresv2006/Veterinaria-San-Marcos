const codigoAdminDetalle = new URLSearchParams(location.search).get("codigo");
const adminDetalle = VSM.obtenerProductos().find((producto) => producto.codigo === codigoAdminDetalle);
const contenedorAdminDetalle = document.querySelector("#admin-detalle-producto");

if (!adminDetalle) {
  contenedorAdminDetalle.innerHTML = '<h1>Producto no encontrado</h1><a href="admin-productos.html">Volver al listado</a>';
} else {
  const critico = adminDetalle.stockCritico !== "" && adminDetalle.stock <= Number(adminDetalle.stockCritico);
  contenedorAdminDetalle.innerHTML = `
    <h1>${adminDetalle.nombre}</h1>
    ${new URLSearchParams(location.search).has("guardado") ? '<p class="mensaje-exito">Producto guardado correctamente.</p>' : ""}
    ${critico ? '<p class="mensaje-error">Alerta: el producto está en stock crítico.</p>' : ""}
    <dl class="lista-datos">
      <div><dt>Código</dt><dd>${adminDetalle.codigo}</dd></div><div><dt>Categoría</dt><dd>${adminDetalle.categoria}</dd></div>
      <div><dt>Precio</dt><dd>${VSM.formatearPrecio(adminDetalle.precio)}</dd></div><div><dt>Stock</dt><dd>${adminDetalle.stock}</dd></div>
      <div><dt>Stock crítico</dt><dd>${adminDetalle.stockCritico === "" ? "No definido" : adminDetalle.stockCritico}</dd></div>
      <div><dt>Principio activo</dt><dd>${adminDetalle.principioActivo}</dd></div><div><dt>Presentación</dt><dd>${adminDetalle.presentacion}</dd></div>
      <div><dt>Especie</dt><dd>${adminDetalle.especie}</dd></div><div><dt>Descripción</dt><dd>${adminDetalle.descripcion || "Sin descripción"}</dd></div>
    </dl>
    <p><a class="boton" href="admin-producto-form.html?codigo=${encodeURIComponent(adminDetalle.codigo)}">Editar producto</a> <a href="admin-productos.html">Volver al listado</a></p>`;
}
