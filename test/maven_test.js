'use strict';

var grunt = require('grunt');
var _ = require('lodash');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.maven = {
    should_copy_all_using_properties_as_reference: function(test) {
        var expectedFiles = [
            'target-grunt/code.js',
            'target-grunt/css/style.css',
            'target-grunt/dist/code.js',
            'target-grunt/dist/css/style.css',
            'target/war/static/code.js',
            'target/war/static/css/style.css',
        ];

        test.expect(expectedFiles.length);

        _.forEach(expectedFiles, function(file) {
            test.ok(grunt.file.exists('tmp/vanilla/' + file), 'Expected to see ' + file + ' in tmp/vanilla/, but none found.');
        });

        test.done();
    }
};
