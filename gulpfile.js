const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()

const $ = require('./gulpfile.config.json')

gulp.task('build', ['build:js', 'build:json'])

gulp.task('build:js', () => {
    return gulp.src($.sources.js)
        .pipe(plugins.babel($.babel))
        .pipe(gulp.dest($.destination.lib))
})

gulp.task('build:json', () => {
    return gulp.src($.sources.json)
        .pipe(gulp.dest($.destination.lib))
})

gulp.task('clean', () => {
    return gulp.src($.destination.lib)
        .pipe(plugins.clean($.clean))
})

gulp.task('test', ['build'], () => {
    return gulp.src($.sources.tests)
        .pipe(plugins.mocha($.mocha))
})

gulp.task('default', ['build'])