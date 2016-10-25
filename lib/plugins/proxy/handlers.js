const Request = require('request');
const joi = require('joi');
const boom = require('boom');
const log = require('lib/helpers/log');
const services = require('lib/services');

exports = module.exports = {};

exports.proxy = {
  auth: false,
  validate: {},
  handler: (request, reply) => {

    log.debug(request.path, "Find a suitable service");
    services.get(request, function(err, service){

      if( err )
        return reply(err);

      if( service == null )
        return reply("Not found");

      let method = request.method,
          uri = service.proto + "://" + service.host + service.path;
      log.debug("---")
      return Request({
        method,
        uri
      }, function(err, res){

        if( err )
          log.error(err);
        log.debug(res.status, "Response");
        return reply(err, res);
      });
    });
  },
  id: 'proxy'
};
