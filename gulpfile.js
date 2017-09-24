var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
//var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlReaplce = require('gulp-html-replace');
var del = require('del');
var sequence = require('run-sequence');

var config = {
    dist: 'dist/',
    src: 'src/',
    cssin: 'src/css/**/style.css', //
    //imgin imgout imgout
    jsin: 'src/js/**/*.js',
    fontin: 'src/font/**/*.{eot,svg,ttf,woff,woff2}',
    imgin: 'src/img/**/*.{jpg,jpeg,png,gif,svg}',
    htmlin: 'src/*.html',
    scssin: 'src/scss/style.scss',
    scssinrefresch: 'src/scss/**/*.scss',
    cssout: 'dist/css/',
    jsout: 'dist/js/',
    imgout: 'dist/img/',
    fontout: 'dist/font/',
    htmlout: 'dist/',
    scssout: 'src/css/',
    cssoutname: 'style.css', // And add all files css width .css
    jsoutname: 'script.js',
    cssreplaceout: 'css/style.css',
    jsreplaceout: 'js/script.js'
};

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
    browserSync({
        server: config.src
    });

    gulp.watch([config.htmlin, config.jsin], ['reload']);
    gulp.watch(config.scssinrefresch, ['sass']);
});


gulp.task('sass', function() {
    return gulp.src(config.scssin)
        // .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scssout))
        .pipe(browserSync.stream());
});


gulp.task('css', function() {
    return gulp.src(config.cssin)
        .pipe(concat(config.cssoutname))
        //.pipe(cleanCSS()) Create style.min.css
        .pipe(gulp.dest(config.cssout));
});
//css in cssoutname cssout
gulp.task('js', function() {
    return gulp.src(config.jsin)
        .pipe(concat(config.jsoutname))
        //.pipe(uglify()) Create script.min.js
        .pipe(gulp.dest(config.jsout));
});

gulp.task('img', function() {
    return gulp.src(config.imgin)
        .pipe(changed(config.imgout))
        .pipe(imagemin())
        .pipe(gulp.dest(config.imgout));
});

gulp.task('font', function() {
    return gulp.src(config.fontin)
        .pipe(changed(config.fontout))
        .pipe(gulp.dest(config.fontout));
});

gulp.task('html', function() {
    return gulp.src(config.htmlin)
        .pipe(htmlReaplce({
            'css': config.cssreplaceout,
            'js': config.jsreplaceout
        }))
        .pipe(gulp.dest(config.dist))
});

gulp.task('clean', function() {
    return del([config.dist]);
});

gulp.task('build', function() {
    sequence('clean', ['html', 'js', 'css', 'img', 'font']);
});

gulp.task('default', ['serve']);