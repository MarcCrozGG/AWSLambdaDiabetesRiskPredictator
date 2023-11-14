const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const app = express();

// Habilitar CORS para aceptar solicitudes de tu dominio de Amplify
app.use(cors());

// Analizar solicitudes JSON
app.use(express.json());

// Configura AWS con tus credenciales (esto podría ser necesario solo si se ejecuta localmente)
AWS.config.update({ region: 'REGION' }); // reemplaza 'REGION' con tu región de AWS

// Crea una instancia del cliente de Lambda
const lambda = new AWS.Lambda();

app.post('/submit', (req, res) => {
    const data = req.body;

    // Configura los parámetros para invocar la función Lambda
    const lambdaParams = {
        FunctionName: 'NombreDeTuFuncionLambda', // reemplaza con el nombre real de tu función Lambda
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(data),
    };

    // Invoca la función Lambda
    lambda.invoke(lambdaParams, (err, lambdaResult) => {
        if (err) {
            console.error('Error al invocar Lambda', err);
            return res.status(500).send('Error del servidor');
        }
        // Envía la respuesta de la función Lambda al cliente
        res.json(JSON.parse(lambdaResult.Payload));
    });
});

module.exports = app;
