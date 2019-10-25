// Include gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var paths = {
    src: 'app',
    srcSCSS: 'app/public/scss/',
    srcJS: 'app/public/js/',

    tmp: 'app',
    tmpCSS: 'app/public/css/',
    tmpJS: 'app/public/js/',
};


gulp.task('sass', function() {
    return gulp.src(paths.srcSCSS + 'site.scss').pipe(sass()).pipe(cleanCSS()).pipe(gulp.dest(paths.tmpCSS));
});

gulp.task('scripts', function() {
    return gulp.src(paths.srcJS + '*.js').pipe(uglify()).pipe(gulp.dest(paths.tmpJS));
});

gulp.task('htmlClean', function () {
    return gulp.src(paths.srcPHP + '*.ejs').pipe(htmlclean()).pipe(gulp.dest(paths.tmpPHP));
});

gulp.task('watch', function() {
    gulp.watch(['./app/public/scss/*.scss', './app/public/scss/pages/*.scss', './app/public/scss/pages/components/*.scss'], gulp.task('sass'));
});