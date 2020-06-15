import { networkInterfaces } from 'os';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import path from 'path';
import yaml from 'yamljs';
import * as apis from './apis';
import { authAccessToken } from './security';

const app = express();
const port = 9091;
const { connector, summarise } = require('swagger-routes-express');
const ip = ((): string => {
  const network = networkInterfaces();
  let ip = '';
  Object.keys(network).forEach((devName) => {
    const ifc = network[devName] || [];
    for (let i = 0; i < ifc.length; i++) {
      const alias = ifc[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        ip = alias.address;
        break;
      }
    }
  });
  return ip;
})();

// Compression
app.use(compression());
// Logger
app.use(morgan('dev'));
// Enable CORS
app.use(cors());
// POST, PUT, DELETE body parser
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
// app.use(express.static(SwaggerUi));
// No cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '-1');
  next();
});

// Read and swagger config file
const apiDefinition = yaml.load(path.resolve(__dirname, 'swagger.yml'));
// Create mock functions based on swaggerConfig
const options = {
  security: {
    AuthAccessToken: authAccessToken,
  },
};

const connectSwagger = connector(apis, apiDefinition, options);
connectSwagger(app);

// Print swagger router api summary
const apiSummary = summarise(apiDefinition);
console.log(apiSummary);

// Catch 404 error
app.use((req, res) => {
  const error = new Error('Not Found');
  res.status(404).json({ message: error.message, error });
});

// Create HTTP server.
const server = http.createServer(app);
// Event listener for HTTP server "error" event.
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Express ERROR (app) : %s requires elevated privileges', bind);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Express ERROR (app) : %s is already in use', bind);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
console.log('  Mock server running at:');
console.log(`  - Local:   http://localhost:${port}`);
console.log(`  - Network: http://${ip}:${port}`);
