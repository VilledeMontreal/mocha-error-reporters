'use strict';
const {serializeError} = require('serialize-error');

module.exports = addFullErrorIfMeaningful;

function addFullErrorIfMeaningful(error){
  if (errorHasSomeMeaningfulExtraInformation(error)) {
    error.stack += `\n\nFull Error:\n${fullErrorAsString(error)}`;
  }
}

function errorHasSomeMeaningfulExtraInformation(error){
  if(!isErrorObject(error)){
    return false;
  }
  if(isTestAssertion(error)){
    return false;
  }

  return errorHasSomeExtraInformation(error);
}

function isErrorObject(error){
  return error && error.stack;
}

function isTestAssertion(error) {
  return error.hasOwnProperty('actual');
}

function errorHasSomeExtraInformation(error) {
  // The attributes message and stack are hidden; they are not return by Object.keys,
  // if there is something more, Object.keys will return something.
  return Object.keys(error).length > 0;
}

function fullErrorAsString(error){
  const serializedError = serializeError(error);
  return JSON.stringify(serializedError,null, "  ");
}