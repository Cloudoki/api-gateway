const Request = require('request');
const joi = require('joi');
const boom = require('boom');
const log = require('lib/helpers/log');

exports = module.exports = {};

exports.ping = {
  auth: false,
  validate: {},
  handler: (request, reply) => {
    log.debug('Requesting ping...');
    Request('http://hyper-test-api.cloudoki.com/0/ping', (err, response, body) => {
      log.debug('Requested ping!');
      return reply(err, response);
    })
  },
  id: 'ping'
};
