'use strict'

$           = do require 'gulp-load-plugins'
_           = require 'lodash'
browserify  = require 'browserify'
browserSync = require 'browser-sync'
buffer      = require 'vinyl-buffer'
del         = require 'del'
gulp        = require 'gulp'
source      = require 'vinyl-source-stream'
watchify    = require 'watchify'
runSequence = require 'run-sequence'

ENV = process.env.NODE_ENV || 'development'
debug = ENV is 'development'
watch = false

# compile client js
compileClientJs = () ->
  bundler = null
  args = {
    extensions: ['.js', '.jsx']
    debug: debug
  }

  if watch
    bundler = watchify browserify _.merge(args, watchify.args)
  else
    bundler = browserify args

  bundler.add './src/client/app.js'
  bundler.transform 'babelify'

  bundle = () ->
    bundler.bundle()
           .pipe source 'app.js'
           .pipe buffer()
           .pipe $.if(debug, $.sourcemaps.init(loadMaps: true))
           .pipe $.if(!debug, $.uglify())
           .pipe $.if(debug, $.sourcemaps.write())
           .pipe gulp.dest './build/client/'

  bundler.on 'update', bundle

  bundler.on 'log', $.util.log

  bundle()

gulp.task 'clean',
  del.bind(null, ['.tmp', 'build/client/*', 'build/common/*', 'build/server/*'], {dot: true})

gulp.task 'client', () -> compileClientJs()

gulp.task 'common', () ->
  gulp.src 'src/common/**/*.*'
      .pipe $.changed 'build/common'
      .pipe gulp.dest 'build/common'

gulp.task 'package-json', () ->
  gulp.src 'package.json'
      .pipe gulp.dest 'build'

gulp.task 'style', () ->
  gulp.src 'src/client/styles/app.less'
      .pipe $.plumber()
      .pipe $.less sourceMap: true, sourceMapBasepath: __dirname
      .on 'error', $.util.log.bind($.util)
      .pipe gulp.dest 'build/client/styles'

gulp.task 'server', () ->
  gulp.src 'src/server/**.*'
      .pipe $.changed 'build/server'
      .pipe gulp.dest 'build/server'

gulp.task 'build', ['clean'], (cb) ->
  runSequence ['common', 'style', 'server', 'client'], cb


gulp.task 'watch:build', (cb) ->
  watch = true

  runSequence 'build', () ->
    gulp.watch 'src/server/**/*.*', ['server']
    gulp.watch 'src/common/**/*.*', ['common']
    gulp.watch 'src/client/styles/**/*.*', ['style']
    cb()

gulp.task 'serve', ['watch:build'], (cb) ->
  cp = require 'child_process'

  started = false
  server = null

  startup = () ->
    child = cp.fork 'build/server/init.js', _.merge({NODE_ENV: 'development'}, process.env)
    child.once 'message', (message) ->
      if message.match /^online$/
        browserSync.reload()

        if !started
          started = true
          gulp.watch [
            'build/server/**/*.*'
            'build/common/**/*.*'
          ], () ->
            $.util.log 'Restarting server...'
            server.kill 'SIGTERM'
            server = startup()
          cb()

    child

  server = startup()

  process.on 'exit', () ->
    server.kill 'SIGTERM'

gulp.task 'sync', ['serve'], (cb) ->
  browserSync
    proxy: 'localhost:5000'
  , cb

  process.on 'exit', () ->
    browserSync.exit()

  gulp.watch 'build/client/**/*.*', () ->
    browserSync.reload()

