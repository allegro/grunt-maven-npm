/*
 * grunt-maven
 * https://github.com/adam/grunt-maven-npm
 *
 * Copyright (c) 2014 Adam Dubiel
 * Licensed under the Apache-2.0 license.
 */

'use strict';

module.exports = function(grunt) {

    var gruntCWD = process.cwd();

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },
        clean: {
            tests: ['tmp'],
        },
        copy: {
            prepareVanilla: {
                expand: true,
                cwd: 'test/fixture/vanilla/',
                src: ['**'],
                dest: 'tmp/vanilla/'
            },
            prepareOverrides: {
                expand: true,
                cwd: 'test/fixture/overrides/',
                src: ['**'],
                dest: 'tmp/overrides/'
            }
        },
        execute: {
            chdirTo: {
                call: function() {
                    process.chdir('tmp/vanilla/target-grunt');
                }
            },
            chdirReset: {
                call: function() {
                    process.chdir(gruntCWD);
                }
            }
        },
        mavenPrepare: {
            should_copy_all_using_properties_as_reference: {
            }
        },
        mavenDist: {
            should_copy_all_using_properties_as_reference: {
                options: {
                    warName: 'war',
                    dist: 'dist'
                }
            }
        },
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-execute');

    grunt.registerTask('test', ['clean', 'copy:prepareVanilla', 'execute:chdirTo', 'mavenPrepare', 'mavenDist', 'execute:chdirReset', 'nodeunit']);

    grunt.registerTask('default', ['jshint', 'test']);

};
