const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()

const $ = require('./gulpfile.config.json')

gulp.task('build', ['build:js', 'build:json'])

gulp.task('build:js', () => {
    gulp.src($.sources.js)
        .pipe(plugins.babel($.babel))
        .pipe(gulp.dest($.destination.lib))
})

gulp.task('build:json', () => {
    gulp.src($.sources.json)
        .pipe(gulp.dest($.destination.lib))
})

gulp.task('test', ['build'], () => {
    gulp.src($.sources.tests)
        .pipe(plugins.mocha($.mocha))
})

gulp.task('default', ['build'])