const contenedorProductos = document.querySelector("#lista-productos");
const contenedorDestacados = document.querySelector("#productos-destacados");
const cuerpoServicios = document.querySelector("#cuerpo-servicios");

function crearTarjetaProducto(producto) {
  const sinStock = producto.stock === 0;
  return `
    <article class="tarjeta producto-tarjeta">
      <img src="${producto.imagen}" alt="Imagen referencial de ${producto.nombre}">
      <p class="etiqueta">${producto.categoria}</p>
      <h3>${producto.nombre}</h3>
      <p>${producto.presentacion} · ${producto.especie}</p>
      <p class="precio">${VSM.formatearPrecio(producto.precio)}</p>
      <p class="stock ${sinStock ? "sin-stock" : ""}">${sinStock ? "Sin stock" : `Stock: ${producto.stock}`}</p>
      <div class="acciones-tarjeta">
        <a class="boton-secundario" href="detalle-producto.html?codigo=${encodeURIComponent(producto.codigo)}">Ver detalle</a>
        <button type="button" data-agregar="${producto.codigo}" ${sinStock ? "disabled" : ""}>Añadir</button>
      </div>
    </article>`;
}

function agregarAlCarrito(codigo) {
  const productos = VSM.obtenerProductos();
  const producto = productos.find((item) => item.codigo === codigo);
  if (!producto || producto.stock === 0) return;

  const carrito = JSON.parse(localStorage.getItem(VSM.claves.carrito) || "[]");
  const item = carrito.find((registro) => registro.codigo === codigo);
  const cantidadActual = item ? item.cantidad : 0;

  if (cantidadActual >= producto.stock) {
    mostrarAvisoCatalogo(`No puedes agregar más unidades de ${producto.nombre}.`);
    return;
  }

  if (item) item.cantidad += 1;
  else carrito.push({ codigo, cantidad: 1 });

  localStorage.setItem(VSM.claves.carrito, JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarAvisoCatalogo(`${producto.nombre} fue añadido al carrito.`);
}

function mostrarAvisoCatalogo(mensaje) {
  const aviso = document.querySelector("#aviso-catalogo");
  if (!aviso) return;
  aviso.textContent = mensaje;
}

function actualizarContadorCarrito() {
  const cantidad = JSON.parse(localStorage.getItem(VSM.claves.carrito) || "[]")
    .reduce((total, item) => total + item.cantidad, 0);
  document.querySelectorAll("[data-contador-carrito]").forEach((elemento) => {
    elemento.textContent = cantidad;
  });
}

function renderizarProductos() {
  if (!contenedorProductos) return;
  const texto = document.querySelector("#buscar-producto").value.trim().toLowerCase();
  const categoria = document.querySelector("#filtro-producto").value;
  const productos = VSM.obtenerProductos().filter((producto) => {
    const coincideTexto = `${producto.codigo} ${producto.nombre}`.toLowerCase().includes(texto);
    return coincideTexto && (categoria === "Todas" || producto.categoria === categoria);
  });

  contenedorProductos.innerHTML = productos.length
    ? productos.map(crearTarjetaProducto).join("")
    : '<p class="mensaje-vacio">No se encontraron productos con esos filtros.</p>';
  document.querySelector("#cantidad-productos").textContent = `${productos.length} producto(s) encontrado(s)`;
}

function renderizarServicios() {
  if (!cuerpoServicios) return;
  const categoria = document.querySelector("#filtro-servicio").value;
  const servicios = VSM.servicios.filter((servicio) => categoria === "Todas" || servicio.categoria === categoria);
  cuerpoServicios.innerHTML = servicios.map((servicio) => `
    <tr>
      <td>${servicio.codigo}</td><td>${servicio.categoria}</td><td>${servicio.nombre}</td>
      <td>${servicio.especie}</td><td>${servicio.duracion}</td>
      <td>${VSM.formatearPrecio(servicio.precio)}</td><td>${servicio.observaciones || "-"}</td>
    </tr>`).join("");
  document.querySelector("#cantidad-servicios").textContent = `${servicios.length} servicio(s) encontrado(s)`;
}

if (contenedorProductos) {
  const categorias = [...new Set(VSM.obtenerProductos().map((producto) => producto.categoria))];
  const selector = document.querySelector("#filtro-producto");
  categorias.forEach((categoria) => selector.add(new Option(categoria, categoria)));
  selector.addEventListener("change", renderizarProductos);
  document.querySelector("#buscar-producto").addEventListener("input", renderizarProductos);
  contenedorProductos.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-agregar]");
    if (boton) agregarAlCarrito(boton.dataset.agregar);
  });
  renderizarProductos();
}

if (cuerpoServicios) {
  const categorias = [...new Set(VSM.servicios.map((servicio) => servicio.categoria))];
  const selector = document.querySelector("#filtro-servicio");
  categorias.forEach((categoria) => selector.add(new Option(categoria, categoria)));
  selector.addEventListener("change", renderizarServicios);
  renderizarServicios();
}

if (contenedorDestacados) {
  contenedorDestacados.innerHTML = VSM.obtenerProductos().slice(0, 3).map(crearTarjetaProducto).join("");
  contenedorDestacados.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-agregar]");
    if (boton) agregarAlCarrito(boton.dataset.agregar);
  });
}

actualizarContadorCarrito();

