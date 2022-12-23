const contenedor = document.querySelector("#contenedor");
let tipos = [
  "I. El marco normativo aplicable al sujeto obligado",
  "II. Su estructura orgánica completa",
  "III. Las facultades de cada Área",
  "IV. Las metas y objetivos de las Áreas de conformidad con sus programas operativos",
  "V. Los indicadores relacionados con temas de interés público o trascendencia social",
  "VI. Los indicadores que permitan rendir cuenta de sus objetivos y resultados",
  "VII. El directorio de todos los Servidores Públicos.",
  "VIII. La remuneración bruta y neta de todos los Servidores Públicos",
  "IX. Los gastos de representación y viáticos",
  "X. El número total de las plazas y del personal de base y confianza",
  "XI. Las contrataciones de servicios profesionales por honorarios",
  "XII. La información en Versión Pública de las declaraciones patrimoniales",
  "XIII. El nombre, domicilio de la Unidad de Transparencia y de los servidores públicos encargados del Comité de Transparencia",
  "XIV. Las convocatorias a concursos para ocupar cargos públicos y los resultados de los mismos",
  "XV. La información de los programas de subsidios, estímulos, aportaciones y apoyos",
  "XVI. Las condiciones generales de trabajo",
  "XVII. La información curricular",
  "XVIII. El listado de Servidores Públicos con sanciones administrativas definitivas",
  "XIX. Los servicios que ofrecen y los programas que administra",
  "XX. Los trámites, requisitos y formatos que ofrecen",
  "XXI. La información financiera en términos de la Ley General de Contabilidad Gubernamental",
  "XXII. La información relativa a la deuda pública",
  "XXIII. Los montos destinados a gastos relativos a comunicación social y publicidad oficial",
  "XXIV. Los informes de resultados de las auditorías al ejercicio presupuestal de cada sujeto obligado que se realicen",
  "XXV. El resultado de la dictaminación de los estados financieros",
  "XXVI. Los montos, criterios, convocatorias y listado de personas físicas o morales",
  "XXVII. Las concesiones, contratos, convenios, permisos, licencias o autorizaciones otorgados",
  "XXVIII. La información de los resultados sobre procedimientos de adjudicación directa",
  "XXIX. Los informes que por disposición legal generen los sujetos obligados",
  "XXX. Las estadísticas que generen en cumplimiento de sus facultades, competencias o funciones",
  "XXXI. Informe de avances programáticos o presupuestales, balances generales y su estado financiero",
  "XXXII. Padrón de proveedores y contratistas",
  "XXXIII. Los convenios de coordinación que celebren con la federación, otros estados o municipios, partidos políticos, instituciones de enseñanza o cualquier organización",
  "XXXIV. El inventario de bienes muebles e inmuebles en posesión y propiedad",
  "XXXV. Las recomendaciones emitidas por los órganos públicos del Estado mexicano u organismos internacionales garantes de los derechos humanos",
  "XXXVI. Las resoluciones y laudos que se emitan en procesos o procedimientos seguidos en forma de juicio",
  "XXXVII. Los mecanismos de participación ciudadana",
  "XXXVIII. Los programas que ofrecen, incluyendo información sobre la población, objetivo y destino, así como los trámites",
  "XXXIX. Las actas y resoluciones del Comité de Transparencia de los sujetos obligados",
  "XL. Todas las evaluaciones y encuestas que hagan los sujetos obligados a programas financiados con recursos públicos",
  "XLI. Los estudios financiados con recursos públicos",
  "XLII. El listado de jubilados y pensionados y el monto que reciben",
  "XLIII. Los ingresos recibidos por cualquier concepto",
  "XLIV. Donaciones hechas a terceros en dinero o en especie",
  "XLV. El catálogo de disposición y guía de archivo documental",
  "XLVI. Las actas de sesiones ordinarias y extraordinarias, así como las opiniones y recomendaciones que emitan",
  "XLVII. Para efectos estadísticos, el listado de solicitudes a las empresas concesionarias de telecomunicaciones y proveedores de servicios o aplicaciones de Internet",
  "XLVIII. El seguimiento de las obligaciones de responsabilidad hacendaria",
  "XLIX. Cualquier otra información que sea de utilidad o se considere relevante",
  "Último Párrafo",
];
window.onload = async () => {
  for (let i = 0; i < tipos.length; i++) {
    await fetchs(`tipo=${tipos[i]}`, tipos[i]);
  }
};

async function fetchs(url, tipos) {
  
  await fetch(`http://localhost:8080/api/pdf/seccion/Transparencia?${url}`)
    .then(async (res) => {
      const x = await res.json();
      
      if (x.total === 0) {
        let h2 = document.createElement("h2");
        h2.style.margin = "20px";
        h2.textContent = "No se encuentran los archivos";
        contenedor.appendChild(h2);
      }

      let _listGroupItem = document.createElement("div");
      _listGroupItem.classList.add("row","shadow-lg","p-3");
      _listGroupItem.id = "r";
      _listGroupItem.style.borderRadius="6px";
      contenedor.appendChild(_listGroupItem);

      let _nombreSeccion = document.createElement("div");
      _nombreSeccion.classList.add("col", "col-xl-4");
      _nombreSeccion.textContent = tipos;
      _listGroupItem.appendChild(_nombreSeccion);

      let _div = document.createElement("div");
      _div.classList.add("col-xl-8");
      _listGroupItem.appendChild(_div);

      
      for (let i = 0; i < x.total; i++) {
        cargarLinks(x.pdfs[i], _div);
      }
    })
    .catch((err) => console.log(err));
}
function cargarLinks(x, _div) {
  let _divRow = document.createElement("div");
  _divRow.classList.add("row");
  _divRow.id = "arriba";
  _div.appendChild(_divRow);

  let _nombreDocu = document.createElement("div");
  _nombreDocu.classList.add("col-8", "col-sm-8");
  _nombreDocu.textContent = x.nombre.replace(/-/g," ");
  _divRow.appendChild(_nombreDocu);

  let _divDescargar = document.createElement("div");
  _divDescargar.classList.add("col-8", "col-sm-4");
  _divRow.appendChild(_divDescargar);

  let _aDescargar = document.createElement("a");
  _aDescargar.href = `/archivos/${x.seccion}/${x.nombre}`;
  _aDescargar.target = "_blank";
  _aDescargar.textContent = "Descargar";
  _divDescargar.appendChild(_aDescargar);
}

/* 
<div class="row" id="r">
    <div class="col col-xl-4">I. Marco Institucional</div>
    <div class="col-xl-8">
        <div class="row" id="arriba">
            <div class="col-8 col-sm-8">Marco normativo</div>
            <div class="col-8 col-sm-4">
              <a href="#">Descargar</a>
            </div>
        </div>
    </div>
</div> */
