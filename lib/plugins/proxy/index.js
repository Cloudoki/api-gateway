"use strict";

const handlers = require('./handlers');

exports.register = function (server, options, next) {

  server.route([
    {
      method: "*",
      path: "/{p*}",
      config: handlers.proxy
    },
  ]);

  next();
};

exports.register.attributes = {
  name: 'proxy'
};
