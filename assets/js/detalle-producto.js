const detalle = document.querySelector("#detalle-producto");
const codigoDetalle = new URLSearchParams(location.search).get("codigo");
const productoDetalle = VSM.obtenerProductos().find((producto) => producto.codigo === codigoDetalle);

if (!productoDetalle) {
  detalle.innerHTML = '<h1>Producto no encontrado</h1><p>El código indicado no existe.</p><a href="catalogo.html">Volver al catálogo</a>';
} else {
  document.title = `${productoDetalle.nombre} | Veterinaria San Marcos`;
  detalle.innerHTML = `
    <div class="detalle-producto">
      <img src="${productoDetalle.imagen}" alt="Imagen referencial de ${productoDetalle.nombre}">
      <div>
        <p class="etiqueta">${productoDetalle.categoria}</p>
        <h1>${productoDetalle.nombre}</h1>
        <p>${productoDetalle.descripcion}</p>
        <dl class="lista-datos">
          <div><dt>Código</dt><dd>${productoDetalle.codigo}</dd></div>
          <div><dt>Principio activo</dt><dd>${productoDetalle.principioActivo}</dd></div>
          <div><dt>Presentación</dt><dd>${productoDetalle.presentacion}</dd></div>
          <div><dt>Especie</dt><dd>${productoDetalle.especie}</dd></div>
          <div><dt>Stock</dt><dd>${productoDetalle.stock}</dd></div>
        </dl>
        <p class="precio precio-grande">${VSM.formatearPrecio(productoDetalle.precio)}</p>
        <label for="cantidad-detalle">Cantidad</label>
        <input id="cantidad-detalle" class="campo-cantidad" type="number" min="1" max="${productoDetalle.stock}" value="1">
        <button id="agregar-detalle" type="button" ${productoDetalle.stock === 0 ? "disabled" : ""}>Añadir al carrito</button>
        <p id="aviso-detalle" class="mensaje-estado" aria-live="polite"></p>
      </div>
    </div>`;

  document.querySelector("#agregar-detalle").addEventListener("click", () => {
    const cantidad = Number(document.querySelector("#cantidad-detalle").value);
    const aviso = document.querySelector("#aviso-detalle");
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > productoDetalle.stock) {
      aviso.textContent = `La cantidad debe estar entre 1 y ${productoDetalle.stock}.`;
      return;
    }
    const carrito = JSON.parse(localStorage.getItem(VSM.claves.carrito) || "[]");
    const item = carrito.find((registro) => registro.codigo === productoDetalle.codigo);
    const nuevaCantidad = (item ? item.cantidad : 0) + cantidad;
    if (nuevaCantidad > productoDetalle.stock) {
      aviso.textContent = "La cantidad supera el stock disponible.";
      return;
    }
    if (item) item.cantidad = nuevaCantidad;
    else carrito.push({ codigo: productoDetalle.codigo, cantidad });
    localStorage.setItem(VSM.claves.carrito, JSON.stringify(carrito));
    aviso.textContent = "Producto añadido al carrito.";
  });
}

