/* Datos traspasados desde el Excel "Catálogo Veterinaria San Marcos - Forma A". */
window.VSM = window.VSM || {};

window.VSM.servicios = [
  { codigo: "SV001", categoria: "Consultas", nombre: "Consulta general", especie: "Perro / Gato", duracion: "30 min", precio: 15000, observaciones: "" },
  { codigo: "SV002", categoria: "Consultas", nombre: "Consulta urgencia", especie: "Perro / Gato", duracion: "30 min", precio: 25000, observaciones: "Fuera de horario +$10.000" },
  { codigo: "SV003", categoria: "Consultas", nombre: "Control postoperatorio", especie: "Perro / Gato", duracion: "20 min", precio: 10000, observaciones: "" },
  { codigo: "SV004", categoria: "Consultas", nombre: "Consulta ave / conejo", especie: "Ave / Conejo", duracion: "30 min", precio: 18000, observaciones: "" },
  { codigo: "SV005", categoria: "Consultas", nombre: "Segunda opinión médica", especie: "Todas", duracion: "40 min", precio: 20000, observaciones: "Requiere ficha previa" },
  { codigo: "VA001", categoria: "Vacunación", nombre: "Vacuna antirrábica canina", especie: "Perro", duracion: "10 min", precio: 12000, observaciones: "Obligatoria por ley" },
  { codigo: "VA002", categoria: "Vacunación", nombre: "Vacuna sextuple canina", especie: "Perro", duracion: "10 min", precio: 18000, observaciones: "Refuerzo anual" },
  { codigo: "VA003", categoria: "Vacunación", nombre: "Vacuna bivalente felina", especie: "Gato", duracion: "10 min", precio: 15000, observaciones: "Refuerzo anual" },
  { codigo: "VA004", categoria: "Vacunación", nombre: "Vacuna triple felina", especie: "Gato", duracion: "10 min", precio: 17000, observaciones: "Refuerzo anual" },
  { codigo: "VA005", categoria: "Vacunación", nombre: "Vacuna Bordetella canina", especie: "Perro", duracion: "10 min", precio: 14000, observaciones: "Tos de las perreras" },
  { codigo: "VA006", categoria: "Vacunación", nombre: "Vacuna antirrábica felina", especie: "Gato", duracion: "10 min", precio: 12000, observaciones: "" },
  { codigo: "CI001", categoria: "Cirugía", nombre: "Esterilización hembra canina", especie: "Perra", duracion: "90 min", precio: 80000, observaciones: "Incluye anestesia y hospitalización 24h" },
  { codigo: "CI002", categoria: "Cirugía", nombre: "Esterilización macho canino", especie: "Perro", duracion: "60 min", precio: 60000, observaciones: "Incluye anestesia" },
  { codigo: "CI003", categoria: "Cirugía", nombre: "Esterilización hembra felina", especie: "Gata", duracion: "60 min", precio: 65000, observaciones: "Incluye anestesia y hospitalización 12h" },
  { codigo: "CI004", categoria: "Cirugía", nombre: "Esterilización macho felino", especie: "Gato", duracion: "45 min", precio: 50000, observaciones: "Incluye anestesia" },
  { codigo: "CI005", categoria: "Cirugía", nombre: "Extirpación de tumor cutáneo", especie: "Perro / Gato", duracion: "60 min", precio: 120000, observaciones: "Precio referencial; varía según tamaño" },
  { codigo: "CI006", categoria: "Cirugía", nombre: "Cesárea de urgencia", especie: "Perra / Gata", duracion: "120 min", precio: 180000, observaciones: "" },
  { codigo: "DE001", categoria: "Desparasitación", nombre: "Desparasitación interna pequeños (<10 kg)", especie: "Perro", duracion: "5 min", precio: 8000, observaciones: "" },
  { codigo: "DE002", categoria: "Desparasitación", nombre: "Desparasitación interna medianos (10-25 kg)", especie: "Perro", duracion: "5 min", precio: 9500, observaciones: "" },
  { codigo: "DE003", categoria: "Desparasitación", nombre: "Desparasitación interna grandes (>25 kg)", especie: "Perro", duracion: "5 min", precio: 11000, observaciones: "" },
  { codigo: "DE004", categoria: "Desparasitación", nombre: "Desparasitación interna felina", especie: "Gato", duracion: "5 min", precio: 8000, observaciones: "" },
  { codigo: "DE005", categoria: "Desparasitación", nombre: "Antiparasitario externo (pipeta)", especie: "Perro / Gato", duracion: "5 min", precio: 7500, observaciones: "Incluye aplicación" },
  { codigo: "EX001", categoria: "Exámenes", nombre: "Hemograma completo", especie: "Perro / Gato", duracion: "30 min", precio: 22000, observaciones: "Resultado en 24-48 h" },
  { codigo: "EX002", categoria: "Exámenes", nombre: "Perfil bioquímico completo", especie: "Perro / Gato", duracion: "30 min", precio: 35000, observaciones: "Resultado en 24-48 h" },
  { codigo: "EX003", categoria: "Exámenes", nombre: "Radiografía (1 proyección)", especie: "Perro / Gato", duracion: "20 min", precio: 28000, observaciones: "" },
  { codigo: "EX004", categoria: "Exámenes", nombre: "Ecografía abdominal", especie: "Perro / Gato", duracion: "30 min", precio: 45000, observaciones: "" },
  { codigo: "EX005", categoria: "Exámenes", nombre: "Test de leishmaniasis", especie: "Perro", duracion: "20 min", precio: 18000, observaciones: "" },
  { codigo: "OT001", categoria: "Otros", nombre: "Corte de uñas", especie: "Perro / Gato", duracion: "15 min", precio: 5000, observaciones: "" },
  { codigo: "OT002", categoria: "Otros", nombre: "Limpieza dental", especie: "Perro / Gato", duracion: "45 min", precio: 55000, observaciones: "Requiere anestesia" },
  { codigo: "OT003", categoria: "Otros", nombre: "Microchip identificación", especie: "Perro / Gato", duracion: "10 min", precio: 15000, observaciones: "Incluye registro" },
  { codigo: "OT004", categoria: "Otros", nombre: "Hospitalización (por día)", especie: "Perro / Gato", duracion: "24 h", precio: 30000, observaciones: "Incluye monitoreo y alimentación básica" }
];

window.VSM.productosIniciales = [
  { codigo: "ME001", categoria: "Antibióticos", nombre: "Amoxibay 250mg", principioActivo: "Amoxicilina", presentacion: "Blíster 10 comp.", especie: "Perro / Gato", stock: 45, stockCritico: 10, precio: 4200, descripcion: "Antibiótico veterinario. Presentación: blíster de 10 comprimidos.", imagen: "assets/img/amoxibay.jpg" },
  { codigo: "ME002", categoria: "Antibióticos", nombre: "Enrox 50mg", principioActivo: "Enrofloxacino", presentacion: "Blíster 10 comp.", especie: "Perro / Gato", stock: 30, stockCritico: 10, precio: 6800, descripcion: "Antibiótico veterinario. Presentación: blíster de 10 comprimidos.", imagen: "assets/img/enrox.png" },
  { codigo: "ME003", categoria: "Antibióticos", nombre: "Metrobay 250mg", principioActivo: "Metronidazol", presentacion: "Blíster 10 comp.", especie: "Perro / Gato", stock: 28, stockCritico: 10, precio: 3900, descripcion: "Medicamento veterinario para perros y gatos.", imagen: "assets/img/metrobay.jpg" },
  { codigo: "ME004", categoria: "Antiparasitarios", nombre: "Nexgard", principioActivo: "Afoxolaner", presentacion: "Masticable 1 unid.", especie: "Perro", stock: 60, stockCritico: 12, precio: 9500, descripcion: "Antiparasitario masticable para perros.", imagen: "assets/img/nexgard.jpg" },
  { codigo: "ME005", categoria: "Antiparasitarios", nombre: "Bravecto", principioActivo: "Fluralaner", presentacion: "Masticable 1 unid.", especie: "Perro", stock: 40, stockCritico: 10, precio: 18900, descripcion: "Antiparasitario masticable para perros.", imagen: "assets/img/Bravecto.png" },
  { codigo: "ME006", categoria: "Antiparasitarios", nombre: "Revolution Plus", principioActivo: "Selamectina+Sarolaner", presentacion: "Pipeta 1 unid.", especie: "Gato", stock: 35, stockCritico: 10, precio: 14500, descripcion: "Pipeta antiparasitaria para gatos.", imagen: "assets/img/revolution.png" },
  { codigo: "ME007", categoria: "Antiparasitarios", nombre: "Drontal Plus", principioActivo: "Praziquantel+Pamoato", presentacion: "Comprimido 1 unid.", especie: "Perro", stock: 80, stockCritico: 15, precio: 3200, descripcion: "Comprimido antiparasitario para perros.", imagen: "assets/img/drontal.jpg" },
  { codigo: "ME008", categoria: "Antiparasitarios", nombre: "Milbemax Gato", principioActivo: "Milbemicina+Praziq.", presentacion: "Comprimido 2 unid.", especie: "Gato", stock: 50, stockCritico: 10, precio: 6800, descripcion: "Comprimidos antiparasitarios para gatos.", imagen: "assets/img/milbemax.jpg" },
  { codigo: "ME009", categoria: "Antiinflamatorios", nombre: "Meloxicam 1mg", principioActivo: "Meloxicam", presentacion: "Blíster 10 comp.", especie: "Perro / Gato", stock: 55, stockCritico: 10, precio: 4500, descripcion: "Antiinflamatorio veterinario para perros y gatos.", imagen: "assets/img/meloxicam.jpg" },
  { codigo: "ME010", categoria: "Antiinflamatorios", nombre: "Carprofen 50mg", principioActivo: "Carprofeno", presentacion: "Blíster 10 comp.", especie: "Perro", stock: 30, stockCritico: 10, precio: 9800, descripcion: "Antiinflamatorio veterinario para perros.", imagen: "assets/img/carprofen.jpg" },
  { codigo: "ME011", categoria: "Dermatología", nombre: "Clorhexidina shampoo", principioActivo: "Clorhexidina 2%", presentacion: "Frasco 250ml", especie: "Perro / Gato", stock: 25, stockCritico: 8, precio: 8900, descripcion: "Shampoo dermatológico veterinario de 250 ml.", imagen: "assets/img/clor shampoo.jpg" },
  { codigo: "ME012", categoria: "Dermatología", nombre: "Malaseb shampoo", principioActivo: "Miconazol+Clorhex.", presentacion: "Frasco 250ml", especie: "Perro / Gato", stock: 20, stockCritico: 8, precio: 12500, descripcion: "Shampoo dermatológico veterinario de 250 ml.", imagen: "assets/img/malaseb.jpg" },
  { codigo: "ME013", categoria: "Dermatología", nombre: "Apoquel 16mg", principioActivo: "Oclacitinib", presentacion: "Blíster 10 comp.", especie: "Perro", stock: 18, stockCritico: 8, precio: 22000, descripcion: "Medicamento dermatológico para perros.", imagen: "assets/img/qpoquel.png" },
  { codigo: "ME014", categoria: "Digestivo", nombre: "Probifor", principioActivo: "Bacillus clausii", presentacion: "Sobre 5ml x10", especie: "Perro / Gato", stock: 40, stockCritico: 10, precio: 5600, descripcion: "Suplemento digestivo veterinario en sobres.", imagen: "assets/img/probifor creo.jpg" },
  { codigo: "ME015", categoria: "Digestivo", nombre: "Omeprazol 10mg vet", principioActivo: "Omeprazol", presentacion: "Blíster 10 comp.", especie: "Perro / Gato", stock: 35, stockCritico: 10, precio: 3800, descripcion: "Medicamento digestivo veterinario.", imagen: "assets/img/omeprazol.png" },
  { codigo: "ME016", categoria: "Cardíaco", nombre: "Vetmedin 2.5mg", principioActivo: "Pimobendan", presentacion: "Blíster 10 comp.", especie: "Perro", stock: 15, stockCritico: 15, precio: 28000, descripcion: "Medicamento veterinario de uso cardíaco para perros.", imagen: "assets/img/vetmedin.png" },
  { codigo: "ME017", categoria: "Analgésicos", nombre: "Tramadol 50mg vet", principioActivo: "Tramadol", presentacion: "Blíster 10 comp.", especie: "Perro", stock: 22, stockCritico: 8, precio: 5200, descripcion: "Analgésico veterinario para perros.", imagen: "assets/img/tramadol.jpg" },
  { codigo: "ME018", categoria: "Vacunas", nombre: "Nobivac DHPPi", principioActivo: "Vacuna polivalente", presentacion: "Vial 1 dosis", especie: "Perro", stock: 48, stockCritico: 12, precio: 8500, descripcion: "Vacuna polivalente en vial de una dosis para perros.", imagen: "assets/img/novibacdhpi.jpg" },
  { codigo: "ME019", categoria: "Vacunas", nombre: "Nobivac Rabies", principioActivo: "Vacuna antirrábica", presentacion: "Vial 1 dosis", especie: "Perro / Gato", stock: 60, stockCritico: 15, precio: 5800, descripcion: "Vacuna antirrábica en vial de una dosis.", imagen: "assets/img/rabies.jpg" },
  { codigo: "ME020", categoria: "Vacunas", nombre: "Felocell CVR", principioActivo: "Vacuna triple felina", presentacion: "Vial 1 dosis", especie: "Gato", stock: 36, stockCritico: 10, precio: 7200, descripcion: "Vacuna triple felina en vial de una dosis.", imagen: "assets/img/felocel.jpg" },
  { codigo: "ME021", categoria: "Suplementos", nombre: "Omega vet 3-6-9", principioActivo: "Ácidos grasos omega", presentacion: "Frasco 100ml", especie: "Perro / Gato", stock: 30, stockCritico: 10, precio: 9900, descripcion: "Suplemento de ácidos grasos omega para perros y gatos.", imagen: "assets/img/3-6-9 omega.jpg" },
  { codigo: "ME022", categoria: "Suplementos", nombre: "Condrovet forte", principioActivo: "Condroitín+Glucos.", presentacion: "Blíster 30 comp.", especie: "Perro", stock: 25, stockCritico: 8, precio: 14500, descripcion: "Suplemento articular en blíster de 30 comprimidos.", imagen: "assets/img/forza.jpg" }
];

window.VSM.claves = {
  productos: "vsm_productos",
  carrito: "vsm_carrito"
};

window.VSM.obtenerProductos = function () {
  try {
    const guardados = localStorage.getItem(window.VSM.claves.productos);
    return guardados ? JSON.parse(guardados) : window.VSM.productosIniciales.map((producto) => ({ ...producto }));
  } catch (error) {
    return window.VSM.productosIniciales.map((producto) => ({ ...producto }));
  }
};

window.VSM.guardarProductos = function (productos) {
  localStorage.setItem(window.VSM.claves.productos, JSON.stringify(productos));
};

window.VSM.formatearPrecio = function (valor) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(valor);
};
