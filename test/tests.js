const expect = require('expect');
const hbc = require('../index.js');
const fs = require('fs');
const testFile = 'test/public/js/templates.js';

describe('handlebars-compiler', function() {
	
	var compiler = hbc.setup('test/templates', 'html', testFile);
	it('should be an object.', function () {
		expect(hbc).toBeAn('object');
	});
	it('should return an object with a run() function.', function () {
		expect(compiler.run).toBeAn('function');
	});
	it('should return an object with a watch() function.', function () {
		expect(compiler.watch).toBeAn('function');
	});
	it('should create the templates.js file when run() is called', function (done) {
		// save the current time for comparison
		var currentTime = new Date().getTime();

		compiler.run(function(){
			var modifiedTime = fs.statSync(testFile).mtime.getTime();
			expect(modifiedTime).toBeMoreThan(currentTime);
			done();
		});
	});
	it('should run the watch function when template file are modified', function (done) {
		var extraTemplteFile = 'test/templates/testExtraTemplate.html';
		var currentTime = new Date().getTime();
		var modifiedTime;
		compiler.watch(function(){
			modifiedTime = fs.statSync(testFile).mtime.getTime();
			fs.unlinkSync(extraTemplteFile);
			expect(modifiedTime).toBeMoreThan(currentTime);
			done();
		});

		// Wait a bit before executing the append
		setTimeout(function() {
			fs.appendFileSync(extraTemplteFile, 'some text');
		});
	});
});
