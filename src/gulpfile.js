/// <binding Clean='clean' />
'use strict';

/* REQUIRE */

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    project = require("./project.json");

/* PATH */

var paths = {
    webroot: "./" + project.webroot + "/",
    bower: './bower_components',
    lib: './wwwroot/lib'
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

/* CLEAN TASKS */

gulp.task("clean:js", function(cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function(cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task('assets:clean', function(cb){
	rimraf(paths.lib + '/**/*', cb);
});

/* MIN TASKS */

gulp.task("min:js", function() {
  gulp.src([paths.js, "!" + paths.minJs], {
      base: "."
    })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function() {
  gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

/* COPY BOWER ASSETS TASKS */

gulp.task('jquery', function(){
	return gulp.src(paths.bower + '/jquery/dist/*.min.js')
		.pipe(gulp.dest(paths.lib + '/jquery'));
})

gulp.task('bootstrap', function(){
	return gulp.src([
			paths.bower + '/bootstrap/dist/**/*.min.*',
			paths.bower + '/bootstrap/dist/**/glyphicons*'
		])
		.pipe(gulp.dest(paths.lib + '/bootstrap'));
});

gulp.task('assets:copy', ['assets:clean', 'jquery', 'bootstrap']);