
'use strict';

var _ = require('lodash'),
	url = require('url'),
	querystring = require('querystring');

function optionsToUrl(options) {
	if (!_.isObject(options)) {
		throw new TypeError();
	}

	var parts = {
		protocol: 's3:',
		hostname: options.Bucket,
		pathname: options.Key,
		slashes: true,
		query: _.omit(options, ['Bucket', 'Key'])
	};

	return url.format(parts);
}

function urlToOptions(parts) {

	if (_.isString(parts)) {

		// Someone just passed some arbitrary string that isn't an s3 URL, so
		// assume they want that to be their key. This is kind of lenient but
		// handy. Consider enforcing a strict mode in the future that does not
		// support this.
		if (!/^s3:/.exec(parts)) {
			return {
				Key: parts
			};
		}

		parts = url.parse(parts, true);
	}

	if (!_.isObject(parts)) {
		throw new TypeError();
	}

	if (_.isString(parts.query)) {
		parts.query = querystring.parse(parts.query);
	}

	var options = {

	};

	options.Bucket = parts.hostname;

	if (parts.path) {
		// Strip the leading "/"
		options.Key = parts.pathname.substring(1);
	}

	_.assign(options, parts.query);

	return options;
}

module.exports = {
	optionsToUrl: optionsToUrl,
	urlToOptions: urlToOptions
};
