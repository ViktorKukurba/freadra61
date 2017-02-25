module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: [
        'Gruntfile.js',
        'js/**/*.js',
        '!js/angular-facebook.js'
      ],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
//    watch: {
//      files: ['<%= jshint.files %>'],
//      tasks: ['jshint']
//    },
    requirejs: {
      js: {
        options: {
          uglify2: {
            mangle: false
          },
          baseUrl: 'js',
          mainConfigFile: 'js/main.js',
          name: 'main',
          out: 'build/main.js',
          optimize: 'uglify2'
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
//          yuicompress: true,
          optimization: 2
        },
        files: {
          "build/fredra.css": "css/fredra.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['**/*.less', '**/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      js: {
        files: ['**/*.js', '**/**/*.js'], // which files to watch
        tasks: ['requirejs'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['jshint', 'less', 'requirejs', 'watch']);

};
