var authToken = localStorage.getItem('authToken');

if (!authToken) {
  window.location.href = 'index.html';
}
fetch(`https://api-kmagic.onrender.com/comando/${localStorage.getItem('selectedOption')}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Almacenar la respuesta en localStorage
    localStorage.setItem('comandosData', JSON.stringify(data.comandos));
    //console.log('Datos de comandos almacenados en localStorage:', data.comandos);
  })
  .catch(error => {
    console.error('Error al obtener datos de la API:', error);
  });