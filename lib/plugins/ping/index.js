const handlers = require('./handlers');

exports.register = function (server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/ping',
      config: handlers.ping
    },
  ]);

  next();
};

exports.register.attributes = {
  name: 'ping'
};