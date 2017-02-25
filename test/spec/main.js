// we get all the test files automatically

console.log('test/main');
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/i.test(file)) {
            tests.push(file);
        }
    }
}

console.log('tests-0', window.__karma__.files);
console.log('tests-1', tests.length);

require.config({
    paths: {
        angular: '/base/app/bower_components/angular/angular',
        angularRoute: '/base/app/bower_components/angular-route/angular-route',
        angularMocks: '/base/app/bower_components/angular-mocks/angular-mocks'
//        text: '/base/app/bower_components/requirejs-text/text',
//        fixtures: '/base/test/unit/fixtures'
    },
    baseUrl: '',
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        }
    },
    deps: tests,
    callback: window.__karma__.start
});