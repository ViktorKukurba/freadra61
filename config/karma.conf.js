module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      {pattern: 'app/js/*.js', included: false},
      {pattern: 'app/js/**/*.js', included: false},
//      {pattern: 'test/unit.js', included: false},
      {pattern: 'test/spec/unit/*.js', included: false},
      {pattern: 'test/spec/unit/**/*.js', included: false},
      {pattern: 'app/bower_components/**/*.js', included: false},
      // needs to be last http://karma-runner.github.io/0.10/plus/requirejs.html
      'test/spec/main.js'
    ],

    exclude: ['app/bower_components/angular-scenario/angular-scenario.js'],

    autoWatch: true,

    LogLevel: config.LOG_DEBUG,

    browsers: ['Chrome'],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
