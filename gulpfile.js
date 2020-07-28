const gulp = require('gulp');
const babel = require('gulp-babel');

const distPath = 'dist/';
const srcPath = 'src/';

//     concat = require('gulp-concat'),
//     rename = require('gulp-rename'),
//     cleanCSS = require('gulp-clean-css'),
//     htmlmin = require('gulp-htmlmin'),
//     replace = require('gulp-replace'),
//     insert = require('gulp-insert'),
//     minify = require('gulp-babel-minify'),
//     clean = require('gulp-clean'),
//     merge = require('merge2');
const minify = require('gulp-minify');
const connect = require('gulp-connect');
const watch = require('gulp-watch');

gulp.task('watch', async function() {
    gulp.src(srcPath + '*.js')
        .pipe(gulp.watch(srcPath + '*.js', ['minifyJs']));
})

gulp.task('webserver', async function() {
    connect.server({
      livereload: true,
      root: ['.', 'dist']
    });
});

gulp.task('livereload', async function() {
    gulp.src(['dist/scripts/*.js'])
      .pipe(watch())
      .pipe(connect.reload());
});

gulp.task('minifyJs', async function () {
    gulp.src([srcPath + '/*.js'])
        .pipe(
          babel({
            presets: ['@babel/preset-env']
          })
        )
        .pipe(minify())
        .pipe(gulp.dest('dist'))
});

// transform-object-rest-spread

// gulp.task('default', gulp.parallel(['minifyJs', 'livereload', 'watch']));
gulp.task('default', gulp.parallel(['minifyJs']));
