var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var mocha = require('gulp-mocha');
var webpackConfig = require('./webpack.config.js');

gulp.task('develop', ['clean'], function() {
    var config = Object.assign(webpackConfig, {
        watch: true,
    });
    webpack(config).watch(200, function(err, stat){
        if(!err) {
            console.log('start webpack watching');
        } else {
            console.log(err);
        }
    });
    gulp.start('watch:test');
});

gulp.task('build', ['clean'], function() {
    webpack(webpackConfig, function(err, stat){
        if(!err) {
            console.log('webpack build');
        } else {
            console.log(err);
        }
    });
});

gulp.task('clean', function() {
    del('dist/*');
});

gulp.task('watch:test', function() {
    gulp.watch(['dist/**', 'test/**'], ['test']);
});

gulp.task('test', function() {
    gulp.src('test/**/*.js', {read: false})
        .pipe(mocha({reporter: 'list'}));
});
