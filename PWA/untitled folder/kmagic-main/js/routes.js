// <a class="button" id="startButton">Verificar</a>
// <a class="button" id="resetButton">Reiniciar</a>
//<a class="button" id="resetButton">Reintentar</a>
function qrCheck(dataToInsert) {
  document.querySelector('.button-container').innerHTML = ``;
  document.querySelector('.button-container').innerHTML = `
  <div class="center-container">
    <a class="button" id="startButton">Verificar Código QR</a>
    <video id="video" width="200" height="200" style="border: 1px solid gray"></video>
    <a class="button" id="skipVerificationButton">Seguir sin Verificar</a>
  </div>
`;

  const codeReader = new ZXing.BrowserQRCodeReader();
  console.log('ZXing code reader initialized');

  document.getElementById('startButton').addEventListener('click', () => {
    decodeOnce(codeReader, dataToInsert);
    console.log('Started decoding from the main camera');
  });

  /*document.getElementById('resetButton').addEventListener('click', () => {
    codeReader.reset();
    console.log('Reset.');
  });*/

  document.getElementById('skipVerificationButton').addEventListener('click', () => {
    dataToInsert.DES_CHK = 0;
    //alert('Seguir sin Verificar');
    guardarLocalmente(dataToInsert);
  });
}

function decodeOnce(codeReader, dataToInsert) {
  codeReader.decodeFromInputVideoDevice(undefined, 'video').then((result) => {
    console.log(result);

    // Verificar el código QR
    if (result.text === dataToInsert.PDR_ID) {
      dataToInsert.DES_CHK = 1;
      alert('Codigo Verificado');
    } else {
      dataToInsert.DES_CHK = 0;
      alert('Codigo NO Verificado');
      // Apagar la cámara
      codeReader.reset();
      return
    }

    // Llamar a la función para guardar localmente
    guardarLocalmente(dataToInsert);
  }).catch((err) => {
    console.error(err);
  });
}


function guardarLocalmente(dataToInsert) {
  // Guardar los datos como el almacenamiento local, cuando se actualice la pagina se insertara a la BD
  const datosPendientes = JSON.parse(localStorage.getItem('datosPendientes')) || [];
  datosPendientes.push({ dataToInsert });
  localStorage.setItem('datosPendientes', JSON.stringify(datosPendientes));
  mostrardataRoutes(); 
}

document.addEventListener('DOMContentLoaded', function () {
  // Obtener una referencia al botón "ver rutas"
  var statusLabel = document.querySelector('#status');
  const btnVerRutas = document.querySelector('#ver-rutas-btn');
  if (btnVerRutas){
  // Agregar un event listener al botón
  btnVerRutas.addEventListener('click', function () {
    // Verificar si existe 'Closed' en localStorage
    if (localStorage.getItem('Closed')) {
      // Mostrar el alert con el mensaje
      alert("Su ruta ha sido cerrada. Espere por autorización o aguarde la programación de su próxima ruta. ¡Gracias!");
      return;
    }
    
    // Verificar si existe el dato 'carga' en el almacenamiento local
    const carga = localStorage.getItem('carga');

    // Si el dato 'carga' no existe, mostrar un mensaje de alerta y redireccionar a la página 'welcome.html'
    if (!carga) {
      alert('Debe Cargar para poder Distribuir');
      // Forzar la recarga de la página
      window.location.href = "index.html";

      return; // Agrega un return para evitar que el código siga ejecutándose
    }

    // Verifica conexión a Internet
    if (navigator.onLine) {
        statusLabel.textContent = "Online";
        statusLabel.style.color = "lime";
        // Verifica si hay datos en 'dataRoutes' antes de mostrarlos
        var datos = JSON.parse(localStorage.getItem('dataRoutes'));

        if (datos && datos.length > 0) {
            mostrardataRoutes();
        } else {
            downloadRutas();
        }
    } else {
      statusLabel.textContent = "Offline";
      statusLabel.style.color = "red";
      // Verifica si hay datos en 'dataRoutes' antes de mostrarlos
      var datos = JSON.parse(localStorage.getItem('dataRoutes'));
      if (datos && datos.length > 0) {
        mostrardataRoutes();
        }else {
            // Mostrar mensaje de error en lugar de la tabla de rutas
            document.querySelector('.button-container').innerHTML = "<p>No hay datos de las rutas.</p>";
            // Agregar un botón "Volver" al final de la función que recarga la página welcome.html
            const volverBtn = document.createElement('button');
            volverBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Volver';
            volverBtn.classList.add('button'); // Agregar la clase CSS "button"
            volverBtn.addEventListener('click', () => {
              // Forzar la recarga de la página
              window.location.href = "index.html";

            });
            document.querySelector('.button-container').appendChild(volverBtn);
      }
    }
  });
  }
});

function generateUUID() {
  const data = crypto.getRandomValues(new Uint8Array(16));

  // Cambia la versión (4 bits más significativos de la tercera secuencia de datos a "0100")
  data[6] = (data[6] & 0x0F) | 0x40;

  // Cambia los bits del reloj para los números de versión 1 (bits más significativos de la secuencia de datos 0 y 1)
  data[8] = (data[8] & 0x3F) | 0x80;

  // Formatea el UUID (8-4-4-12)
  const hex = Array.from(data).map(byte => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.substr(0, 8)}-${hex.substr(8, 4)}-${hex.substr(12, 4)}-${hex.substr(16, 4)}-${hex.substr(20)}`;
}

// Función para cancelar la operación y volver a mostrar la tabla de rutas
function cancelarDescarga() {
  mostrardataRoutes();
}

// Función para guardar la descarga 
function guardarDescarga(registro) {
  const descargaInput = document.getElementById('descarga');
  const descargaValue = parseInt(descargaInput.value);

  // Validar que la descarga + ENTREGADOS sea igual o menor a LTS_ASIGNADOS
  if (descargaValue + parseInt(registro.ENTREGADOS) > parseInt(registro.LTS_ASIGNADOS)) {
    alert('La descarga excede la cantidad asignada.');
    return;
  }

  // Validar que la descarga sea menor o igual al valor de localStorage 'carga'
  var cargaActual = parseInt(localStorage.getItem('carga'));
  if (descargaValue > cargaActual) {
    alert('La descarga excede el valor disponible en carga.');
    return;
  }

  var descargaValor = descargaInput.value.toString();  // Convertir a cadena

  // Verificar si el campo está vacío o si el valor es cero
  if (descargaValor.trim() === '' || descargaValue == 0) {
    alert('Por favor, ingrese valor para la descarga.');
    return;
  }

  let carga = parseInt(localStorage.getItem('carga'));  

  // Restar la descarga ingresada al valor actual de carga
  let nuevaCarga = carga - descargaValue;
  localStorage.setItem('carga', nuevaCarga.toString()); // Actualizar el valor de carga en el almacenamiento local


  // Sumar la descarga ingresada al valor actual de ENTREGADOS
  const nuevoEntregados = parseInt(registro.ENTREGADOS) + descargaValue;

  // Actualizar ENTREGADOS
  registro.ENTREGADOS = nuevoEntregados.toString();

  // Verificar condiciones y actualizar EST_ENTG_DSC
  if (nuevoEntregados === parseInt(registro.LTS_ASIGNADOS)) {
    registro.EST_ENTG_DSC = 'COMPLETA';
  } else if (nuevoEntregados < parseInt(registro.LTS_ASIGNADOS)) {
    registro.EST_ENTG_DSC = 'INCOMPLETA';
  }


  //actualiza el dato de la ultima modificacion
  const fechaModificacion = new Date().toISOString();
  registro.LAST_UPDATE = fechaModificacion;

  // Actualizar el objeto en el localStorage
  const datos = JSON.parse(localStorage.getItem('dataRoutes'));
  const indice = datos.findIndex(item => item.PDR_ID === registro.PDR_ID); // Reemplaza 'PDR_ID' con la propiedad única de tu objeto
  datos[indice] = registro;
  localStorage.setItem('dataRoutes', JSON.stringify(datos));
  
  //actualiza el valor de carga que se muestra
  var car = localStorage.getItem('carga');
  var carLabel = document.querySelector('#carga');
  carLabel.textContent = car;
  
  // Actualiza el valor de descargas acumuladas 
  var descargaAcumulada = parseInt(localStorage.getItem('descargaAcumulada'));
  if (isNaN(descargaAcumulada)) {
  // Si el valor es NaN o no existe, inicialízalo a cero
  descargaAcumulada = 0;
  }
  const nuevaDescarga = descargaAcumulada + descargaValue;
  localStorage.setItem('descargaAcumulada', JSON.stringify(nuevaDescarga));

 // Obtén el valor almacenado en localStorage
  const x = parseInt(localStorage.getItem('cargaInicial'), 10);
  //const y = parseInt(document.getElementById('descarga').value, 10);
  //const y = parseInt(localStorage.getItem('descargaAcumulada'),10)
  if (!isNaN(x) && !isNaN(nuevaDescarga)) {
  // Resta el valor de descargaValue a cargaInicial
  const z = x - nuevaDescarga;

  // Calcula el porcentaje completo
  const rangoMinimo = 0;
  const rangoMaximo = x;
  const porcentaje = Math.min(100, Math.max(0, ((z - rangoMinimo) / (rangoMaximo - rangoMinimo)) * 100));

  // Actualiza el progressBar
  const progressBar = document.getElementById('progressbar');
  progressBar.style.width = porcentaje + '%';
  //progressBar.textContent = porcentaje + '%'; Puedes mostrar el porcentaje en el elemento
  }

    /* Obtener la fecha y hora actual
    const fechaHoraActual = new Date();

    // Obtener la fecha y hora actual en el formato deseado (YYYY-MM-DD HH:mm:ss)
    const fechaHoraFormateada = fechaHoraActual.toISOString().replace(/T/, ' ').split('.')[0];*/
    
    /// Obtener la fecha y hora actual en UTC
    const fechaHoraActualUTC = new Date();

    // Ajustar la zona horaria a Santiago de Chile (GMT-3)
    const fechaHoraActualSantiago = new Date(fechaHoraActualUTC.getTime() - (3 * 60 * 60 * 1000));

    // Formatear la fecha y hora
    const fechaHoraFormateada = fechaHoraActualSantiago.toISOString().replace(/T/, ' ').split('.')[0];

  // Actualizar en línea si hay conexión
  const desId = generateUUID();
  const dataToInsert ={
    PDR_ID: registro.PDR_ID,
    EST_ENTG_ID: registro.EST_ENTG_ID,
    EST_ENTG_DSC: registro.EST_ENTG_DSC,
    DES_VAL: descargaValue,
    DES_ASIG: registro.LTS_ASIGNADOS,
    DES_ID: desId,
    DES_FEC: fechaHoraFormateada,
    EST_DSGA_DSC : 'COMPLETA',
    OBS_DES_DSC : 'SIN OBSERVACION',
    DES_CHK: '0'
  };

  // Validar que la descarga + ENTREGADOS sea igual o menor a LTS_ASIGNADOS
  if (descargaValue + parseInt(registro.ENTREGADOS) < parseInt(registro.LTS_ASIGNADOS)) {
    elegirMotivoIncompleto(dataToInsert);
    }else{
    qrCheck(dataToInsert);
  }
}

function elegirMotivoIncompleto(dataToInsert) {
  document.querySelector('.button-container').innerHTML = `
    <div class="menu-titulo">
      <hr>
      <p>Elija motivo de Carga Incompleta</p>
      <hr>
    </div>
    <button class="button" id="btnExcedeCapacidad">
      <i class="fas fa-exclamation-triangle"></i>
      <span>Excede Capacidad</span>
    </button>
    <button class="button" id="btnAguaInsuficiente">
      <i class="fas fa-tint-slash"></i>
      <span>Agua Insuficiente</span>
    </button>
  `;

  // Agregar eventos a los botones
  document.getElementById('btnExcedeCapacidad').addEventListener('click', function() {
    // Cambiar el valor de EST_DSGA_DSC según el botón seleccionado
    dataToInsert.OBS_DES_DSC ='EXCEDE CAPACIDAD';
    dataToInsert.EST_DSGA_DSC = 'INCOMPLETA';
    qrCheck(dataToInsert);
  });

  document.getElementById('btnAguaInsuficiente').addEventListener('click', function() {
    // Cambiar el valor de EST_DSGA_DSC según el botón seleccionado    
    dataToInsert.OBS_DES_DSC ='AGUA INSUFICIENTE';
    dataToInsert.EST_DSGA_DSC = 'INCOMPLETA';
    qrCheck(dataToInsert);
  });
}

function elegirMotivoDescargaFallida(registro) {
  document.querySelector('.button-container').innerHTML = `
    <div class="menu-titulo">
      <hr>
      <p>Elija motivo de Descarga Fallida</p>
      <hr>
    </div>
    <button class="button" id="btnSinAcceso">
      <i class="fas fa-door-closed"></i>
      <span>Sin Acceso</span>
    </button>
    <button class="button" id="btnSinMoradores">
      <i class="fas fa-user-slash"></i>
      <span>Sin Moradores</span>
    </button>
    <button class="button" id="btnEstanqueNoApto">
      <i class="fas fa-times-circle"></i>
      <span>Estanque No Apto</span>
    </button>
  `;

  // Agregar eventos a los botones
  document.getElementById('btnSinAcceso').addEventListener('click', function() {
    // Buscar el objeto en localStorage con el mismo PDR_ID
    const dataRoutes = JSON.parse(localStorage.getItem('dataRoutes')) || [];
    const matchingData = dataRoutes.find(data => data.PDR_ID === registro.PDR_ID);

    if (matchingData) {
      // Actualizar el valor EST_ENTG_DSC a 'FALLIDA'
      matchingData.EST_ENTG_DSC = 'FALLIDA';

      // Guardar el objeto actualizado en localStorage
      localStorage.setItem('dataRoutes', JSON.stringify(dataRoutes));
    }
    /// Obtener la fecha y hora actual en UTC
    const fechaHoraActualUTC = new Date();

    // Ajustar la zona horaria a Santiago de Chile (GMT-3)
    const fechaHoraActualSantiago = new Date(fechaHoraActualUTC.getTime() - (3 * 60 * 60 * 1000));

    // Formatear la fecha y hora
    const fechaHoraFormateada = fechaHoraActualSantiago.toISOString().replace(/T/, ' ').split('.')[0];

    // Actualizar en línea si hay conexión
    const desId = generateUUID();
    const dataToInsert ={
      PDR_ID: registro.PDR_ID,
      EST_ENTG_ID: registro.EST_ENTG_ID,
      EST_ENTG_DSC: registro.EST_DSGA_DSC,
      DES_VAL: '0',
      DES_ASIG: registro.LTS_ASIGNADOS,
      DES_ID: desId,
      DES_FEC: fechaHoraFormateada,
      EST_DSGA_DSC : '0',
      OBS_DES_DSC : '0'
      };
      // Cambiar el valor de OBS_DES_DSC y EST_DSGA_DSC según el botón seleccionado
      dataToInsert.OBS_DES_DSC = 'SIN ACCESO';
      dataToInsert.EST_DSGA_DSC = 'FALLIDA';
      dataToInsert.EST_ENTG_DSC = 'FALLIDA';
      guardarLocalmente(dataToInsert);
  });

  document.getElementById('btnSinMoradores').addEventListener('click', function() {
    // Buscar el objeto en localStorage con el mismo PDR_ID
    const dataRoutes = JSON.parse(localStorage.getItem('dataRoutes')) || [];
    const matchingData = dataRoutes.find(data => data.PDR_ID === registro.PDR_ID);

    if (matchingData) {
      // Actualizar el valor EST_ENTG_DSC a 'FALLIDA'
      matchingData.EST_ENTG_DSC = 'FALLIDA';

      // Guardar el objeto actualizado en localStorage
      localStorage.setItem('dataRoutes', JSON.stringify(dataRoutes));
    }
    
    /// Obtener la fecha y hora actual en UTC
    const fechaHoraActualUTC = new Date();

    // Ajustar la zona horaria a Santiago de Chile (GMT-3)
    const fechaHoraActualSantiago = new Date(fechaHoraActualUTC.getTime() - (3 * 60 * 60 * 1000));

    // Formatear la fecha y hora
    const fechaHoraFormateada = fechaHoraActualSantiago.toISOString().replace(/T/, ' ').split('.')[0];

    // Actualizar en línea si hay conexión
    const desId = generateUUID();
    const dataToInsert ={
      PDR_ID: registro.PDR_ID,
      EST_ENTG_ID: registro.EST_ENTG_ID,
      EST_ENTG_DSC: registro.EST_DSGA_DSC,
      DES_VAL: '0',
      DES_ASIG: registro.LTS_ASIGNADOS,
      DES_ID: desId,
      DES_FEC: fechaHoraFormateada,
      EST_DSGA_DSC : '0',
      OBS_DES_DSC : '0'
      };
    
    // Cambiar el valor de OBS_DES_DSC y EST_DSGA_DSC según el botón seleccionado
    dataToInsert.OBS_DES_DSC = 'SIN MORADORES';
    dataToInsert.EST_DSGA_DSC = 'FALLIDA';
    dataToInsert.EST_ENTG_DSC = 'FALLIDA';
    guardarLocalmente(dataToInsert);
  });

  document.getElementById('btnEstanqueNoApto').addEventListener('click', function() {
    // Buscar el objeto en localStorage con el mismo PDR_ID
    const dataRoutes = JSON.parse(localStorage.getItem('dataRoutes')) || [];
    const matchingData = dataRoutes.find(data => data.PDR_ID === registro.PDR_ID);

    if (matchingData) {
      // Actualizar el valor EST_ENTG_DSC a 'FALLIDA'
      matchingData.EST_ENTG_DSC = 'FALLIDA';

      // Guardar el objeto actualizado en localStorage
      localStorage.setItem('dataRoutes', JSON.stringify(dataRoutes));
    }
    
    /// Obtener la fecha y hora actual en UTC
    const fechaHoraActualUTC = new Date();

    // Ajustar la zona horaria a Santiago de Chile (GMT-3)
    const fechaHoraActualSantiago = new Date(fechaHoraActualUTC.getTime() - (3 * 60 * 60 * 1000));

    // Formatear la fecha y hora
    const fechaHoraFormateada = fechaHoraActualSantiago.toISOString().replace(/T/, ' ').split('.')[0];

    // Actualizar en línea si hay conexión
    const desId = generateUUID();
    const dataToInsert ={
      PDR_ID: registro.PDR_ID,
      EST_ENTG_ID: registro.EST_ENTG_ID,
      EST_ENTG_DSC: registro.EST_DSGA_DSC,
      DES_VAL: '0',
      DES_ASIG: registro.LTS_ASIGNADOS,
      DES_ID: desId,
      DES_FEC: fechaHoraFormateada,
      EST_DSGA_DSC : '0',
      OBS_DES_DSC : '0'
      };
    // Cambiar el valor de OBS_DES_DSC y EST_DSGA_DSC segun el botón seleccionado
    dataToInsert.OBS_DES_DSC = 'ESTANQUE NO APTO';
    dataToInsert.EST_DSGA_DSC = 'FALLIDA';
    dataToInsert.EST_ENTG_DSC = 'FALLIDA';
    qrCheck(dataToInsert);
  });
}


function mostrardataRoutes() {
  // Recupera los datos desde localStorage
  var datosFiltrados = JSON.parse(localStorage.getItem('dataRoutes'));

  // Verifica si hay datos después de aplicar el filtro
  if (!datosFiltrados || datosFiltrados.length === 0) {
    console.error('No hay datos de rutas pendientes o incompletas.');
    return;
  }

  // Mostrar la tabla de rutas en el div correspondiente
  let tableHtml = "<table>";
  datosFiltrados.forEach(row => {
    // Agregar una fila a la tabla por cada fila de datos
    tableHtml += `<tr>
                      <td colspan='10'><hr></td>
                  </tr>
                  <tr>
                      <td>Localidad: ${row.LOC_NOM}</td>
                      <td>Estado: ${row.EST_ENTG_DSC}</td>
                      
                  <tr>                    
                      <td>Beneficiario: ${row.USU_NOMBRES}</td>
                      <td>${row.USU_APATERNO}</td>
                      <td><button class="seleccionar-btn">Elegir</button></td>   
                  </tr>
                  <tr>
                     <td>Asignados: ${row.LTS_ASIGNADOS}</td>
                     <td>Entregados: ${row.ENTREGADOS}</td>                                             
                  </tr>                         
                     `;
  });
  tableHtml += "</table>";
  document.querySelector('.button-container').innerHTML = tableHtml;

  // Agregar un botón "Volver" al final de la función que recarga la página welcome.html
  const volverBtn = document.createElement('button');
  volverBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Volver';
  volverBtn.classList.add('button'); // Agregar la clase CSS "button"
  volverBtn.addEventListener('click', () => {
    // Forzar la recarga de la página
    window.location.href = "index.html";

  });
  document.querySelector('.button-container').appendChild(volverBtn);

  // Agregar un evento a los botones "Entregar" para mostrar el registro seleccionado
  const botonesSeleccionar = document.querySelectorAll('.seleccionar-btn');
  botonesSeleccionar.forEach((boton, index) => {
    boton.addEventListener('click', () => {
      mostrarRegistroSeleccionado(datosFiltrados[index]);
    });
  });
}

// Función para mostrar el registro seleccionado y el campo de descarga
function mostrarRegistroSeleccionado(registro) {
  const registroSeleccionadoDiv = document.querySelector('.button-container');

  const formularioHtml = `
  <form id="registroForm">
    <p>Beneficiario: ${registro.USU_NOMBRES} ${registro.USU_APATERNO} </p>
    <p>Asignados: ${registro.LTS_ASIGNADOS}</p>
    <p>Entregados: ${registro.ENTREGADOS}</p>
    <label for="descarga">Descarga:</label> 
    <input type="number" id="descarga" name="descarga" required> 
    <button type="button" id="descargaFallidaBtn">Descarga Fallida</button>
    
    <p>
      <button type="button" id="guardarDescargaBtn">Guardar Descarga</button>
      <button type="button" onclick="cancelarDescarga()">Cancelar</button>
    </p>
  </form>
`;

  // Insertar el formulario en el div
  registroSeleccionadoDiv.innerHTML = formularioHtml;

  // Agregar un evento al botón "Guardar Descarga"
  const guardarDescargaBtn = document.querySelector('#guardarDescargaBtn');
  guardarDescargaBtn.addEventListener('click', function () {
    guardarDescarga(registro);
  });

  const descargaFallidaBtn = document.querySelector('#descargaFallidaBtn');
  descargaFallidaBtn.addEventListener('click', function () {
    elegirMotivoDescargaFallida(registro);
  });



  // Agregar un evento al botón "Cancelar"
  const cancelarBtn = document.querySelector('#registroForm button:nth-of-type(2)');
  cancelarBtn.addEventListener('click', function () {
    // Lógica para cancelar aquí, por ejemplo, volver a mostrar la tabla de rutas
    mostrardataRoutes();
  });
}

function downloadRutas() {
  // Obtener el user_id del localStorage
  const locId = localStorage.getItem('locId');

  // Hacer una petición a la API para obtener los datos de las rutas
  fetch(`api/buscar_rutas.php?id=${locId}`)
    .then(response => {
      // Verificar el estado de la respuesta
      if (!response.ok) {
        throw new Error('Sin Datos');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Verificar si los datos están vacíos o no tienen resultados
      if (!data || data.length === 0) {
        // Mostrar mensaje de error en lugar de la tabla de rutas
        document.querySelector('.button-container').innerHTML = "<p>No se encontraron rutas para este usuario.</p>";
      } else {
        // Guardar los datos como objeto JSON en el almacenamiento local del navegador
        localStorage.setItem('dataRoutes', JSON.stringify(data));
        // Recupera los datos desde localStorage
        var datos = JSON.parse(localStorage.getItem('dataRoutes'));
        // Agregar la fecha de modificación y entregados  0 a cada objeto en el JSON la primera vez que lo trae localStorage
        const fechaModificacion = new Date().toISOString();
        datos.forEach(row => {
          row.ENTREGADOS = '0';
          row.LAST_UPDATE = fechaModificacion;
        });
        // Guarda los datos actualizados en localStorage
        localStorage.setItem('dataRoutes', JSON.stringify(datos));

        // Guardar los datos y la fecha de creación en el almacenamiento local
        localStorage.setItem('dataRoutesFecha', new Date().toISOString());
        mostrardataRoutes();
      }
    })
    .catch(error => {
      console.error(error);
      // Mostrar mensaje de error en lugar de la tabla de rutas
      // document.querySelector('.button-container').innerHTML = "<p>No hay datos de las rutas.</p>";
    });
}
