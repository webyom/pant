const gulp = require('gulp');

exports.scss = function() {
  return gulp
    .src('src/**/*.scss')
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'));
};
