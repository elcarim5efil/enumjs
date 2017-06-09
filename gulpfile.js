var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var istanbul = require('gulp-istanbul');
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
var coverageVariable;
gulp.task('pre-test', function() {
    coverageVariable = '$$cov_' + new Date().getTime() + '$$';
    return gulp.src(['dist/**/*.js'])
        .pipe(istanbul({
            coverageVariable: coverageVariable,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
    return gulp.src('test/*.js')
        .pipe(mocha({
            reporter: 'spec',
        }))
        .once('error', function() {
            console.log('TEST FAILED!!!');
            done();
        })
        .pipe(istanbul.writeReports({
            coverageVariable: coverageVariable,
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 50 } }));
});

gulp.task('default', ['develop']);
