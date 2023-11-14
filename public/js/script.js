let formulario = document.getElementById('health-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento de envío predeterminado

    // Recopilar datos del formulario
    let formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Enviar datos al servidor
    fetch('https://tu-api-gateway-url/submit', { // Reemplaza con tu URL de API Gateway
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); // Convertir respuesta a formato JSON
    })
    .then(data => {
        // Mostrar los datos en el modal
        let outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '';
        if (Array.isArray(data)) {
            data.forEach(row => {
                outputDiv.innerHTML += `<pre>${JSON.stringify(row, null, 2)}</pre>`;
            });
        } else {
            outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }

        // Mostrar el modal
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Error al procesar la solicitud: ' + error.message); // Mostrar error al usuario
    });

    // Cerrar el modal
    let closeButton = document.querySelector(".close");
    closeButton.onclick = function() {
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    // Cerrar el modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        let modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});