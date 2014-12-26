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
    should_prepare_grunt_dist_and_copy_to_maven_dist: function(test) {
        var expectedFiles = [
            'target-grunt/code.js',
            'target-grunt/css/style.css',
            'target-grunt/dist/code.js',
            'target-grunt/dist/css/style.css',
            'target/war/warTarget/code.js',
            'target/war/warTarget/css/style.css',
        ];

        var invalidFiles = [
            'target-grunt/dist/grunt-maven-custom.json',
            'target-grunt/dist/non-deliverable.js',
            'target-grunt/maven-protected.json'
        ];

        test.expect(expectedFiles.length + invalidFiles.length);

        _.forEach(expectedFiles, function(file) {
            test.ok(grunt.file.exists('tmp/vanilla/' + file), 'Expected to see ' + file + ' in tmp/vanilla/, but none found.');
        });

        _.forEach(invalidFiles, function(file) {
            test.ok(!grunt.file.exists('tmp/vanilla/' + file), 'Did not want to see ' + file + ' in tmp/vanilla/, but yet it was found.');
        });

        test.done();
    },
    should_prepare_grunt_dist_and_copy_to_maven_dist_with_overriden_properties: function(test) {
        var expectedFiles = [
            'target-grunt/code.js',
            'target-grunt/css/style.css',
            'target-grunt/dist/code.js',
            'target-grunt/dist/css/style.css',
            'overriden-target/war/static/code.js',
            'overriden-target/war/static/css/style.css',
        ];

        var invalidFiles = [
            'target-grunt/dist/grunt-maven.json',
            'target-grunt/dist/grunt-maven-custom.json'
        ];

        test.expect(expectedFiles.length + invalidFiles.length);

        _.forEach(expectedFiles, function(file) {
            test.ok(grunt.file.exists('tmp/overrides/' + file), 'Expected to see ' + file + ' in tmp/overrides/, but none found.');
        });

        _.forEach(invalidFiles, function(file) {
            test.ok(!grunt.file.exists('tmp/overrides/' + file), 'Did not want to see ' + file + ' in tmp/overrides/, but yet it was found.');
        });

        test.done();
    },
    should_prepare_grunt_dist_and_copy_to_maven_dist_cwd: function(test) {
        var expectedFiles = [
            'target-grunt/code.js',
            'target-grunt/css/style.css',
            'target-grunt/dist/code.js',
            'target-grunt/dist/css/style.css',
            'target/war/warTarget/code.js',
            'target/war/warTarget/css/style.css',
        ];

        var invalidFiles = [
            'target-grunt/dist/grunt-maven-custom.json',
            'target-grunt/dist/non-deliverable.js',
            'target-grunt/maven-protected.json'
        ];

        test.expect(expectedFiles.length + invalidFiles.length);

        _.forEach(expectedFiles, function(file) {
            test.ok(grunt.file.exists('tmp/vanilla/' + file), 'Expected to see ' + file + ' in tmp/vanillaCwd/, but none found.');
        });

        _.forEach(invalidFiles, function(file) {
            test.ok(!grunt.file.exists('tmp/vanilla/' + file), 'Did not want to see ' + file + ' in tmp/vanillaCwd/, but yet it was found.');
        });

        test.done();
    },
};
