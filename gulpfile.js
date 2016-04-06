/*
 |--------------------------------------------------------------------------|
 | Initializing gulpfile                                                    |
 |--------------------------------------------------------------------------|
 */

// Loading gulp modules

var gulp = require('gulp');
var path = require ('path');
var eslint = require ('gulp-eslint');
var gulpsync = require ('gulp-sync')(gulp);
var jade = require ('gulp-jade');
var sass = require ('gulp-sass');
var uglify = require ('gulp-uglify');
var minifyCss = require ('gulp-minify-css');
var concat = require ('gulp-concat');
var rename = require ('gulp-rename');
var compass = require ('gulp-compass');
var util = require ('gulp-util');
var sourcemaps = require ('gulp-sourcemaps');
var ngAnnotate = require ('gulp-ng-annotate');
var ignore = require ('gulp-ignore');
var gif = require ('gulp-if');
var filter = require ('gulp-filter');
var expectFile = require ('gulp-expect-file');
var changed = require ('gulp-changed');
var fs = require ('fs');
var replace = require('gulp-replace-task');


// Setting configuration variables

var isDevelopment = false;
var isProduction = false;
var useSourceMaps = false;
var environmentSettings = './config.json';


// Setting main paths

var paths = {
    public: 'public/app/',
    code: 'resources/app/',
};


// Setting source paths
// paths.code + '**/*.js'
var source = {
    scripts: [
        paths.code + 'app.init.js',
        paths.code + 'components/**/*.js',
        paths.code + 'config/**/*.js',
        paths.code + 'directives/**/*.js',
        paths.code + 'filters/**/*.js',
        paths.code + 'services/**/*.js'
    ],
    templates: {
        index: [
            paths.code + 'index.jade'
        ],
        views: [
            paths.code + '**/*.jade',
            '!' + paths.code + 'index.jade'
        ]
    },
    styles: {
        app: [
            paths.code + 'main.scss'
        ],
        watch: [
            paths.code + '**/*.sass',
            paths.code + '**/*.scss'
        ]
    }
};


// Setting build paths

var build = {
    scripts: paths.public + 'js',
    styles: paths.public + 'css',
    templates: {
        index: 'public',
        views: paths.public + 'views'
    }
};


// Setting vendor config. We will need to modifiy it in order to automatize bootstrap initialization

var vendor = {
    base: {
        source: require('./vendor.base.json'),
        dest: 'public/app/js',
        name: 'base.js'
    }
};

// Setting plugins options

var vendorUglifyOpts = {
    mangle: {
        except: ['$super']
    }
};

var compassOpts = {
    project: path.join(__dirname, '/'),
    css: paths.public + 'css',
    sass: paths.code,
    image: 'public/app/img'
};


/*
 |--------------------------------------------------------------------------|
 | GULP TASKS                                                               |
 |--------------------------------------------------------------------------|
 */

 // Building vendor javascript files

gulp.task('vendor:base', function () {
    util.log('Copying base vendor assets...');
    return gulp.src(vendor.base.source)
        .pipe(expectFile(vendor.base.source))
        .pipe(gif(isProduction, uglify(vendorUglifyOpts)))
        .pipe(concat(vendor.base.name))
        .pipe(gulp.dest(vendor.base.dest));
});


// Building public Javascript structure

gulp.task('scripts:app', function () {
    util.log('Building scripts..');
    return gulp.src(source.scripts)
        .pipe(gif(useSourceMaps, sourcemaps.init()))
        .pipe(replaceEnvironmentVars())
        .pipe(eslint({
            config: '.eslintrc'
        }))
        .on('error', handleError)
        .pipe(gif(isDevelopment, eslint.format('stylish')))
        .on('error', handleError)
        .pipe(eslint.results(function (results) {
            util.log(util.colors.magenta('Total Files with errors: ' + results.errorCount));
            util.log(util.colors.yellow('Total Warnings: ' + results.warningCount));
            util.log(util.colors.red('Total Errors: ' + results.errorCount));
        }))
        .on('error', handleError)
        .pipe(gif(isDevelopment, eslint.failAfterError()))
        .on('error', handleError)
        .pipe(concat('app.js'))
        .on('error', handleError)
        .pipe(ngAnnotate())
        .on('error', handleError)
        .pipe(gif(isProduction, uglify({preserveComments: 'some'})))
        .on('error', handleError)
        .pipe(gif(useSourceMaps, sourcemaps.write()))
        .pipe(gulp.dest(build.scripts));
});


// Compiling sass files to css

gulp.task('styles:app', function () {
    util.log('Building application styles...');
    return gulp.src(source.styles.app)
        .pipe(gif(useSourceMaps, sourcemaps.init()))
        .pipe(compass(compassOpts))
        .on('error', handleError)
        .pipe(gif(isProduction, minifyCss()))
        .pipe(gif(useSourceMaps, sourcemaps.write()))
        .pipe(gulp.dest(build.styles));
});


// Compiling index.jade to index.html

gulp.task('templates:index', function () {
    util.log('Building index...');
    return gulp.src(source.templates.index)
        .pipe(changed(build.templates.index, {extension: '.html'}))
        .pipe(jade())
        .on('error', handleError)
        .pipe(gulp.dest(build.templates.index));
});


// Compiling jade templates to html

gulp.task('templates:views', function () {
    util.log('Building views...');
    return gulp.src(source.templates.views)
        .pipe(changed(build.templates.views, {extension: '.html'}))
        .pipe(jade())
        .on('error', handleError)
        .pipe(gulp.dest(build.templates.views));
});


// Building public JS, HTML and CSS files.

gulp.task('assets', [
    'scripts:app',
    'styles:app',
    'templates:index',
    'templates:views'
]);


//Enabling production build

gulp.task('prod', function () {
    util.log('Starting production build...');
    isProduction = true;
});


//Enabling development build

gulp.task('dev', function () {
    util.log('Starting development build...');
    isDevelopment = true;
});


//Enabling sourcemaps

gulp.task('usesources', function () {
    useSourceMaps = true;
});


/*
 |--------------------------------------------------------------------------|
 | GULP WATCH                                                               |
 |--------------------------------------------------------------------------|
 */

//Watching files to change

gulp.task('watch', function () {
    util.log('Starting watch...');
    gulp.watch(source.scripts, ['scripts:app']);
    gulp.watch(source.styles.watch, ['styles:app']);
    gulp.watch(source.templates.views, ['templates:views']);
    gulp.watch(source.templates.index, ['templates:index']);
});


/*
 |--------------------------------------------------------------------------|
 | HELPER FUNCTIONS                                                         |
 |--------------------------------------------------------------------------|
 */

// Capturing and showing error messages

function handleError(err) {
    util.log(err.toString());
    util.beep();
    this.emit('end');
}

// Replacing variables (@@example) with environment variables

function replaceEnvironmentVars() {
    var jsonEnvSettings = JSON.parse(fs.readFileSync(path.join(__dirname, environmentSettings), 'utf8'));

    util.log('Set environment variables...');
    // Replace the placeholder @@dbConnection with the dbConnection from the json file.
    return replace({
        patterns: [
            {
                json: jsonEnvSettings
            }
        ]
    });
}



/*
 |--------------------------------------------------------------------------|
 | DEVELOPMENT TASKS                                                          |
 |--------------------------------------------------------------------------|
 */

 // Build for development

gulp.task('default', gulpsync.sync([
    'vendor:base',
    'assets',
    'watch',
]), function () {
    util.log('************');
    util.log('* All Done * You can start editing your code');
    util.log('************');
});


// Build for production

gulp.task('build', gulpsync.sync([
    'prod',
    'usesources',
    'vendor:base',
    'assets'
]), function () {
    util.log('************');
    util.log('* All Done * Public folder is on the table');
    util.log('************');
});
