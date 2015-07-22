var gulp = require("gulp"),
    minifycss = require("gulp-minify-css"), // CSS压缩
    uglify = require("gulp-uglify"),        // js压缩
    concat = require("gulp-concat"),        // 合并文件
    rename = require("gulp-rename"),        // 重命名
    jshint = require("gulp-jshint"),
    notify = require('gulp-notify');      

// Styles
gulp.task('styles', function() {
  return gulp.src('*.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(gulp.dest('./min/'));
});
// Scripts
gulp.task('scripts', function() {
  return gulp.src('*.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(gulp.dest('./min/'));
});

// Clean
gulp.task('clean', ['clean'], function(cb) {
    del(['build/css', 'build/js'], cb)
});

// Default task
gulp.task('default',  function() {
    gulp.start('styles', 'scripts');
});
