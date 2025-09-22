// Lista de ramos con prerequisitos
const ramos = [
  // NIVEL 100 - I
  { id:"MATG1045", nombre:"Cálculo de una variable", nivel:"100-I", prereq:[] },
  { id:"INDG1033", nombre:"Análisis y resolución de problemas", nivel:"100-I", prereq:[] },
  { id:"ECOG2067", nombre:"Introducción a la economía", nivel:"100-I", prereq:[] },
  { id:"CCAG2022", nombre:"Estudio de casos de ciencias sociales", nivel:"100-I", prereq:[] },
  { id:"ADUG2034", nombre:"Contabilidad financiera", nivel:"100-I", prereq:[] },
  { id:"IDIG1006", nombre:"Inglés I", nivel:"100-I", prereq:[] },
  { id:"COMP1001", nombre:"Complementarias de Artes/Deportes/Idiomas", nivel:"100-I", prereq:[] },

  // NIVEL 100 - II
  { id:"MATG1047", nombre:"Cálculo de varias variables", nivel:"100-II", prereq:["MATG1045"] },
  { id:"ECOG2063", nombre:"Macroeconomía I", nivel:"100-II", prereq:["ECOG2067"] },
  { id:"ECOG2047", nombre:"Economía gerencial", nivel:"100-II", prereq:["ECOG2067"] },
  { id:"ADMG2029", nombre:"Fundamentos de administración", nivel:"100-II", prereq:["CCAG2022","ECOG2067"] },
  { id:"MATG2008", nombre:"Matemáticas financieras", nivel:"100-II", prereq:["MATG1045"] },
  { id:"IDIG1007", nombre:"Inglés II", nivel:"100-II", prereq:["IDIG1006"] },

  // NIVEL 200 - I
  { id:"ESTG1036", nombre:"Estadística I", nivel:"200-I", prereq:["MATG1047"] },
  { id:"CCPG1043", nombre:"Fundamentos de programación", nivel:"200-I", prereq:["MATG1045"] },
  { id:"COMP2001", nombre:"Complementarias Humanísticas", nivel:"200-I", prereq:[] },
  { id:"ADMG2025", nombre:"Comportamiento organizacional", nivel:"200-I", prereq:["ECOG2047","ECOG2063"] },
  { id:"ADMG2034", nombre:"Gestión de RRHH", nivel:"200-I", prereq:["ADMG2029"] },
  { id:"IDIG1008", nombre:"Inglés III", nivel:"200-I", prereq:["IDIG1007"] },
  { id:"IDIG2012", nombre:"Comunicación", nivel:"200-I", prereq:[] },

  // NIVEL 200 - II
  { id:"ESTG1037", nombre:"Estadística II", nivel:"200-II", prereq:["ESTG1036","CCPG1043"] },
  { id:"ADMG2030", nombre:"Fundamentos de marketing", nivel:"200-II", prereq:[] },
  { id:"CCAG2023", nombre:"Sociología", nivel:"200-II", prereq:[] },
  { id:"ECOG2042", nombre:"Análisis financiero", nivel:"200-II", prereq:["MATG2008","ADUG2034"] },
  { id:"ADUG2033", nombre:"Contabilidad de costos", nivel:"200-II", prereq:["ADUG2034"] },
  { id:"IDIG1009", nombre:"Inglés IV", nivel:"200-II", prereq:["IDIG1008"] },

  // NIVEL 300 - I
  { id:"ADMG1005", nombre:"Emprendimiento e innovación", nivel:"300-I", prereq:[] },
  { id:"ADMG2035", nombre:"Investigación de mercados", nivel:"300-I", prereq:["ADMG2030","ESTG1037"] },
  { id:"CCPG1054", nombre:"Sistemas de información", nivel:"300-I", prereq:["15"] }, // requisito especial
  { id:"ADMG2022", nombre:"Administración de operaciones", nivel:"300-I", prereq:["ADMG2029"] },
  { id:"ECOG2055", nombre:"Fundamentos de inversiones", nivel:"300-I", prereq:["ECOG2042"] },
  { id:"IDIG1010", nombre:"Inglés V", nivel:"300-I", prereq:["IDIG1009"] },

  // NIVEL 300 - II
  { id:"ADSG1026", nombre:"Ciencias de la sostenibilidad", nivel:"300-II", prereq:["20"] },
  { id:"ADMG2033", nombre:"Gestión de marketing", nivel:"300-II", prereq:["ADMG2030"] },
  { id:"ADMG2032", nombre:"Gestión comercial", nivel:"300-II", prereq:["ADMG2025","ADMG2034","CCPG1054"] },
  { id:"ECOG2065", nombre:"Gestión tributaria", nivel:"300-II", prereq:["ADUG2033","ECOG2055"] },
  { id:"JURG2005", nombre:"Derecho societario y laboral", nivel:"300-II", prereq:["ADMG2029"] },
  { id:"PRACT", nombre:"Prácticas de servicio comunitario", nivel:"300-II", prereq:["50%"] },

  // NIVEL 400 - I
  { id:"ADMG2028", nombre:"Estrategias corporativas", nivel:"400-I", prereq:["ADMG2033","ADMG2032"] },
  { id:"INDG1060", nombre:"Administración logística", nivel:"400-I", prereq:["ADMG2022"] },
  { id:"ADMG2024", nombre:"Comercio exterior", nivel:"400-I", prereq:["ECOG2065"] },
  { id:"ECOG2066", nombre:"Planificación financiera", nivel:"400-I", prereq:["ECOG2065"] },
  { id:"ADMG2037", nombre:"Gestión de proyectos", nivel:"400-I", prereq:["ECOG2065"] },

  // NIVEL 400 - II
  { id:"ADMG2036", nombre:"Planificación estratégica", nivel:"400-II", prereq:["ADMG2033","CCAG2023"] },
  { id:"ADMG2031", nombre:"Materia integradora", nivel:"400-II", prereq:["80%"] },
];

// Estado de los ramos
const estado = {};
ramos.forEach(r => estado[r.id] = "bloqueado");

// Renderizar malla
function renderMalla() {
  const cont = document.getElementById("malla");
  cont.innerHTML = "";

  // Agrupar por nivel
  const niveles = [...new Set(ramos.map(r => r.nivel))];

  niveles.forEach(nivel => {
    const divNivel = document.createElement("div");
    divNivel.className = "nivel";
    divNivel.innerHTML = `<h2>Nivel ${nivel}</h2>`;

    const contRamos = document.createElement("div");
    contRamos.className = "ramos";

    ramos.filter(r => r.nivel === nivel).forEach(r => {
      const btn = document.createElement("div");
      btn.className = `ramo ${estado[r.id]}`;
      btn.textContent = r.nombre;
      btn.dataset.id = r.id;
      btn.onclick = () => aprobarRamo(r.id);
      contRamos.appendChild(btn);
    });

    divNivel.appendChild(contRamos);
    cont.appendChild(divNivel);
  });
}

// Revisar si un ramo está desbloqueado
function puedeDesbloquear(ramo) {
  if (ramo.prereq.length === 0) return true;
  return ramo.prereq.every(p => {
    if (p.endsWith("%")) {
      return true; // reglas especiales no implementadas
    } else if (!isNaN(p)) {
      const aprobados = Object.values(estado).filter(s => s==="aprobado").length;
      return aprobados >= parseInt(p);
    }
    return estado[p] === "aprobado";
  });
}

// Aprobar un ramo
function aprobarRamo(id) {
  if (estado[id] !== "bloqueado") {
    estado[id] = "aprobado";
    actualizarEstado();
  }
}

// Actualizar todos los estados
function actualizarEstado() {
  ramos.forEach(r => {
    if (estado[r.id] !== "aprobado" && puedeDesbloquear(r)) {
      estado[r.id] = "";
    }
  });
  renderMalla();
}

// Inicializar
actualizarEstado();
