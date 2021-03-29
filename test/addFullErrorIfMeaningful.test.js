'use strict';
const addFullErrorIfMeaningful = require('../lib/addFullErrorIfMeaningful');
const {assert} = require('chai');

describe(`addFullErrorIfMeaningful`, () => {
	it(`Should add full error to stack, if full error is meaningful.`, ()=> {
		let error = new Error("Boom!")
		error.inner = new Error("Bang!");
		error.extraInfo = "the key to understand this bug!";

		addFullErrorIfMeaningful(error);

		assert.include(error.stack,"Full Error:");
		assert.include(error.stack,"Boom!");
		assert.include(error.stack,"inner");
		assert.include(error.stack,"Bang!");
		assert.include(error.stack,"extraInfo");
		assert.include(error.stack,"the key to understand this bug!");
	});

	it(`Should not have side effects, if error is not meaningful`, ()=> {
		const error = new Error("error without extra attributes")

		addFullErrorIfMeaningful(error);

		assert.notInclude(error.stack,"Full Error:");
	});

	it(`Should not have side effects on test assertions.`, ()=> {
		let testAssertion;
		try{
			assert.isEmpty(["not empty"]);
		}
		catch(error){
			testAssertion=error;
		}

		addFullErrorIfMeaningful(testAssertion);

		assert.notInclude(testAssertion.stack,"Unexpected")
	});

	describe(`Should not crash if something else is thrown as an Error.`, () => {
		[
			"error as string", 
			"", 
			999, 
			true, 
			['a','r','r','a','y'],
			{ foo: "not a standard error"},
			null, 
			undefined,
		]
		.forEach(error =>
		{
			it(`error "${error}"`, () => {
				addFullErrorIfMeaningful(error);
			});
		});
	});
});
	