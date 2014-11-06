'use strict';

var fs = require('fs');
var path = require('path');
var q = require('q');
var mkdirp = require('mkdirp');

function createDir(dir) {
	var deferred = q.defer();
	mkdirp(dir, deferred.makeNodeResolver());
	return deferred.promise;
}

function filenameFromTitle(title) {
	return title.replace(/[^\w_\-]/g, '_').toLowerCase() + '.png';
}

function writeScreenshot(data, filename) {
	var deferred = q.defer();
	fs.writeFile(filename, new Buffer(data, 'base64'), deferred.makeNodeResolver());
	return deferred.promise;
}

function takeScreenshot(title) {
	var basePath = process.env.PROSHOT_DIR || '.';
	var fullName = path.join(basePath, filenameFromTitle(title));
	return browser.takeScreenshot().then(function (png) {
		return createDir(basePath).then(function () {
			return writeScreenshot(png, fullName);
		});
	});
}

function ProshotReporter(runner) {
	runner.on('fail', function(test) {
		return takeScreenshot(test.fullTitle());
	});
}

module.exports = ProshotReporter;
