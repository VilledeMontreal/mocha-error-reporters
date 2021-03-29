'use strict';
const mocha = require('mocha');
const { inherits } = require('util');
const addFullErrorIfMeaningful = require('./addFullErrorIfMeaningful');

mocha.reporters.specWithFullErrors = extendReporterWithFullErrors(mocha.reporters.Spec);
mocha.reporters.minWithFullErrors = extendReporterWithFullErrors(mocha.reporters.Min);
mocha.reporters.dotWithFullErrors = extendReporterWithFullErrors(mocha.reporters.Dot);
mocha.reporters.listWithFullErrors = extendReporterWithFullErrors(mocha.reporters.List);
mocha.reporters.nyanWithFullErrors = extendReporterWithFullErrors(mocha.reporters.Nyan);
mocha.reporters.xUnitWithFullErrors = extendReporterWithFullErrors(mocha.reporters.XUnit);
mocha.reporters.progressWithFullErrors = extendReporterWithFullErrors(mocha.reporters.Progress);
mocha.reporters.landingWithFullErrors = extendReporterWithFullErrors(mocha.reporters.Landing);

module.exports.extendReporterWithFullErrors = extendReporterWithFullErrors;

function extendReporterWithFullErrors(superReporter){
  const Reporter = extendReporter(superReporter, withFullErrors);
  Reporter.description += '(With full errors)'
  return Reporter;
}

function extendReporter(superReporter, extendedBehaviour) {
  const Reporter = function(runner, options) {
    superReporter.call(this, runner, options);

    extendedBehaviour(runner);
  }

  inherits(Reporter, superReporter)

  return Reporter;
}

function withFullErrors(runner){
  runner.on('fail', (test, error) => addFullErrorIfMeaningful(error));
}