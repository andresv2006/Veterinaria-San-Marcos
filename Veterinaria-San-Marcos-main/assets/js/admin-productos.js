const cuerpoAdmin = document.querySelector("#cuerpo-admin-productos");
const buscarAdmin = document.querySelector("#buscar-admin-producto");

function renderizarAdmin() {
  const texto = buscarAdmin.value.trim().toLowerCase();
  const productos = VSM.obtenerProductos().filter((producto) => `${producto.codigo} ${producto.nombre}`.toLowerCase().includes(texto));
  cuerpoAdmin.innerHTML = productos.map((producto) => {
    const critico = producto.stockCritico !== "" && producto.stock <= Number(producto.stockCritico);
    return `<tr class="${critico ? "fila-critica" : ""}">
      <td>${producto.codigo}</td><td>${producto.nombre}</td><td>${producto.categoria}</td>
      <td>${VSM.formatearPrecio(producto.precio)}</td><td>${producto.stock}</td><td>${producto.stockCritico === "" ? "-" : producto.stockCritico}</td>
      <td>${critico ? '<span class="alerta-stock">Stock crítico</span>' : "Normal"}</td>
      <td class="acciones-tabla"><a href="admin-producto-detalle.html?codigo=${producto.codigo}">Ver</a> <a href="admin-producto-form.html?codigo=${producto.codigo}">Editar</a></td>
    </tr>`;
  }).join("");
  document.querySelector("#cantidad-admin").textContent = `${productos.length} producto(s)`;
}

buscarAdmin.addEventListener("input", renderizarAdmin);
document.querySelector("#restaurar-productos").addEventListener("click", () => {
  localStorage.removeItem(VSM.claves.productos);
  localStorage.removeItem(VSM.claves.carrito);
  document.querySelector("#mensaje-admin").textContent = "Se restauraron los productos originales del Excel.";
  renderizarAdmin();
});
renderizarAdmin();

