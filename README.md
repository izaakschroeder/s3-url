# s3-url

Go between URLs and AWS options for S3.

![build status](http://img.shields.io/travis/izaakschroeder/s3-url.svg?style=flat)
![coverage](http://img.shields.io/coveralls/izaakschroeder/s3-url.svg?style=flat)
![license](http://img.shields.io/npm/l/s3-url.svg?style=flat)
![version](http://img.shields.io/npm/v/s3-url.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/s3-url.svg?style=flat)

![dependencies](https://img.shields.io/david/izaakschroeder/s3-url.svg?style=flat)
![dev-dependencies](https://img.shields.io/david/dev/izaakschroeder/s3-url.svg?style=flat)
![peer-dependencies](https://img.shields.io/david/peer/izaakschroeder/s3-url.svg?style=flat)

Sometimes you just need to convert an `s3://bucket/key` to something you can feed into AWS. This library has you covered.

```javascript
var s3Url = require('s3-url');
s3Url.optionsToURL({ Bucket: 'bucket', Key: 'key' });
```

```javascript
var s3Url = require('s3-url');
s3Url.urlToOptions('s3://bucket/key');
```
