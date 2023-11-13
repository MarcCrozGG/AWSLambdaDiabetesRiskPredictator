const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app'); // Importa tu aplicación Express
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
