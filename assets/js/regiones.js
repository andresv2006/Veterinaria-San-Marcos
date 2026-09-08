/* Veterinaria San Marcos — regiones.js (Integrante 3)
   Fuente de datos separada para selección REGIÓN → COMUNA.
   Fácil de reemplazar por una API REST en el futuro.
   Estructura preparada para el catálogo de regiones/comunas de Chile. */
"use strict";

const REGIONES = [
  { id: "metropolitana", nombre: "Metropolitana de Santiago", codigo: "RM" },
  { id: "valparaiso", nombre: "Valparaíso", codigo: "VK" },
  { id: "ohiggins", nombre: "O'Higgins", codigo: "LI" },
  { id: "maule", nombre: "Maule", codigo: "ML" },
  { id: "biobio", nombre: "Biobío", codigo: "BI" }
];

const REGIONES_COMUNAS = {
  "metropolitana": [
    "Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque",
    "Estación Central", "Huechuraba", "Independencia", "La Cisterna",
    "La Florida", "La Pintana", "Las Condes", "Lo Barnechea", "Lo Espejo",
    "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda",
    "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal",
    "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón",
    "Vitacura"
  ],
  "valparaiso": [
    "Valparaíso", "Viña del Mar", "Concón", "Quintero", "Puchuncaví",
    "Quilpué", "Villa Alemana", "Los Andes", "San Esteban", "Rinconada",
    "Los Libertadores", "Calle Larga", "Catemu", "San Felipe", "Putaendo",
    "Santa María", "Panquehue", "Llaillay", "Curauma", "Placilla"
  ],
  "ohiggins": [
    "Rancagua", "Machalí", "Rengo", "San Fernando", "Santa Cruz",
    "Chimbarongo", "Graneros", "Mostazal", "Codegua", "Requínoa",
    "Doñihue", "Peumo", "Pichidegua", "La Estrella", "Litueche",
    "Morrón", "Nancagua", "Palmilla", "Peralillo", "Placilla"
  ],
  "maule": [
    "Talca", "San Javier", "Villa Alegre", "Constitución", "Pencahue",
    "Maule", "Curicó", "Hualañé", "Licantén", "Vichuquén",
    "Linares", "Colbún", "Longaví", "Retiro", "San Javier",
    "Villa Alegre", "Yerbas Buenas"
  ],
  "biobio": [
    "Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante",
    "Coronel", "Lota", "Hualpén", "Tomé", "Penco", "Lebu",
    "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos",
    "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Yumbel"
  ]
};

function obtenerRegiones() {
  return REGIONES.map((r) => ({ ...r }));
}

function obtenerComunas(regionId) {
  if (!regionId || !REGIONES_COMUNAS[regionId]) return [];
  return REGIONES_COMUNAS[regionId].slice();
}

function obtenerTodosDatos() {
  return {
    regiones: obtenerRegiones(),
    regionesComunas: REGIONES_COMUNAS
  };
}

window.VSM_REGIONES = { obtenerRegiones, obtenerComunas, obtenerTodosDatos };
