const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()

const $ = {
    babel: {
        presets: ['es2015']
    },
    destination: 'lib',
    source: {
        js: ['src/**/*.js'],
        json: ['src/**/*.json']
    }
}

gulp.task('build', ['build:bower', 'build:transpile'])

gulp.task('build:bower', () => {
    return plugins.bower()
})

gulp.task('build:json', () => {
    return gulp.src($.source.json)
        .pipe(gulp.dest($.destination))
})

gulp.task('build:transpile', ['build:bower', 'build:json'], () => {
    return gulp.src($.source.js)
        .pipe(plugins.babel($.babel))
        .pipe(gulp.dest($.destination))
})

gulp.task('watch', ['build'], () => {
    const server = plugins.liveServer.new('lib/index.js')
    server.start()

    gulp.watch($.source.js.concat($.source.json), () => {
        gulp.start('build')
        server.start.bind(server)()
    })
})

gulp.task('default', ['build'])