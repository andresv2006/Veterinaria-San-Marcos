const formularioProducto = document.querySelector("#form-producto");
const codigoEdicion = new URLSearchParams(location.search).get("codigo");
const productosAdmin = VSM.obtenerProductos();
const productoEdicion = productosAdmin.find((producto) => producto.codigo === codigoEdicion);

function mostrarError(id, mensaje) {
  const campo = document.querySelector(`#${id}`);
  const error = document.querySelector(`#error-${id}`);
  error.textContent = mensaje;
  campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
}

function validarFormulario() {
  const codigo = formularioProducto.codigo.value.trim().toUpperCase();
  const nombre = formularioProducto.nombre.value.trim();
  const descripcion = formularioProducto.descripcion.value.trim();
  const precio = formularioProducto.precio.value;
  const stock = formularioProducto.stock.value;
  const stockCritico = formularioProducto.stockCritico.value;
  const categoria = formularioProducto.categoria.value;
  let valido = true;

  ["codigo", "nombre", "descripcion", "precio", "stock", "stockCritico", "categoria"].forEach((id) => mostrarError(id, ""));
  if (codigo.length < 3) { mostrarError("codigo", "El código es obligatorio y debe tener al menos 3 caracteres."); valido = false; }
  else if (!productoEdicion && productosAdmin.some((producto) => producto.codigo.toUpperCase() === codigo)) { mostrarError("codigo", "Ya existe un producto con ese código."); valido = false; }
  if (!nombre) { mostrarError("nombre", "El nombre es obligatorio."); valido = false; }
  else if (nombre.length > 100) { mostrarError("nombre", "El nombre no puede superar 100 caracteres."); valido = false; }
  if (descripcion.length > 500) { mostrarError("descripcion", "La descripción no puede superar 500 caracteres."); valido = false; }
  if (precio === "" || Number(precio) < 0) { mostrarError("precio", "El precio es obligatorio y debe ser igual o mayor a 0."); valido = false; }
  if (stock === "" || !Number.isInteger(Number(stock)) || Number(stock) < 0) { mostrarError("stock", "El stock debe ser un número entero igual o mayor a 0."); valido = false; }
  if (stockCritico !== "" && (!Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0)) { mostrarError("stockCritico", "El stock crítico debe ser un entero igual o mayor a 0."); valido = false; }
  if (!categoria) { mostrarError("categoria", "Selecciona una categoría."); valido = false; }
  return valido;
}

if (productoEdicion) {
  document.querySelector("#titulo-form-producto").textContent = "Editar producto";
  formularioProducto.codigo.value = productoEdicion.codigo;
  formularioProducto.codigo.readOnly = true;
  ["nombre", "descripcion", "precio", "stock", "stockCritico", "categoria", "principioActivo", "presentacion", "especie", "imagen"].forEach((campo) => {
    formularioProducto[campo].value = productoEdicion[campo] ?? "";
  });
}

formularioProducto.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (!validarFormulario()) {
    document.querySelector("#mensaje-form-producto").textContent = "Revisa los campos marcados.";
    return;
  }
  const producto = {
    codigo: formularioProducto.codigo.value.trim().toUpperCase(),
    nombre: formularioProducto.nombre.value.trim(),
    descripcion: formularioProducto.descripcion.value.trim(),
    precio: Number(formularioProducto.precio.value),
    stock: Number(formularioProducto.stock.value),
    stockCritico: formularioProducto.stockCritico.value === "" ? "" : Number(formularioProducto.stockCritico.value),
    categoria: formularioProducto.categoria.value,
    principioActivo: formularioProducto.principioActivo.value.trim() || "No informado",
    presentacion: formularioProducto.presentacion.value.trim() || "No informada",
    especie: formularioProducto.especie.value.trim() || "No informada",
    imagen: formularioProducto.imagen.value.trim() || "assets/img/mascotas.jpg"
  };
  const indice = productosAdmin.findIndex((item) => item.codigo === producto.codigo);
  if (indice >= 0) productosAdmin[indice] = producto;
  else productosAdmin.push(producto);
  VSM.guardarProductos(productosAdmin);
  location.href = `admin-producto-detalle.html?codigo=${encodeURIComponent(producto.codigo)}&guardado=1`;
});

formularioProducto.addEventListener("input", (evento) => {
  if (evento.target.id && document.querySelector(`#error-${evento.target.id}`)) mostrarError(evento.target.id, "");
});

