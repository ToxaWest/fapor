var gulp                   = require('gulp'),
    less                   = require('gulp-less'),
    sourcemaps             = require('gulp-sourcemaps')
    path                   = require('path'),
    browsersync            = require('browser-sync'),
    uglify                 = require('gulp-uglifyjs'),
    concat                 = require('gulp-concat'),
    rename                 = require('gulp-rename'),
    del                    = require('del'),
    imagemin               = require('gulp-imagemin'),
  	pngquant               = require('imagemin-pngquant'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
  	cache                  = require('gulp-cache'),
  	autoprefixer           = require('gulp-autoprefixer'),
    rigger                 = require('gulp-rigger'),
    cleanCSS               = require('gulp-clean-css');

gulp.task('less', function () {
  return gulp.src('app/less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browsersync.reload({stream:true}));
});


gulp.task('minify-css', () => {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

gulp.task('sync', function(){
  browsersync({
    server: {
      baseDir:'app'
    },
    notify:false
  });
});


gulp.task('images', function() {
  return gulp.src('app/img/*.+(jpg|png)')
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imageminJpegRecompress({
        loops: 5,
        min: 65,
        max: 70,
        quality:'medium'
      }),
      imagemin.svgo(),
      imagemin.optipng({optimizationLevel: 3}),
      pngquant({quality: '65-70', speed: 5})
    ],{
      verbose: true
    })))
    .pipe(gulp.dest('build/img/'));
});

gulp.task('watch', ['sync','less','html'], function() {
  gulp.watch('app/less/**/*.less',['less']);
  gulp.watch('app/**/*.html', browsersync.reload);
  gulp.watch('app/js/**/*.js', browsersync.reload);
});

gulp.task('clean', function() {
	return del.sync('build');
});

gulp.task('default', ['watch']);

gulp.task("build",['clean','minify-css'], function() {
  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('build/fonts'))
  var buildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('build/js'))
  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('build'))
})
