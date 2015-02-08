
'use strict';

var s3Url = require('s3-url'),
	url = require('url');

describe('optionsToURL', function() {
	it('should fail on non-objects', function() {
		expect(s3Url.optionsToUrl).to.throw(TypeError);
	});

	it('should work', function() {
		var result = s3Url.optionsToUrl({
			Bucket: 'bucket',
			Key: 'key'
		});
		expect(result).to.equal('s3://bucket/key');
	});

	it('should work with just a bucket', function() {
		var result = s3Url.optionsToUrl({
			Bucket: 'bucket'
		});
		expect(result).to.equal('s3://bucket');
	});

	it('should produce extended parameters', function() {
		var result = s3Url.optionsToUrl({
			Bucket: 'bucket',
			Key: 'key',
			ContentType: 'foo/bar'
		});
		expect(result).to.equal('s3://bucket/key?ContentType=foo%2Fbar');
	});
});

describe('urlToOptions', function() {

	it('should work with something from url.parse', function() {
		expect(s3Url.urlToOptions(url.parse('s3://bucket/key')))
			.to.deep.equal({
				Bucket: 'bucket',
				Key: 'key'
			});
	});

	it('should work with strings', function() {
		expect(s3Url.urlToOptions('s3://bucket/key'))
			.to.deep.equal({
				Bucket: 'bucket',
				Key: 'key'
			});
	});

	it('should work with just a bucket', function() {
		expect(s3Url.urlToOptions('s3://bucket'))
			.to.deep.equal({
				Bucket: 'bucket'
			});
	});

	it('should fail with nothing', function() {
		expect(s3Url.urlToOptions).to.throw(TypeError);
	});

	it('should parse the query parameters', function() {
		expect(s3Url.urlToOptions(url.parse('s3://bucket/key?ContentType=l')))
			.to.deep.equal({
				Bucket: 'bucket',
				Key: 'key',
				ContentType: 'l'
			});
	});

	it('should parse the query parameters', function() {
		expect(s3Url.urlToOptions('s3://bucket/key?ContentType=l'))
			.to.deep.equal({
				Bucket: 'bucket',
				Key: 'key',
				ContentType: 'l'
			});
	});

	it('should accept paths instead of URLs', function() {
		expect(s3Url.urlToOptions('some/key'))
			.to.deep.equal({
				Key: 'some/key'
			});
	});
});
