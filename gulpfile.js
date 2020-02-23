const gulp = require('gulp');

exports.scss = function() {
  return gulp
    .src('src/**/*.scss')
    .pipe(gulp.dest('dist/es'))
    .pipe(gulp.dest('dist/lib'));
};
