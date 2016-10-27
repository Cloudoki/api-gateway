"use strict";

// global memory cache of 30 seconds
const globalEpire = 5 * 1000;

const cache = {};

const set = function(key, value){

  var date = new Date();

  cache[key] = {
    date: new Date(date.getTime() + globalEpire),
    data: value
  };
};

const get = function(key){

  return cache[key] && cache[key].data;
};

const getOrSave = function(key, getHandler, callback){

  if( cache[key] && cache[key].date > new Date )
    return callback(null, this.get(key));

  return getHandler(function(err, res){
    if( err ) return callback(err);
    set(key, res);
    return callback(err, res);
  });
};

module.exports = {
  set,
  get,
  getOrSave
}
