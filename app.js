// Obtener el elemento select
const select = document.querySelector('#lista');

// Obtener la tabla y su cuerpo
const tabla = document.querySelector('#tablaDetalle');
const cuerpoTabla = tabla.querySelector('tbody');

// Leer el archivo JSON
fetch('compras.json')
  .then(response => response.json())
  .then(data => {

    // Obtener la cantidad de listas
    const cantidadListas = data.length;

    // Crear las opciones del select
    for (let i = 0; i < cantidadListas; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `Lista ${i + 1}`;
      select.appendChild(option);
    }

    // Función que muestra el detalle de la lista seleccionada
    function mostrarDetalleLista() {
      // Limpiar la tabla
      cuerpoTabla.innerHTML = '';

      const indiceListaSeleccionada = select.value;
      const detalleLista = data[indiceListaSeleccionada].lista;

      // Agregar los elementos de la lista a la tabla
      detalleLista.forEach(elemento => {
        const fila = document.createElement('tr');
        const celdaNombre = document.createElement('td');
        const celdaCantidad = document.createElement('td');
        celdaNombre.textContent = elemento.nombre;
        celdaCantidad.textContent = elemento.cantidad;
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCantidad);
        cuerpoTabla.appendChild(fila);
      });
    }

    // Agregar un evento change al select
    select.addEventListener('change', mostrarDetalleLista);


//=========================MOSTRAR SECCIONES===========================

// Cargar el archivo XML
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    mostrarSecciones(this);
  }
};
xhttp.open("GET", "secciones.xml", true);
xhttp.send();


// Función para mostrar las secciones
function mostrarSecciones(xml) {
  const xmlDoc = xml.responseXML;
  const table = document.getElementById("sections").getElementsByTagName(
    "tbody"
  )[0];
  const secciones = xmlDoc.getElementsByTagName("seccion");
  for (let i = 0; i < secciones.length; i++) {
    const nombre = secciones[i].getElementsByTagName("nombre")[0].childNodes[0]
      .nodeValue;
    const productos = secciones[i].getElementsByTagName("productos")[0]
      .childNodes[0].nodeValue;
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = nombre;
    cell2.innerHTML = productos;
  }
}
//=====================================================================


  })
  .catch(error => console.error(error));