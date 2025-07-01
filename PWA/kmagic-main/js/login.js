document.addEventListener('DOMContentLoaded', function() {
    // Capturar el formulario de login
    var form = document.querySelector('#login-form');
    var statusLabel = document.querySelector('#status');
    // Verificar el estado de conexión
    if (navigator.onLine) {
      statusLabel.textContent = "Online";
      statusLabel.style.color = "lime";
    } else {
      statusLabel.textContent = "Offline";
      statusLabel.style.color = "red";
    }
  
    // Verificar si ya existe un token de sesión almacenado
    if (localStorage.getItem('user_id')) {
      redirectToHomePage();
    }
  
    // Función para redirigir al usuario a la página principal
    function redirectToHomePage() {
      window.location.href = 'home.html';
    }
  
    // Capturar el formulario de login
    var form = document.querySelector('#login-form');
  
    // Agregar evento de envío del formulario
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Obtener los valores de los campos de texto del formulario
      var username = form.querySelector('#username').value;
      var password = form.querySelector('#password').value;
  
      // Realizar validaciones básicas en el lado del cliente
      if (username.trim() === '' || password.trim() === '') {
        alert('Por favor, ingrese un nombre de usuario y contraseña válidos.');
        return;
      }
  
      // Crear una instancia de XMLHttpRequest
      var xhr = new XMLHttpRequest();
  
      // Configurar la solicitud
      xhr.open('POST', '/api/valdidar_credenciales.php', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      // Manejar la respuesta de la solicitud
      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          // Almacenar el token de sesión en el almacenamiento local del navegador
          localStorage.setItem('sessionToken', response.token);
          localStorage.setItem('user_id', response.id);
  
          // Redirigir al usuario a la página principal
          redirectToHomePage();
        } else {
          alert('Error al iniciar sesión: ' + xhr.statusText);
        }
      };
  
      // Manejar errores en la solicitud
      xhr.onerror = function() {
        alert('Error al enviar la solicitud.');
      };
  
      // Enviar los datos al servidor
      var data = {
        username: username,
        password: password
      };
      xhr.send(JSON.stringify(data));
    });
  
    // Verificar si ya existe un token de sesión almacenado
    if (localStorage.getItem('sessionToken')) {
      redirectToHomePage();
    }
  
    // Función para redirigir al usuario a la página principal
    function redirectToHomePage() {
      window.location.href = 'home.html';
    }
  });