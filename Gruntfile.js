/*global module*/
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: true
            },
            grunt: ['Gruntfile.js'],
            source: ['src/**/*.js'],
            test: ['test/**/*.js']
        },
        jasmine: {
            options: {
                specs: ['test/**/*Spec.js']
            },
            source: {
                src: ['src/**/*.js']
            },
            build: {
                src: ['dist/**/*.js']
            }
        },
        clean: {
            build: ['dist']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%=pkg.version%> license <%= pkg.license %> <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            'dist/XMLMockReqeust.min.js': ['src/**/*.js']
        },
        watch: {
            options: {
                interrupt: true,
                atBegin: true
            },
            javascript: {
                files: ['src/**/*.js', 'Gruntfile.js', 'package.json'],
                tasks: ['jshint', 'jasmine:source', 'clean', 'uglify', 'jasmine:build']
            },
            readme: {
                files: ['package.json', 'LICENSE'],
                tasks: ['readme']
            },
            test: {
                files: ['test/**/*'],
                tasks: ['jasmine']
            },
            jshint: {
                files: ['.jshintrc'],
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('default', ['jshint', 'jasmine:source', 'clean', 'uglify', 'jasmine:build']);
    grunt.registerTask('readme', function () {
        grunt.file.write('README.md', grunt.template.process('# <%= pkg.name %> v<%= pkg.version %>\n' +
            '_by [<%= pkg.author.name %>](<%= pkg.author.url %>)_\n\n' +
            '<%= pkg.description %>' + '\n' +
            '## License\n' +
            grunt.file.read('LICENSE') + '\n' +
            '\n_This file was generate on <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>_'));
    });
};