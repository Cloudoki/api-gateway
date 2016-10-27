const Request = require('request');
const joi = require('joi');
const boom = require('boom');
const log = require('lib/helpers/log');
const profiler = require('lib/helpers/profiler');

const services = require('lib/services');
const cache = require('lib/cache');

exports = module.exports = {};

exports.proxy = {
  auth: false,
  validate: {},
  handler: (request, reply) => {

    log.debug(request.path, "Find a suitable service");
    profiler.start("proxy");
    services.get(request, function(err, service){
      profiler.step("proxy");
      if( err )
        return reply(err);

      if( service == null )
        return reply("Not found").code(404);

      let method = request.method,
          uri = service.proto + "://" + service.host + service.path;

      cache.getOrSave(request.path, function(next){

        return Request({ method, uri }, next);

      }, function(err, res){

        profiler.step("proxy");
        if( err )
          log.error(err);

        log.debug(res.status, "Response");
        return reply(err, res);

      });

      // return Request({
      //   method,
      //   uri
      // }, function(err, res){
      //   profiler.step("proxy");
      //   if( err )
      //     log.error(err);
      //   log.debug(res.status, "Response");
      //   return reply(err, res);
      // });
    });
  },
  id: 'proxy'
};
