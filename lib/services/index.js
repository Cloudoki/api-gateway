"use strict";

const services = [
  [/\/v1\/ping\/*/, {
      methods: ["GET", "HEAD"],
      proto: "http",
      host: "hyper-test-api.cloudoki.com",
      path: "/0/ping"
    }
  ]
];

// send me the router string and I return you the service translation object
const get = function(request, callback){

  let route = request.path,
      method = new RegExp(request.method, "i");

  for (var i = 0; i < services.length; i++) {

    if( typeof(services[i][0]) === "string" && services[i][0] === route && services[i][1].methods.find(function(v){ return v.match(method); }).length > 0 )
      return callback(null, services[i][1]);

    if( typeof(services[i][0]) === "object" && route.match(services[i][0]) && services[i][1].methods.find(function(v){ return v.match(method); }).length > 0 )
      return callback(null, services[i][1]);

    return callback(new Error("Not found"));
  }
};

// implment the service discovery by the swagger documentation
const discovery = function(host, callback){

  return callback();
};


module.exports = {
  get,
  discovery
}
