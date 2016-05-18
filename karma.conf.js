// Karma configuration
// Generated on Wed May 11 2016 12:37:27 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'public/app/js/base.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-gridster/src/angular-gridster.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'resources/tests/unit/components/**/*.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-translate/angular-translate.js',
        'bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
        'bower_components/angular-ui-router/src/*.js',
        'bower_components/angular-ui-tinymce/src/tinymce.js',
        'bower_components/bootstrap/js/*.js',
        'bower_components/html2canvas/src/*.js',
        'bower_components/html2canvas/src/renderers/*.js',
        'bower_components/javascript-detect-element-resize/detect-element-resize.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/ng-lodash/build/ng-lodash.js',
        'bower_components/ngFileReader/src/ngFileReader.js',
        "bower_components/sweetalert/dist/sweetalert.min.js",
        'bower_components/tinymce/tinymce.js',
        'bower_components/tinymce-dist/tinymce.js',
        'public/app/js/app.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}