const timeElapsed = {};
const steps = {};

exports.start =  function(ref){

  timeElapsed[ref] = new Date();
  steps[ref] = 0;

  return 1;
}

exports.step = function(ref, stop){

  if( ref == null || timeElapsed[ref] == null )
    return -1;

  console.log(`#${++steps[ref]}`,ref, new Date - timeElapsed[ref]);

  if( stop )
    delete timeElapsed[ref]
}
