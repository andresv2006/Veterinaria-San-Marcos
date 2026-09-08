const cuerpoCarrito = document.querySelector("#cuerpo-carrito");

function leerCarrito() {
  try { return JSON.parse(localStorage.getItem(VSM.claves.carrito) || "[]"); }
  catch (error) { return []; }
}

function guardarCarrito(carrito) {
  localStorage.setItem(VSM.claves.carrito, JSON.stringify(carrito));
  renderizarCarrito();
}

function renderizarCarrito() {
  const productos = VSM.obtenerProductos();
  const carrito = leerCarrito().filter((item) => productos.some((producto) => producto.codigo === item.codigo));
  let total = 0;

  cuerpoCarrito.innerHTML = carrito.map((item) => {
    const producto = productos.find((registro) => registro.codigo === item.codigo);
    const subtotal = producto.precio * item.cantidad;
    total += subtotal;
    return `<tr>
      <td><strong>${producto.nombre}</strong><br><small>${producto.codigo}</small></td>
      <td>${VSM.formatearPrecio(producto.precio)}</td>
      <td><input class="campo-cantidad" type="number" min="1" max="${producto.stock}" value="${item.cantidad}" data-cantidad="${producto.codigo}" aria-label="Cantidad de ${producto.nombre}"></td>
      <td>${VSM.formatearPrecio(subtotal)}</td>
      <td><button class="boton-peligro" type="button" data-quitar="${producto.codigo}">Quitar</button></td>
    </tr>`;
  }).join("");

  if (!carrito.length) {
    cuerpoCarrito.innerHTML = '<tr><td colspan="5" class="mensaje-vacio">Tu carrito está vacío.</td></tr>';
  }
  document.querySelector("#total-carrito").textContent = VSM.formatearPrecio(total);
  document.querySelector("#vaciar-carrito").disabled = carrito.length === 0;
  document.querySelector("#finalizar-carrito").disabled = carrito.length === 0;
  document.querySelector("#mensaje-carrito").textContent = "";
}

cuerpoCarrito.addEventListener("change", (evento) => {
  if (!evento.target.matches("[data-cantidad]")) return;
  const carrito = leerCarrito();
  const productos = VSM.obtenerProductos();
  const item = carrito.find((registro) => registro.codigo === evento.target.dataset.cantidad);
  const producto = productos.find((registro) => registro.codigo === evento.target.dataset.cantidad);
  const cantidad = Number(evento.target.value);
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > producto.stock) {
    document.querySelector("#mensaje-carrito").textContent = `La cantidad de ${producto.nombre} debe estar entre 1 y ${producto.stock}.`;
    evento.target.value = item.cantidad;
    return;
  }
  item.cantidad = cantidad;
  guardarCarrito(carrito);
});

cuerpoCarrito.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-quitar]");
  if (!boton) return;
  guardarCarrito(leerCarrito().filter((item) => item.codigo !== boton.dataset.quitar));
});

document.querySelector("#vaciar-carrito").addEventListener("click", () => guardarCarrito([]));
document.querySelector("#finalizar-carrito").addEventListener("click", () => {
  localStorage.removeItem(VSM.claves.carrito);
  renderizarCarrito();
  document.querySelector("#mensaje-carrito").textContent = "Compra simulada correctamente. En esta etapa no se realiza un pago real.";
});

renderizarCarrito();
