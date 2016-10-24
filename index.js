'use strict';

const Hapi = require('hapi');
const path = require('path');

const config = require('config');

// Create the Hapi Server
const server = new Hapi.Server();

server.connection({ port: config.port });

server.register([
  // Register the user handling plugin
  {
    register: require('./lib/plugins/ping/index.js'),
    routes: { prefix: '/v1' }
  },
], () => {

  // Actually start the server (start listening for incoming requests)
  server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
});
