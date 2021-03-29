'use strict';
const assert = require('assert');

describe('Test Example', () => {
	it('Test pass', () => {
		assert.strictEqual(1, 1);
	});
	it('Test with error', () => {
		const error = new Error('Pow!');
		error.additionnalAttribute = "The key to understand this bug." 
		throw error;
	});
});