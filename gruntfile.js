/*
 * ===========================================================================
 * File: gruntfile.js
 * Author: Konogan
 * Desc: TODO
 * ===========================================================================
 */
/**
 * [exports description]
 * @param  {[type]} grunt [description]
 */
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist/**']
    },

    copy: {
      main: {
        files: [{
          expand: true,
          src: ['index.html'],
          dest: 'dist/'
        }, {
          expand: true,
          src: ['res/**'],
          dest: 'dist/'
        }, {
          expand: true,
          flatten: true,
          src: [
            './node_modules/pixi.js/bin/pixi.min.js',
            './node_modules/pixi.js/bin/pixi.min.js.map'
          ],
          dest: 'dist/js/vendor/'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: true,
        force: true
      },
      files: ['src/**/*.js']
    },

    browserify: {
      options: {
        browserifyOptions: {
          debug: true,
          paths: ['./src']
        },
        transform: ['babelify'] //'uglifyify']
      },
      dist: {
        files: {
          'dist/js/bundle.js': ['src/main.js']
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'browserify:dist']
      },
      assets: {
        files: ['res/**/*.*'],
        tasks: ['clean', 'copy']
      }
    }
  });

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('build', ['clean', 'copy', 'browserify:dist']);
  grunt.registerTask('default', ['build', 'watch']);
};
