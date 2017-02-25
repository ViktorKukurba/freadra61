var allTestFiles = [];
var TEST_REGEXP = /(Spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

console.log('length', allTestFiles.length);

require.config({
  // Karma serves files under /base, which is the basePath from your config file
//  baseUrl: '',
  baseUrl: '/base/app/js',

  paths: {
    angular: '/base/app/bower_components/angular/angular',
    angularRoute: '/base/app/bower_components/angular-route/angular-route',
    angularMocks: '/base/app/bower_components/angular-mocks/angular-mocks'
//        text: '/base/app/bower_components/requirejs-text/text',
//        fixtures: '/base/test/unit/fixtures'
  },
//  baseUrl: '',
  shim: {
    'angular' : {'exports' : 'angular'},
    'angularRoute': ['angular'],
    'angularMocks': {
      deps:['angular'],
      'exports':'angular.mock'
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
