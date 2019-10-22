// // Include gulp
// var gulp = require('gulp');

// // Include Our Plugins
// var sass = require('gulp-sass');

// var htmlclean = require('gulp-htmlclean');

// var cleanCSS = require('gulp-clean-css');

// var watch = require('gulp-watch');


// // CAMINHO DOS ARQUIVOS PARA RODAR O GULP
// var paths = {
//     src: 'app',
//     srcCSS:'app/public/scss/css',
//     srcSCSS: 'app/public/scss',

//     tmp: 'app',
//     tmpCSS: 'app/public/css',
// };


// // Lint Task (parte do codigo onde ele verifica os erros)

// gulp.task('lint', function() {
//     return gulp.src(paths.srcJS + '*.js').pipe(jshint()).pipe(jshint.reporter('default'));
// });


// // Compile Our Sass (desinstalar concat)
// gulp.task('sass', function() {
//     return gulp.src(paths.srcSCSS + 'stylesheet.scss').pipe(sass()).pipe(cleanCSS()).pipe(gulp.dest(paths.srcCSS)).pipe(gulp.dest(paths.tmpCSS));
// });


// //Clean html
// gulp.task('htmlClean', function () {
//     return gulp.src(paths.srcPHP + '*.php').pipe(htmlclean()).pipe(gulp.dest(paths.tmpPHP));

// });


// // Includes PHP
// gulp.task('includes', function(){
//     return gulp.src(paths.srcINC + '*.php').pipe(htmlclean()).pipe(gulp.dest(paths.tmpINC));
// })


// // Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src(paths.srcJS + '*.js').pipe(uglify()).pipe(gulp.dest(paths.tmpJS));
// });

// gulp.task('assets',function(){
//     return gulp.src('./src/assets/*/*').pipe(gulp.dest(paths.tmpASS));
// });

// // Watch Files For Changes
// /*
// A tarefa de relógio é usada para executar tarefas à medida que fazemos alterações nos nossos arquivos.
// À medida que você escreve código e modifica seus arquivos, o método gulp.watch () escutará as mudanças e executará automaticamente nossas tarefas novamente,
// então não devemos voltar a nossa linha de comando continuamente e executar o comando gulp sempre.
// */

// gulp.task('watch', function() {
//     gulp.watch('./src/scss/*.scss', ['sass']);
// });

// // Default Task
// gulp.task('default', ['watch', 'assets']);
const { src, dest, parallel } = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');

function css () {
  return src('app/public/scss/*.scss')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest('app/public/css'))
}

function js() {
  return src('client/javascript/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.default = parallel(css, js);