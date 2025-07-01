if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    fetch('manifest.json')  // Ajusta la ruta si es necesario
      .then(response => response.json())
      .then(manifest => {
        const version = manifest.version || '1.0';  // Si no hay versión, usa un valor predeterminado
        return navigator.serviceWorker.register(`sw.js?v=${version}`);
      })
      .then(registration => {
        console.log('SW Registrado con Éxito: ', registration.scope);
      })
      .catch(err => {
        console.log('SW fallo registro: ', err);
      });
  });
}

  
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(registration => {
    registration.addEventListener('updatefound', () => {
      const installingWorker = registration.installing;
      installingWorker.addEventListener('statechange', () => {
        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Hay una nueva versión disponible
          const updateAvailableEvent = new CustomEvent('updateAvailable');
          document.dispatchEvent(updateAvailableEvent);
        }
      });
    });

   
  });

  /*document.addEventListener('updateAvailable', () => {
    const message = '¡Nueva versión disponible! Recargue la página para actualizar.';
    if (window.confirm(message)) {
      // Recarga la página
      window.location.href = 'home.html';
    }
  });*/
}




  function qrCheck() {
      const startButton = document.getElementById('startButton');

      startButton.addEventListener('click', () => {
          const codeReader = new ZXing.BrowserQRCodeReader();
          console.log('ZXing code reader initialized');
          decodeOnce(codeReader);
          console.log('Started decoding from the main camera');
      });

      document.getElementById('skipVerificationButton').addEventListener('click', () => {
          // Lógica para manejar el ingreso manual
          alert('Ingreso Manual');
      });
  }

  function decodeOnce(codeReader) {
      codeReader.decodeFromInputVideoDevice(undefined, 'video').then((result) => {
          // Guardar el resultado en localStorage
          guardarLocalmente(result.text);
          // Cerrar el lector después de guardar en localStorage
          codeReader.stopContinuousDecode();
          // Puedes ocultar o destruir el elemento del video si es necesario
          const videoElement = document.getElementById('video');
          videoElement.srcObject.getTracks().forEach(track => track.stop());
          videoElement.parentElement.removeChild(videoElement);
      }).catch((err) => {
          console.error(err);
      });
  }

  function guardarLocalmente(dataToInsert) {
      // Guardar en localStorage
      localStorage.setItem('qrCode', dataToInsert);
      
      console.log('Código QR guardado en localStorage:', dataToInsert);

      // Redireccionar a home.html
      window.location.href = 'home.html';
  }


