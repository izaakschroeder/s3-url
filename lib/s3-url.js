
'use strict';

var _ = require('lodash'),
	url = require('url');

function optionsToUrl(options) {
	if (!_.isObject(options)) {
		throw new TypeError();
	}

	var parts = {
		protocol: 's3:',
		hostname: options.Bucket,
		pathname: options.Key,
		slashes: true
	};

	return url.format(parts);
}

function urlToOptions(parts) {

	if (_.isString(parts)) {
		parts = url.parse(parts);
	}

	if (!_.isObject(parts)) {
		throw new TypeError();
	}

	var options = {

	};

	options.Bucket = parts.hostname;

	if (parts.path) {
		options.Key = parts.path;
	}

	return options;
}

module.exports = {
	optionsToUrl: optionsToUrl,
	urlToOptions: urlToOptions
};
