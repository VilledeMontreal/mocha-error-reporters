'use strict';
const {execFile} = require('child_process');
const {assert} = require('chai');
const path = require('path');
const os = require('os');

const internalMochaPath = getMochaPath();
const testExamplePath = path.join('test', 'testData', 'testExample.js');
const mochaErrorReportersPath = path.join('lib','mochaErrorReporters.js');

const reporters = [
	"specWithFullErrors",
	"minWithFullErrors",
	"dotWithFullErrors",
	"listWithFullErrors",
	"nyanWithFullErrors",
	"xUnitWithFullErrors",
	"progressWithFullErrors",
	"landingWithFullErrors" 
]

reporters.forEach(reporter => 
	{
		describe(`Integration tests: ${reporter}`,  () =>{
			let reporterStdout, reporterStderr;
		
			before( done=> {
				execFile(internalMochaPath, [testExamplePath, '--require', mochaErrorReportersPath,'--reporter', reporter], (error, stdout, stderr) => {
					reporterStdout = stdout;
					reporterStderr = stderr;
					done();
				});
			});
		
			it('should log full error', () => {
				assert.include(reporterStdout,"Full Error");
				assert.include(reporterStdout,"The key to understand this bug.");
				assert.isEmpty(reporterStderr);
			});
		});
	}
	
);

function getMochaPath() {
	if (os.platform() === 'win32') {
		return path.resolve('node_modules', '.bin', 'mocha.cmd');
	} else {
		return path.resolve('node_modules', '.bin', 'mocha');
	}
}
