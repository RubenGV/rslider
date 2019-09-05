var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var output = 'css';

gulp.task('style',[], function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(cleanCSS({format: 'beautify', level: {1: {specialComments: 0}}}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(output))
});
