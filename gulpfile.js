var gulp          = require('gulp');
var notify        = require('gulp-notify');
var sass          = require('gulp-sass');
var browserify    = require('browserify');
var babelify      = require('babelify');
var es            = require('event-stream');
var source        = require('vinyl-source-stream')

var allSassFiles = [
  "src/background/styles/*.scss",
  "src/iframe/styles/*.scss",
  "src/injector/styles/*.scss"
];

var rootSassFiles = [
  "src/background/styles/background.scss",
  "src/iframe/styles/iframe.scss",
  "src/injector/styles/injector.scss"
]

var allJsFiles = [
  "src/background/js/*.js",
  "src/iframe/js/*.js",
  "src/injector/js/*.js"
]

var rootJsFiles = [
  "src/background/js/background.js",
  "src/iframe/js/iframe.js",
  "src/injector/js/injector.js"
]

var staticFiles = ['./src/static/**/*.*']

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('sass', function () {
  return gulp.src(rootSassFiles)
    .pipe(sass())
    .pipe(gulp.dest('./build/styles/'));
});

gulp.task('staticFiles', function () {
  gulp.src(staticFiles)
    .pipe(gulp.dest('./build/'));
});

gulp.task('browserify', [], function() {
  var tasks = rootJsFiles.map(function (entry) {
    var filename = entry.match(/[^\\/]+$/)[0];

    return browserify({ entries: [entry] })
      .transform(babelify, {presets: ["es2015"]})
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source(filename))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/js/'));
  })

  return es.merge.apply(null, tasks);
});

gulp.task('default', ["sass", "browserify", "staticFiles"], function() {
  gulp.watch([
    allSassFiles,
    allJsFiles,
    staticFiles
  ], [
    "sass",
    "browserify",
    "staticFiles"
  ]);
});
